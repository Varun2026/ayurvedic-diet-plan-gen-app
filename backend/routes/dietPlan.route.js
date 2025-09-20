const express = require('express');
const router = express.Router();
const { generateDietPlan } = require('../controllers/dietPlan.controller');
const { protect } = require('../middleware/auth.middleware');

// This line MUST include 'protect'
router.post('/generate', protect, generateDietPlan);

module.exports = router;