
import { check } from 'express-validator';

import express from 'express';
import { registerUser, loginUser, updateUserProfile, getUserProfile, logoutUser } from '../controllers/user.js';
import authenticate from '../middlewares/auth.js';


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

    router.post('/login', loginUser )
    router.patch('/profile', authenticate, updateUserProfile)
    router.get('/profile', authenticate, getUserProfile)
router.delete('/logout', logoutUser  )

    
  
export default router;
