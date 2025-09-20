const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/message.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/:appointmentId', protect, getMessages);
router.post('/send', protect, sendMessage);

module.exports = router;