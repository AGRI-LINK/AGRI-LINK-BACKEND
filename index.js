
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Database connection failed:', err.message);
});

import userRoutes from './routes/user.js'
import productsRoutes from './routes/products.js'
import cors from 'cors';
import authenticate from './middlewares/auth.js';
import roleCheck from './middlewares/roleCheck.js';

dotenv.config();
connectDB();

const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', authenticate, authorizeFarmer, productsRoutes);
app.use(authenticate);
app.use(roleCheck);



app.get('/', (req, res, next) => {
  res.send('Welcome to AgriLink API');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
