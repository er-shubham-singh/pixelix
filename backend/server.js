import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { connectDB, getDBStatus } from './config/db.js';
import serviceRoutes from './routes/serviceRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Pixelix Backend Server running on port ${PORT} in ${ENV.NODE_ENV} mode`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💼 Services API: http://localhost:${PORT}/api/services`);
});
