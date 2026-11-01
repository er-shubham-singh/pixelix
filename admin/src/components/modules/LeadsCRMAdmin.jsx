import React, { useState, useEffect } from 'react';
import {
  fetchAdminLeads,
  updateAdminLeadStatus,
  addAdminLeadNote,
  deleteAdminLead
} from '../../services/ownerApi';
import {
  Inbox,
  Search,
  Filter,
  Download,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Building2,
  Trash2,
  Plus
} from 'lucide-react';
import { ENV } from '../../config/env';

export default function LeadsCRMAdmin() {
  const [leads, setLeads] = useState([]);
  const [summary, setSummary] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Selected lead for detail/notes modal
  const [activeLead, setActiveLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  useEffect(() => {
    loadLeads();
  }, [statusFilter, serviceFilter]);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchAdminLeads({
      status: statusFilter,
      service: serviceFilter,
      search: searchQuery
    });
    if (data?.leads) {
      setLeads(data.leads);
      if (data.summary) setSummary(data.summary);
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadLeads();
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const res = await updateAdminLeadStatus(leadId, { status: newStatus });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l)));
      if (activeLead && activeLead._id === leadId) {
        setActiveLead((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeLead) return;
    setSubmittingNote(true);
    const res = await addAdminLeadNote(activeLead._id, newNoteText.trim());
    setSubmittingNote(false);
    if (res.ok && res.lead) {
      setActiveLead(res.lead);
      setLeads((prev) => prev.map((l) => (l._id === res.lead._id ? res.lead : l)));
      setNewNoteText('');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    const res = await deleteAdminLead(leadId);
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l._id !== leadId));
      if (activeLead && activeLead._id === leadId) setActiveLead(null);
    }
  };

  const handleWhatsAppLead = (lead) => {
    const cleanPhone = (lead.phone || '').replace(/[^\d]/g, '');
    let msg = `Hello ${lead.name || 'there'}! This is Pixelix Creative & Digital Systems following up on your inquiry.`;
    if (lead.calculatorData?.totalCost) {
      msg = `Hello ${lead.name}! This is Pixelix regarding your house construction estimate of ₹${lead.calculatorData.totalCost.toLocaleString('en-IN')} for ${lead.calculatorData.builtUpArea} sq ft. How can we assist you with drawings or architectural execution?`;
    }
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleExportCSV = () => {
    const token = localStorage.getItem('pixelix_auth_token') || '';
    window.open(`${ENV.API_BASE_URL}/api/leads/export/csv`, '_blank');
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300',
    contacted: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300',
    interested: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300',
    follow_up: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300',
    converted: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300',
    closed: 'bg-cream-200 text-espresso-700 dark:bg-darkbg-elevated dark:text-cream-400 border-cream-300'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header with Stats & CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200 dark:border-darkbg-border">
        <div>
          <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
            <Inbox className="w-5 h-5 text-terracotta-500" />
            Centralized Service Leads CRM & Pipeline
          </h3>
          <p className="text-xs text-espresso-500 dark:text-cream-400">
            Real-time inquiries from House Calculator, 3D Virtual Tours, Digital Ads, and AI Chatbot
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-white dark:bg-darkbg-card border border-cream-300 dark:border-darkbg-border text-espresso-800 dark:text-cream-200 hover:bg-cream-100 font-bold text-xs flex items-center gap-2 shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-terracotta-500" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* 2. Pipeline Stage Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {[
          { key: 'total', label: 'All Leads', count: summary.total || leads.length, col: 'text-espresso-900 dark:text-cream-100' },
          { key: 'new', label: 'New / Fresh', count: summary.new || 0, col: 'text-blue-600 dark:text-blue-400' },
          { key: 'contacted', label: 'Contacted', count: summary.contacted || 0, col: 'text-amber-600 dark:text-amber-400' },
          { key: 'interested', label: 'Interested', count: summary.interested || 0, col: 'text-emerald-600 dark:text-emerald-400' },
          { key: 'follow_up', label: 'Follow Up', count: summary.follow_up || 0, col: 'text-purple-600 dark:text-purple-400' },
          { key: 'converted', label: 'Converted', count: summary.converted || 0, col: 'text-teal-600 dark:text-teal-400' }
        ].map((s) => (
          <div
            key={s.key}
            onClick={() => setStatusFilter(s.key === 'total' ? 'all' : s.key)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              (statusFilter === 'all' && s.key === 'total') || statusFilter === s.key
                ? 'bg-cream-100 dark:bg-darkbg-elevated border-terracotta-500 shadow-xs'
                : 'bg-white dark:bg-darkbg-card border-cream-200 dark:border-darkbg-border hover:border-cream-300'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-espresso-400 dark:text-cream-400 block">
              {s.label}
            </span>
            <span className={`text-xl font-mono font-black ${s.col}`}>
              {s.count}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-espresso-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone number, email, or city..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50/70 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs"
          >
            Filter
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
          >
            <option value="all">All Service Sources</option>
            <option value="real_estate_calculator">Construction Calculator</option>
            <option value="virtual_property_tour">3D Virtual Property Tours</option>
            <option value="digital_advertising">Digital Ad Services</option>
            <option value="ai_chatbot">AI Chatbot Handoff</option>
          </select>
        </div>
      </div>

      {/* 4. Leads Table */}
      <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 dark:bg-darkbg-elevated border-b border-cream-200 dark:border-darkbg-border text-espresso-600 dark:text-cream-300 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Service Domain</th>
                <th className="p-4">Project / Calculator Details</th>
                <th className="p-4">Status Pipeline</th>
                <th className="p-4">Received Date</th>
                <th className="p-4 text-right">Direct Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-espresso-400 italic">
                    {loading ? 'Fetching inquiries...' : 'No service leads found matching active filters.'}
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/40">
                    {/* Name & Phone */}
                    <td className="p-4">
                      <div className="font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-espresso-400" />
                        <span>{lead.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-terracotta-600 dark:text-terracotta-400 mt-0.5">
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="text-[10px] text-espresso-400 truncate max-w-[140px]">
                          {lead.email}
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-elevated text-espresso-800 dark:text-cream-200 capitalize">
                        {lead.service?.replace(/_/g, ' ') || 'General'}
                      </span>
                      {lead.projectLocation && (
                        <div className="text-[10px] text-espresso-400 mt-1">
                          📍 {lead.projectLocation}
                        </div>
                      )}
                    </td>

                    {/* Calculator Details */}
                    <td className="p-4 max-w-xs">
                      {lead.calculatorData?.totalCost ? (
                        <div className="space-y-0.5 text-[11px]">
                          <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                            ₹{lead.calculatorData.totalCost.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-espresso-500 dark:text-cream-400 font-mono">
                            {lead.calculatorData.builtUpArea} sq.ft ({lead.calculatorData.qualityTier})
                          </div>
                          <div className="text-[9px] text-espresso-400">
                            {lead.calculatorData.bricks?.toLocaleString()} Bricks • {lead.calculatorData.cementBags} Cement
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-espresso-600 dark:text-cream-300">
                          {lead.notes?.[0]?.text || lead.budgetRange || 'Standard Consultation'}
                        </span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          statusColors[lead.status] || 'bg-cream-100 text-espresso-700'
                        }`}
                      >
                        <option value="new">● New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="follow_up">Follow Up</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="p-4 font-mono text-[11px] text-espresso-500 dark:text-cream-400 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppLead(lead)}
                        title="Chat on WhatsApp with lead"
                        className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200 transition-colors inline-flex"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveLead(lead)}
                        title="View Full Details & Internal Notes"
                        className="p-1.5 rounded-lg bg-cream-200 text-espresso-700 dark:bg-darkbg-elevated dark:text-cream-300 hover:bg-cream-300 transition-colors inline-flex"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteLead(lead._id)}
                        title="Delete Lead"
                        className="p-1.5 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 hover:bg-rose-200 transition-colors inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Lead Detail & Notes Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-300 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-darkbg-border">
              <div>
                <h4 className="font-bold text-base text-espresso-900 dark:text-cream-100 font-serif">
                  {activeLead.name}
                </h4>
                <p className="text-xs text-espresso-500 dark:text-cream-400">
                  Phone: {activeLead.phone} • {activeLead.email || 'No email provided'}
                </p>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="w-8 h-8 rounded-full bg-cream-100 dark:bg-darkbg-elevated text-espresso-700 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Quick WhatsApp CTA inside modal */}
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Direct WhatsApp Contact
              </span>
              <button
                type="button"
                onClick={() => handleWhatsAppLead(activeLead)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </button>
            </div>

            {/* Internal Notes Thread */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
                Internal Notes & Follow-Up History
              </span>
              <div className="max-h-48 overflow-y-auto space-y-2 p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border text-xs">
                {activeLead.notes && activeLead.notes.length > 0 ? (
                  activeLead.notes.map((n, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-0.5">
                      <div className="flex justify-between text-[10px] text-espresso-400">
                        <span className="font-bold">{n.author || 'Staff'}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-espresso-800 dark:text-cream-200 leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-espresso-400 italic">No notes added yet.</p>
                )}
              </div>
            </div>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add note (e.g. called client, requested site visit)..."
                className="flex-1 px-3 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
              />
              <button
                type="submit"
                disabled={submittingNote || !newNoteText.trim()}
                className="px-3.5 py-2 rounded-xl bg-terracotta-500 text-white font-bold text-xs disabled:opacity-40"
              >
                {submittingNote ? 'Saving...' : 'Add Note'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

