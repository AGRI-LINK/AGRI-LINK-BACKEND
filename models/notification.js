import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who gets the notification
  title: { type: String, required: true }, // Short notification title
  content: { type: String, required: true }, // The actual message
  isRead: { type: Boolean, default: false }, // Whether the user has seen it
  timestamp: { type: Date, default: Date.now }, // When the notification was created
});

export default mongoose.model('Notification', notificationSchema);
