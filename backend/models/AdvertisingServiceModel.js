import mongoose from 'mongoose';

const advertisingServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['social_media', 'google_ads', 'real_estate_lead_gen', 'full_funnel'],
    required: true
  },
  badge: {
    type: String,
    default: 'Performance Driven'
  },
  shortDesc: {
    type: String,
    required: true,
    trim: true
  },
  fullDesc: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Target'
  },
  bannerImage: {
    type: String,
    default: ''
  },
  platforms: [{
    type: String,
    trim: true
  }],
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  targetAudience: [{
    type: String
  }],
  deliverables: [{
    type: String
  }],
  packages: [{
    name: { type: String, required: true },
    price: { type: String, required: true },
    priceNote: { type: String, default: 'per month + ad spend' },
    description: String,
    features: [String],
    isPopular: { type: Boolean, default: false },
    ctaText: { type: String, default: 'Choose Package' }
  }],
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  disclaimer: {
    type: String,
    default: 'Ad campaign performance, cost-per-lead, and conversion volumes are subject to market conditions, allocated ad spend, geographic competition, offer attractiveness, and creative assets. Pixelix optimizes for maximum verified inquiry quality without promising artificial or fixed lead counts.'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const AdvertisingService = mongoose.model('AdvertisingService', advertisingServiceSchema);
export default AdvertisingService;

