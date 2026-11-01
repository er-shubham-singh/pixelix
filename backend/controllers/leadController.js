import ServiceLead from '../models/ServiceLeadModel.js';

/**
 * @desc Submit New Service Lead
 * @route POST /api/leads
 * @access Public
 */
export async function submitLead(req, res) {
  try {
    const {
      name,
      phone,
      email,
      service,
      projectLocation,
      budgetRange,
      calculatorData,
      sourcePage = 'website',
      notes,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number for contact.' });
    }

    const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number with country code.' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Spam check: prevent duplicate submissions from same phone in last 2 minutes
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const existingRecent = await ServiceLead.findOne({
      phone: cleanPhone,
      createdAt: { $gte: twoMinutesAgo },
    });

    if (existingRecent) {
      return res.json({
        success: true,
        message: 'Your inquiry has already been received! Our team will contact you shortly.',
        leadId: existingRecent._id,
      });
    }

    const newLead = await ServiceLead.create({
      name: name.trim(),
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      service: service || 'general_inquiry',
      projectLocation: (projectLocation || '').trim(),
      budgetRange: (budgetRange || '').trim(),
      calculatorData: calculatorData || null,
      sourcePage,
      notes: notes ? [{ text: notes.trim(), author: 'Client Form Submission' }] : [],
      ipAddress,
      userAgent,
      status: 'new',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your project details have been successfully submitted.',
      leadId: newLead._id,
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Get All Leads with Filtering, Search & Pagination (Owner only)
 * @route GET /api/leads
 * @access Private (Owner)
 */
export async function getLeads(req, res) {
  try {
    const { status, service, search, page = 1, limit = 25 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (service && service !== 'all') {
      query.service = service;
    }
    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: 'i' } },
        { phone: { $regex: s, $options: 'i' } },
        { email: { $regex: s, $options: 'i' } },
        { projectLocation: { $regex: s, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const totalLeads = await ServiceLead.countDocuments(query);
    const leads = await ServiceLead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    // Summary counts for pipeline cards
    const statusCounts = await ServiceLead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const summary = {
      total: totalLeads,
      new: 0,
      contacted: 0,
      interested: 0,
      follow_up: 0,
      converted: 0,
      closed: 0,
    };
    statusCounts.forEach((sc) => {
      if (sc._id && summary[sc._id] !== undefined) summary[sc._id] = sc.count;
    });

    return res.json({
      success: true,
      leads,
      summary,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total: totalLeads,
        pages: Math.ceil(totalLeads / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Update Lead Status & Assigned Member (Owner only)
 * @route PUT /api/leads/:id/status
 * @access Private (Owner)
 */
export async function updateLeadStatus(req, res) {
  try {
    const { status, assignedTo } = req.body;
    const lead = await ServiceLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    if (status) lead.status = status;
    if (assignedTo !== undefined) lead.assignedTo = assignedTo;
    lead.updatedAt = new Date();
    await lead.save();

    return res.json({ success: true, message: 'Lead status updated', lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Add Internal Note to Lead (Owner only)
 * @route POST /api/leads/:id/notes
 * @access Private (Owner)
 */
export async function addLeadNote(req, res) {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Note text required' });
    }
    const lead = await ServiceLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    lead.notes.push({
      text: text.trim(),
      author: req.user?.name || 'Owner',
      createdAt: new Date(),
    });
    lead.updatedAt = new Date();
    await lead.save();

    return res.json({ success: true, message: 'Note added', lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Delete Lead (Owner only)
 * @route DELETE /api/leads/:id
 * @access Private (Owner)
 */
export async function deleteLead(req, res) {
  try {
    await ServiceLead.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Lead record deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Export Leads to CSV (Owner only)
 * @route GET /api/leads/export/csv
 * @access Private (Owner)
 */
export async function exportLeadsCSV(req, res) {
  try {
    const leads = await ServiceLead.find().sort({ createdAt: -1 });

    const headers = [
      'Date',
      'Name',
      'Phone',
      'Email',
      'Service',
      'Status',
      'Project Location',
      'Budget Range',
      'Built-up Area (Sq Ft)',
      'Estimated Total Cost (INR)',
      'Source Page',
    ];

    const rows = leads.map((l) => [
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.service || ''}"`,
      `"${l.status || ''}"`,
      `"${(l.projectLocation || '').replace(/"/g, '""')}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.calculatorData?.builtUpArea || ''}"`,
      `"${l.calculatorData?.totalCost || ''}"`,
      `"${l.sourcePage || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=pixelix-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    return res.status(200).send(csvContent);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

