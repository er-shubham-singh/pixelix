import { Service } from '../models/ServiceModel.js';
import { initialServices } from '../data/servicesData.js';
import mongoose from 'mongoose';

// In-memory cache store if MongoDB is offline
let memoryServices = [...initialServices];

export const getServices = async (req, res) => {
  try {
    const { category, featured, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { fullDescription: { $regex: search, $options: 'i' } }
        ];
      }

      let services = await Service.find(query).sort({ order: 1 });
      if (services.length === 0 && !search && (!category || category === 'all')) {
        // Auto-seed if collection is empty
        await Service.insertMany(initialServices);
        services = await Service.find({}).sort({ order: 1 });
      }
      return res.json({ success: true, count: services.length, data: services });
    }

    // Fallback in-memory
    let filtered = [...memoryServices];
    if (category && category !== 'all') {
      filtered = filtered.filter(s => s.category === category);
    }
    if (featured === 'true') {
      filtered = filtered.filter(s => s.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.fullDescription.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) => (a.order || 0) - (b.order || 0));

    return res.json({
      success: true,
      count: filtered.length,
      data: filtered,
      source: 'memory-fallback'
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving services' });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const service = await Service.findOne({ slug: slug.toLowerCase() });
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.json({ success: true, data: service });
    }

    const service = memoryServices.find(s => s.slug === slug.toLowerCase());
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.json({ success: true, data: service, source: 'memory-fallback' });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving service' });
  }
};

export const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const newService = new Service(serviceData);
      await newService.save();
      return res.status(201).json({ success: true, data: newService });
    }

    const newService = { ...serviceData, _id: Date.now().toString() };
    memoryServices.push(newService);
    return res.status(201).json({ success: true, data: newService, source: 'memory-fallback' });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
