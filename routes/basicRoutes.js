import express from 'express';
const router = express.Router();

// Test route for farmers
router.get('/farmers', (req, res) => {
  res.json({ message: 'List of farmers' });
});

// Test route for buyers
router.get('/buyers', (req, res) => {
  res.json({ message: 'List of buyers' });
});

export default router;
