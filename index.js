
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Database connection failed:', err.message);
});

import userRoutes from './routes/user.js'
import productsRoutes from './routes/products.js'
import userMessages from './routes/messages.js'

import cors from 'cors';




const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products',  productsRoutes);
app.use('/api/messages', userMessages);






app.get('/', (req, res, next) => {
  res.send('Welcome to AgriLink API');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
