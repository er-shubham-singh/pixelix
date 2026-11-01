import mongoose from 'mongoose';

const serviceLeadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  interestedService: {
    type: String,
    required: [true, 'Interested service is required'],
    trim: true
  },
  serviceCategory: {
    type: String,
    enum: [
      'real_estate_calculator',
      'virtual_tours',
      'digital_advertising',
      'lead_generation',
      'chatbot',
      'website_development',
      'marketplace_growth',
      'general'
    ],
    default: 'general'
  },
  sourcePage: {
    type: String,
    default: '/'
  },
  projectType: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  budget: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  calculatorData: {
    plotArea: Number,
    unit: { type: String, enum: ['sq_ft', 'sq_yd'] },
    coveragePercent: Number,
    floors: Number,
    quality: { type: String, enum: ['basic', 'standard', 'premium'] },
    builtUpAreaSqFt: Number,
    estimatedCost: Number,
    materialBreakdown: {
      brickCost: Number,
      cementCost: Number,
      steelCost: Number,
      labourCost: Number,
      otherCost: Number,
      contingency: Number
    }
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'interested', 'follow_up', 'converted', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  assignedName: {
    type: String,
    default: 'Unassigned'
  },
  internalNotes: [{
    note: { type: String, required: true },
    addedBy: { type: String, default: 'Admin' },
    createdAt: { type: Date, default: Date.now }
  }],
  statusHistory: [{
    from: String,
    to: String,
    changedBy: String,
    changedAt: { type: Date, default: Date.now }
  }],
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for search & filtering
serviceLeadSchema.index({ fullName: 'text', mobile: 'text', email: 'text', interestedService: 'text' });
serviceLeadSchema.index({ status: 1, createdAt: -1 });

export const ServiceLead = mongoose.model('ServiceLead', serviceLeadSchema);
export default ServiceLead;

