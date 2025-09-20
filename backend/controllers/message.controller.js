const Message = require('../models/message.model');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ appointment: req.params.appointmentId })
      .populate('sender', 'fullName role')
      .sort({ createdAt: 'asc' });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { appointment, sender, receiver, content, isDietChart, dietPlan } = req.body;
    const newMessage = new Message({
      appointment, sender, receiver, content, isDietChart, dietPlan
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMessages, sendMessage };