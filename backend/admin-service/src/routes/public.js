import express from 'express';
import { 
  getPublicService, 
  getPublicContent, 
  submitContact, 
  submitApplication,
  upload
} from '../controllers/adminController.js';

const router = express.Router();

// Publicly accessible service data
router.get('/services/:slug', getPublicService);
router.get('/content', getPublicContent);

// Form Submissions
router.post('/contact', submitContact);
router.post('/apply', upload.any(), submitApplication);

export default router;
