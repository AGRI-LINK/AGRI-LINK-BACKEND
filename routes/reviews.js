import express from 'express';
import authenticate from '../middlewares/auth.js';
import { addReview, getReviews } from '../controllers/reviews.js';

const router = express.Router();

// Add a review
router.post('/add', authenticate, addReview)

// Fetch reviews for a user
router.get('/:userId', getReviews);

export default router;
