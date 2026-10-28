import { Project } from '../models/ProjectModel.js';
import { initialProjects } from '../data/servicesData.js';
import mongoose from 'mongoose';

let memoryProjects = [...initialProjects];

export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'all') query.category = category;
      if (featured === 'true') query.featured = true;

      let projects = await Project.find(query).sort({ createdAt: -1 });
      if (projects.length === 0 && (!category || category === 'all')) {
        await Project.insertMany(initialProjects);
        projects = await Project.find({}).sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: projects.length, data: projects });
    }

    let filtered = [...memoryProjects];
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }

    return res.json({ success: true, count: filtered.length, data: filtered, source: 'memory-fallback' });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving projects' });
  }
};
