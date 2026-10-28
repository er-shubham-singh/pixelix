import { Inquiry } from '../models/InquiryModel.js';
import mongoose from 'mongoose';

// In-memory cache for inquiries
let memoryInquiries = [];

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, service, businessName, budget, timeline, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, service, and message.'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const inquiry = new Inquiry({
        name,
        email,
        phone,
        service,
        businessName,
        budget,
        timeline,
        message
      });
      await inquiry.save();
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your project consultation request has been received. Our team will contact you within 24 hours.',
        data: inquiry
      });
    }

    // In-memory fallback
    const newInquiry = {
      _id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      businessName,
      budget: budget || 'Flexible',
      timeline: timeline || '1-2 months',
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    memoryInquiries.push(newInquiry);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your project consultation request has been received. Our team will contact you within 24 hours.',
      data: newInquiry,
      source: 'memory-fallback'
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry'
    });
  }
};

export const getInquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }

    return res.json({
      success: true,
      count: memoryInquiries.length,
      data: memoryInquiries.slice().reverse(),
      source: 'memory-fallback'
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving inquiries' });
  }
};
