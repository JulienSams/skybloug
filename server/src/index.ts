import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import articlesRouter from './routes/articles';
import profileRouter from './routes/profile';
import commentsRouter from './routes/comments';
import imagesRouter from './routes/images';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory:', uploadsDir);
}

// Configure CORS for frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.onrender\.com$/  // Allow all Render.com subdomains
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Check if origin matches allowed patterns
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return origin === allowed;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// JSON body parser
app.use(express.json());

// Serve uploaded images as static files
// In development (ts-node), __dirname is src/, so we need to go up one level
// In production (compiled), __dirname is dist/, so we still need to go up one level
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', articlesRouter);
app.use('/api', profileRouter);
app.use('/api', commentsRouter);
app.use('/api', imagesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
