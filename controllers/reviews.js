
import Review from '../models/reviews.js';

//add a review
export const addReview = async (req, res) => {
    const { reviewedUser, rating, comment } = req.body;
  
    if (!reviewedUser || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const review = new Review({
        reviewer: req.user.id,
        reviewedUser,
        rating,
        comment,
      });
  
      await review.save();
      res.status(201).json({ message: 'Review added successfully!', review });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Fetch reviews for a user

  export const getReviews = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const reviews = await Review.find({ reviewedUser: userId }).populate('reviewer', 'name');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };