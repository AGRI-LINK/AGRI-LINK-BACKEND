import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  preferences: {
    type: Object, // E.g., { type: 'fruits', location: 'Accra' }
    required: true,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);


export default Subscription;
