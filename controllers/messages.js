import Message from '../models/messages.js';

export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  if (!receiverId || !content) {
    return res.status(400).json({ error: 'Receiver ID and content are required.' });
  }

  console.log('Sender:', req.user.id);
  console.log('Receiver:', receiverId);

  if (receiverId === req.user.id) {
    return res.status(400).json({ error: 'You cannot send a message to yourself.' });
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
    console.log('Logged-in user ID:', req.user.id); // Debugging

    const messages = await Message.find({ receiver: req.user.id })
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    console.log('Retrieved messages:', messages); // Debugging

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




 