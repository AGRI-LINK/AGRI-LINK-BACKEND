
import { check, validationResult } from 'express-validator';

import express from 'express';
import { registerUser } from '../controllers/user.js';

const router = express.Router();

// POST route for user registration
router.post('/register', 
    [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
    registerUser);

export default router;
