import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleHi: { type: String },
  description: { type: String, required: true }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  titleHi: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'digital-products',
      'brand-identity',
      'marketplace-growth',
      'product-visuals',
      'campaigns',
      'content-systems',
      'ai-solutions'
    ]
  },
  shortDescription: {
    type: String,
    required: true
  },
  shortDescriptionHi: {
    type: String
  },
  fullDescription: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: 'Popular'
  },
  iconName: {
    type: String,
    required: true
  },
  deliverables: [{
    type: String
  }],
  deliverablesHi: [{
    type: String
  }],
  features: [featureSchema],
  technologies: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Service = mongoose.model('Service', serviceSchema);
export default Service;
