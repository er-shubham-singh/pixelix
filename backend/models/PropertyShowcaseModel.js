import mongoose from 'mongoose';

const propertyShowcaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property showcase title is required'],
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  propertyType: {
    type: String,
    enum: [
      'Residential House',
      'Luxury Villa',
      'Modern Apartment',
      'Commercial Complex',
      'Penthouse',
      'Township & Plots',
      'Duplex Bungalow'
    ],
    default: 'Residential House'
  },
  category: {
    type: String,
    enum: [
      '3D House Walkthrough',
      'Virtual Apartment Tour',
      'Residential Visualization',
      'Commercial Visualization',
      'Interior & Exterior 3D',
      '360 Virtual Tour'
    ],
    default: '3D House Walkthrough'
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true
  },
  previewImage: {
    type: String,
    required: [true, 'Preview image URL is required']
  },
  mediaGallery: [{
    url: String,
    caption: String,
    type: { type: String, enum: ['image', 'video', 'panorama'], default: 'image' }
  }],
  tourUrl: {
    type: String,
    default: ''
  },
  tourType: {
    type: String,
    enum: ['interactive_3d', 'panorama_360', 'video_walkthrough', 'external_tour'],
    default: 'interactive_3d'
  },
  specs: {
    bedrooms: { type: String, default: '3 BHK' },
    bathrooms: { type: String, default: '3 Bath' },
    areaSqFt: { type: Number, default: 2400 },
    location: { type: String, default: 'Gurugram, Haryana' },
    floors: { type: Number, default: 2 }
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const PropertyShowcase = mongoose.model('PropertyShowcase', propertyShowcaseSchema);
export default PropertyShowcase;

