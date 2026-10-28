import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  metrics: [{
    label: { type: String },
    value: { type: String }
  }],
  featured: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Project = mongoose.model('Project', projectSchema);
export default Project;
