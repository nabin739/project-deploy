import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import multer from 'multer';
import connectDB from "./config/db.js";
import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import adminRouter from "./routes/adminRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

// Configure dotenv to look for .env in parent directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env') });

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 4000;

// Initialize database and Cloudinary
const initializeServices = async () => {
    try {
        await connectDB();
        await connectCloudinary();
    } catch (error) {
        console.error('Failed to initialize services:', error);
        process.exit(1);
    }
};

// Initialize services
await initializeServices();

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://your-production-domain.com']  // Update with your production domain
  : ['http://localhost:3000'];

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { success: false, message: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all routes
app.use(limiter);

// Stricter rate limit for login attempts
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 attempts per hour
    message: { success: false, message: 'Too many login attempts, please try again later.' }
});

// Middleware Configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "API is working" });
});

// Apply login rate limit to login route
app.use('/api/login', loginLimiter);

// Routes
app.use('/api', adminRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Multer error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File is too large. Maximum size is 100MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Maximum is 5 files per upload'
            });
        }
        return res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`
        });
    }
    next(err);
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        success: false, 
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message 
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});


