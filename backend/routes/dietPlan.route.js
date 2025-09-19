const express = require('express');
const router = express.Router();
const { generateDietPlan } = require('../controllers/dietPlan.controller');

router.post('/generate', generateDietPlan);

module.exports = router;