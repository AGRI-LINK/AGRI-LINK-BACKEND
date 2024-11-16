import Notification from '../models/notification.js';

export const getNotifications = async (req, res) => {
  try {
    // Find notifications for the logged-in user, newest first
    const notifications = await Notification.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
  