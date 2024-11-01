import express from 'express';
import basicRoutes from './routes/basicRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect routes
app.use('/api', basicRoutes);

// Basic route to test
app.get('/', (req, res) => {
  res.send('Welcome to AgriLink!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
