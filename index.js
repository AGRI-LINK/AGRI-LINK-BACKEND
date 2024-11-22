import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Database connection failed:', err.message);
});

// Import routes
import userRoutes from './routes/user.js';
import productsRoutes from './routes/products.js';
import userMessages from './routes/messages.js';
import notificationRoutes from './routes/notification.js';
import reviewsRouter from './routes/reviews.js';
import subscriptionRoutes from './routes/subscription.js';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure CORS
const allowedOrigins = [
  'https://agric-vate.netlify.app/', // Replace with your Netlify URL
  'http://localhost:5174', // For local development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies or authentication headers
}));

// Middleware for parsing JSON
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/messages', userMessages);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewsRouter);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default route
app.get('/', (req, res, next) => {
  res.send('Welcome to AgriLink API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
