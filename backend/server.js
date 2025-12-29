//* ===================================================== Server Configuration =====================================================

// ===================== Importing necessary modules =====================
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

// ===================== Importing necessary files =====================
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundErrorHandler, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

// ===================== App & Port =====================
const PORT = process.env.PORT || 5000;
const app = express();

// ===================== Database =====================
connectDB();

// ===================== CORS CONFIG (🔥 MOST IMPORTANT PART) =====================
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://assignment-ums.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors());

// ===================== Middleware =====================
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== Static Folder =====================
app.use(express.static('backend/Public'));

// ===================== Health Check =====================
app.get('/', (req, res) => {
  res.status(200).json(
    `${process.env.APPLICATION_NAME} Server and Systems are Up & Running.`
  );
});

// ===================== Routes =====================
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ===================== Error Handlers =====================
app.use(notFoundErrorHandler);
app.use(errorHandler);

// ===================== Start Server =====================
app.listen(PORT, () => {
  console.log(
    `${process.env.APPLICATION_NAME} SERVER is LIVE & Listening on PORT ${PORT}`
  );
});
