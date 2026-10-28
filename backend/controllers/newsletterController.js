import { Newsletter } from '../models/NewsletterModel.js';
import mongoose from 'mongoose';

let memorySubscribers = new Set();

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (mongoose.connection.readyState === 1) {
      const existing = await Newsletter.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.json({ success: true, message: 'You are already subscribed to Pixelix insights!' });
      }
      const sub = new Newsletter({ email });
      await sub.save();
      return res.status(201).json({ success: true, message: 'Thank you for subscribing to Pixelix insights!' });
    }

    if (memorySubscribers.has(email.toLowerCase())) {
      return res.json({ success: true, message: 'You are already subscribed to Pixelix insights!' });
    }
    memorySubscribers.add(email.toLowerCase());

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to Pixelix insights!',
      source: 'memory-fallback'
    });
  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
};
