import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;
