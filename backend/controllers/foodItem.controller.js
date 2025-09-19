const FoodItem = require('../models/foodItem.model');

// @desc   Add a new food item
// @route  POST /api/foods/add
const addFoodItem = async (req, res) => {
  try {
    const newFoodItem = new FoodItem(req.body);
    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding food item', error: error.message });
  }
};

// @desc   Get all food items
// @route  GET /api/foods
const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addFoodItem, getAllFoodItems };