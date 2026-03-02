import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import articlesRouter from './routes/articles';
import profileRouter from './routes/profile';
import commentsRouter from './routes/comments';
import imagesRouter from './routes/images';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS for frontend
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5175'],
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
