import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import appointmentRoutes from './routes/appointment.js';
import invoiceRoutes from './routes/invoice.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
