const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This small schema defines a single item within a meal
const mealItemSchema = new Schema({
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false }); // We don't need a separate ID for each meal item

// This schema defines a single meal (e.g., Breakfast)
const mealSchema = new Schema({
  mealType: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
  },
  items: [mealItemSchema] // An array of different food items
}, { _id: false });

// This schema defines all the meals for a single day
const dailyPlanSchema = new Schema({
  day: {
    type: Number,
    required: true
  },
  meals: [mealSchema] // An array of meals for the day
}, { _id: false });

// This is the main Diet Plan Schema
const dietPlanSchema = new Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  durationDays: {
    type: Number,
    required: true,
    default: 7
  },
  goals: [{
    type: String
  }],
  notes: {
    type: String,
    trim: true
  },
  dailyPlans: [dailyPlanSchema] // An array of daily plans
}, {
  timestamps: true
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;