const express = require('express');
const router = express.Router();
const { addFoodItem, getAllFoodItems } = require('../controllers/foodItem.controller');

router.post('/add', addFoodItem);
router.get('/', getAllFoodItems);

module.exports = router;