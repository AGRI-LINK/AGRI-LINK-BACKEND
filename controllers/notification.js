//notifications.js

import Notification from '../models/notification.js';

import { io } from '../index.js'





export const getNotifications = async (req, res) => {
  try {
    // Find notifications for the logged-in user, newest first
    const notifications = await Notification.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark notification as read (unchanged)
export const markAsRead = async (req, res) => {
    const { notificationId } = req.params;
  
    try {
      // Update the notification's isRead field
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
      );
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found.' });
      }
  
      res.status(200).json({ message: 'Notification marked as read.', notification });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Emit a real-time notification
export const createNotification = async (receiverId, title, content) => {
    try {
        const notification = new Notification({
            user: receiverId,
            title,
            content,
        });
        await notification.save();

        // Emit real-time notification
        io.to(receiverId).emit('newNotification', {
            title,
            content,
            timestamp: notification.createdAt,
        });

        console.log('Notification sent successfully.');
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
};

  