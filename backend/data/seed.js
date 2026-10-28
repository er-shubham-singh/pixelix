import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Service } from '../models/ServiceModel.js';
import { Project } from '../models/ProjectModel.js';
import { initialServices, initialProjects } from './servicesData.js';

const seedData = async () => {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected. Make sure your IP is whitelisted on MongoDB Atlas (Network Access -> 0.0.0.0/0 or your current IP).');
    }

    console.log('🌱 Seeding Pixelix database with services and portfolio...');
    await Service.deleteMany({});
    await Project.deleteMany({});

    await Service.insertMany(initialServices);
    await Project.insertMany(initialProjects);

    console.log(`✅ Successfully seeded ${initialServices.length} services and ${initialProjects.length} projects!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedData();
}

export { seedData };
