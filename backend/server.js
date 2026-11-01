import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { connectDB, getDBStatus } from './config/db.js';
import { ensureDefaultAccounts } from './config/seedOwner.js';
import { ensureDefaultModulesSeed } from './config/seedModules.js';
import serviceRoutes from './routes/serviceRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import realEstateRoutes from './routes/realEstateRoutes.js';
import advertisingRoutes from './routes/advertisingRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Database Connection & Account Seeding
connectDB().then(() => {
  ensureDefaultAccounts();
  ensureDefaultModulesSeed();
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl) or any web origin dynamically
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Pixelix Creative & Digital Systems',
    domain: 'pixelix.co.in',
    timestamp: new Date().toISOString(),
    db: getDBStatus()
  });
});

// Mount API Routes
app.use('/api/services', serviceRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/real-estate', realEstateRoutes);
app.use('/api/advertising', advertisingRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/leads', leadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Pixelix Backend Server running on port ${PORT} in ${ENV.NODE_ENV} mode`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💼 Services API: http://localhost:${PORT}/api/services`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Employee API: http://localhost:${PORT}/api/employee`);
  console.log(`👑 Owner API: http://localhost:${PORT}/api/owner`);
});
