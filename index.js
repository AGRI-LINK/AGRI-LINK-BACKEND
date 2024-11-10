
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Database connection failed:', err.message);
});

import userRoutes from './routes/user.js'


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
 


app.get('/', (req, res, next) => {
  res.send('Welcome to AgriLink API');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
