import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { DbService } from '../services/dbService.js';
import { TranslateService } from '../services/translateService.js';
import MailService from '../services/mailService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'qnc-super-secret-key-2026';

// Ensure uploads directory always exists
const UPLOADS_DIR = './public/uploads';
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer Config for Asset Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});

// Supported Media Types for Premium Enterprise Platform
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'video/quicktime'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, SVG, and MP4/WebM videos are allowed.'), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB limit for cinematic video assets
});

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await DbService.getUsers();
    const trimmedUser = username?.trim();
    const trimmedPass = password?.trim();

    const user = users.find(u => u.username === trimmedUser);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(trimmedPass, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        role: user.role,
        mustChangePassword: !!user.mustChangePassword
      } 
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const users = await DbService.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect current password' });

    users[userIndex].password = await bcrypt.hash(newPassword, 10);
    await DbService.saveUsers(users);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await DbService.getUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      // For security, don't reveal if email exists
      return res.json({ message: 'If an account exists with that email, a reset link will be sent.' });
    }

    // Generate Secure Reset Token
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    users[userIndex].resetToken = resetToken;
    users[userIndex].resetTokenExpiry = resetTokenExpiry;
    await DbService.saveUsers(users);

    const resetLink = `http://localhost:3000/admin/reset-password?token=${resetToken}`;

    await MailService.sendEmail({
      to: email,
      subject: 'QNC CMS - Password Reset Request',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px; max-width: 500px;">
          <h2 style="color: #CBA152;">Access Recovery</h2>
          <p>We received a request to reset your QNC CMS password.</p>
          <p>Click the button below to continue:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #1a1a1a; color: #fff; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
          <p style="font-size: 12px; color: #666;">This link will expire in 1 hour.</p>
        </div>
      `
    });

    res.json({ message: 'If an account exists with that email, a reset link will be sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process forgot password request' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const users = await DbService.getUsers();
    const userIndex = users.findIndex(u => u.resetToken === token && u.resetTokenExpiry > Date.now());

    if (userIndex === -1) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    users[userIndex].password = await bcrypt.hash(newPassword, 10);
    delete users[userIndex].resetToken;
    delete users[userIndex].resetTokenExpiry;
    
    await DbService.saveUsers(users);
    res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

export const getUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const users = await DbService.getUsers();
  const sanitizedUsers = users.map(({ password, ...rest }) => rest);
  res.json(sanitizedUsers);
};

export const createUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const { username, password, role, email } = req.body;
    const users = await DbService.getUsers();
    if (users.some(u => u.username === username)) return res.status(400).json({ error: 'Username already exists' });

    const newUser = {
      id: Date.now().toString(),
      username,
      password: await bcrypt.hash(password, 10),
      role: role || 'editor',
      email,
      mustChangePassword: true // Encourage first-login change
    };

    users.push(newUser);
    await DbService.saveUsers(users);

    // Send Induction Email as requested
    await MailService.sendEmail({
      to: email,
      subject: 'QNC gave you access for CMS',
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #1a1a1a; border-radius: 12px; color: #1a1a1a;">
          <h2 style="color: #CBA152;">Welcome to QNC Platform</h2>
          <p>Your enterprise credentials for the CMS have been created:</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p>Login at: <a href="http://localhost:3000/admin/login">http://localhost:3000/admin/login</a></p>
          <p style="font-size: 13px; color: #666; margin-top: 30px;">For security, please change your password upon your first login.</p>
        </div>
      `
    });

    res.status(201).json({ message: 'User created successfully and notification sent', userId: newUser.id });
  } catch (err) {
    console.error('Create User Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const getContent = async (req, res) => {
  const content = await DbService.getContent();
  res.json(content);
};

export const getPublicContent = async (req, res) => {
  try {
    const content = await DbService.getContent();
    res.json({
      home: content.home,
      about: content.about,
      clients: content.clients,
      services: content.services,
      careers: content.careers,
      settings: content.settings,
      site: content.site
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch public content' });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { key, data, autoTranslateSource } = req.body;
    let content = await DbService.getContent();
    
    // Check if key is a service or a top-level key
    if (content.services[key]) {
      let updatedData = { ...content.services[key], ...data };
      if (autoTranslateSource) {
        updatedData = await TranslateService.syncLanguages(updatedData, autoTranslateSource);
      }
      content.services[key] = updatedData;
    } else {
      // Top-level key like 'home', 'about', 'careers'
      let updatedData = data;
      if (autoTranslateSource) {
        updatedData = await TranslateService.syncLanguages(data, autoTranslateSource);
      }
      content[key] = updatedData;
    }

    await DbService.saveContent(content);
    res.json({ message: 'Saved successfully', data: content[key] || content.services[key] });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const handleImageUpload = (req, res) => {
  if (req.files && Array.isArray(req.files)) {
    const urls = req.files.map(file => `/uploads/${file.filename}`);
    // Support both single and bulk response formats
    return res.json({ 
      urls, 
      url: urls[0] // Fallback for single-image upload components
    });
  }
  if (req.file) {
    const url = `/uploads/${req.file.filename}`;
    return res.json({ url });
  }
  return res.status(400).json({ error: 'No files were uploaded.' });
};

export const getPublicService = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await DbService.getContent();
    const service = content.services[slug];
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Public Contact Submission
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const content = await DbService.getContent();
    const recipient = content.settings?.contact_email || 'info@qudratnational.com';

    await MailService.sendEmail({
      to: recipient,
      subject: `[QNC Contact] New Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #CBA152;">New Website Inquiry</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Your message has been received.' });
  } catch (err) {
    console.error('Contact Submit Error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};

/**
 * Public Career Application (with Resume)
 */
export const submitApplication = async (req, res) => {
  try {
    const { name, email, roleId, roleTitle } = req.body;
    const resume = req.files && req.files[0];
    
    if (!resume) return res.status(400).json({ error: 'Resume file is required.' });

    const content = await DbService.getContent();
    const recipient = content.settings?.careers_email || 'hr@qudratnational.com';

    await MailService.sendEmail({
      to: recipient,
      subject: `[QNC Careers] Application for ${roleTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #CBA152;">New Career Application</h2>
          <p><strong>Applicant:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Role applied for:</strong> ${roleTitle} (ID: ${roleId})</p>
          <hr />
          <p>The applicant has attached their resume to this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: resume.originalname,
          path: resume.path
        }
      ]
    });

    res.json({ success: true, message: 'Application submitted successfully.' });
  } catch (err) {
    console.error('Career Submit Error:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again later.' });
  }
};
