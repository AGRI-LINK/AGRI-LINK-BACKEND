
import Subscription from '../models/subscription.js';
import Product from '../models/products.js';




// Subscribe for product alerts
export const subscribeForProduceAlerts = async (req, res) => {
    const { preferences } = req.body;
  
    if (!preferences) {
      return res.status(400).json({ error: 'Preferences are required.' });
    }
  
    try {
      const subscription = new Subscription({
        user: req.user.name, 
        preferences
        
        
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
  
      const subscribers = await Subscription.find({
        'preferences.type': newProduct.type,
        'preferences.location': newProduct.location,
      }).populate('user');
  
      for (const subscriber of subscribers) {
        console.log(`Notifying user ${subscriber.user.email} about new product ${newProduct.name}`);
        // Add email or push notification logic here
      }
    }
  });