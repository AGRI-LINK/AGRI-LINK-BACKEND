
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Database connection failed:', err.message);
});

import userRoutes from './routes/user.js'
import productsRoutes from './routes/products.js'
import userMessages from './routes/messages.js'
import notificationRoutes from './routes/notification.js';
import reviewsRouter from './routes/reviews.js';

import subscriptionRoutes from './routes/subscription.js';

import { fileURLToPath } from 'url';
import path from 'path';


// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from 'cors';




const app = express();



app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products',  productsRoutes);
app.use('/api/messages', userMessages);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewsRouter);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://agric-vate.netlify.app/',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});



app.get('/', (req, res, next) => {
  res.send('Welcome to AgriLink API');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export { server, io}