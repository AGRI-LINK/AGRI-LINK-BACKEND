import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notification.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, getNotifications); // Get all notifications for the user
router.put('/:notificationId/read', authenticate, markAsRead); // Mark a notification as read

export default router;
