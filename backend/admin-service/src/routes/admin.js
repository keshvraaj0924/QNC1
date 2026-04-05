import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  login, 
  changePassword, 
  forgotPassword, 
  getUsers, 
  createUser, 
  getContent, 
  updateContent,
  upload,
  handleImageUpload,
  resetPassword
} from '../controllers/adminController.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'qnc-super-secret-key-2026';

// Middleware to verify Admin JWT
export const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};

/**
 * Enterprise RBAC Middleware
 * Blocks requests from users whose roles are not in the permitted list.
 */
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ 
      error: 'Forbidden: Insufficient permissions for this action',
      requiredRoles: roles
    });
  }
  next();
};

// Auth Routes (Public)
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Management Routes (Protected)
router.post('/change-password', requireAdminAuth, changePassword);
router.get('/users', requireAdminAuth, requireRole('admin'), getUsers);
router.post('/users', requireAdminAuth, requireRole('admin'), createUser);

// Content Routes (Protected)
router.get('/content', requireAdminAuth, requireRole('admin', 'editor', 'viewer'), getContent);
router.post('/content', requireAdminAuth, requireRole('admin', 'editor'), updateContent);

// Media Routes (Protected)
router.post('/upload', requireAdminAuth, requireRole('admin', 'editor'), upload.any(), handleImageUpload);

export default router;
