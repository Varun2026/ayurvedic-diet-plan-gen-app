const express = require('express');
const router = express.Router();
const { generateDietPlan } = require('../controllers/dietPlan.controller');
const { protect } = require('../middleware/auth.middleware'); // Make sure protect is imported

// The 'protect' middleware is now added to this route
router.post('/generate', protect, generateDietPlan);

module.exports = router;