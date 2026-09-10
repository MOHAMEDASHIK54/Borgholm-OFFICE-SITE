import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db.js';

// Route Imports
import authRoutes from './routes/auth.js';
import inquiryRoutes from './routes/inquiries.js';
import subscriberRoutes from './routes/subscribers.js';
import orderRoutes from './routes/orders.js';
import catalogRoutes from './routes/catalog.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Live Visual Browser Dashboard
app.get(['/', '/db', '/dashboard'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Borgholm PostgreSQL Backend',
    database: 'PostgreSQL 18 (borgholm_db)',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', catalogRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server after running DB migrations
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`✨ Borgholm PostgreSQL Backend is active!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🗄️ Database: PostgreSQL 18 (borgholm_db)`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
