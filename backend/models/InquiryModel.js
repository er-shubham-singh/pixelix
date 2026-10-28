import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Selected service is required']
  },
  businessName: {
    type: String,
    trim: true,
    default: ''
  },
  budget: {
    type: String,
    default: 'Flexible'
  },
  timeline: {
    type: String,
    default: '1-2 months'
  },
  message: {
    type: String,
    required: [true, 'Inquiry details are required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'proposal-sent', 'closed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
