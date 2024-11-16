import Message from '../models/messages.js';

export const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
  
    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Receiver ID and content are required.' });
    }
  
    try {
      const message = new Message({
        sender: req.user.id,
        receiver: receiverId,
        content,
      });
  
      await message.save();
      res.status(201).json({ message: 'Message sent successfully!', messageData: message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getInboxMessages = async (req, res) => {
    try {
      const messages = await Message.find({ receiver: req.user.id }).populate('sender', 'name email');
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


 