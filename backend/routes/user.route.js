const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, loginUser } = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', loginUser); // Add this new route

module.exports = router;