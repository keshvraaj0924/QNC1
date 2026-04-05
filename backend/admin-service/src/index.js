import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Public API Routes
app.use('/api/v1/public', publicRoutes);

// Static File Serving for Uploaded Content
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Public API Example
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'admin-service' });
});

// Protected Admin API Routes
app.use('/api/v1/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Admin Service running on port ${PORT}`);
});
