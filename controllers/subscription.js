import Subscription from '../models/subscription.js';
import Product from '../models/products.js';
import { io } from '../index.js'; // Import io

// Subscribe for product alerts
export const subscribeForProduceAlerts = async (req, res) => {
  const { preferences } = req.body;

  if (!preferences) {
    return res.status(400).json({ error: 'Preferences are required.' });
  }

  try {
    const subscription = new Subscription({
      user: req.user.id,
      preferences,
    });

    await subscription.save();
    res.status(201).json({ message: 'Subscription added successfully!', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Notify subscribers when a product is added
Product.watch().on('change', async (change) => {
  if (change.operationType === 'insert') {
    const newProduct = change.fullDocument;

    try {
      // Find all subscribers matching the product's type and location
      const subscribers = await Subscription.find({
        'preferences.type': newProduct.type,
        'preferences.location': newProduct.location,
      }).populate('user');

      // Notify each subscriber in real-time
      for (const subscriber of subscribers) {
        console.log(`Notifying user ${subscriber.user.email} about new product ${newProduct.name}`);

        // Emit a real-time notification to the subscriber
        io.to(subscriber.user.id).emit('newProductAlert', {
          message: `A new product matching your preferences is available: ${newProduct.name}`,
          product: newProduct,
        });
      }
    } catch (error) {
      console.error('Error notifying subscribers:', error.message);
    }
  }
});
