const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  ayurvedicProperties: {
    rasa: [{ // Six Tastes
      type: String,
      enum: ['Sweet', 'Sour', 'Salty', 'Pungent', 'Bitter', 'Astringent']
    }],
    guna: [{ // Qualities
      type: String
    }],
    virya: { // Potency
      type: String,
      enum: ['Heating', 'Cooling']
    },
    vipaka: { // Post-digestive effect
      type: String,
      enum: ['Sweet', 'Sour', 'Pungent']
    }
  },
  nutritionalInfo: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 }
  },
  doshaBalancing: {
    vata: {
      type: String,
      enum: ['Pacifying', 'Aggravating', 'Neutral'],
      default: 'Neutral'
    },
    pitta: {
      type: String,
      enum: ['Pacifying', 'Aggravating', 'Neutral'],
      default: 'Neutral'
    },
    kapha: {
      type: String,
      enum: ['Pacifying', 'Aggravating', 'Neutral'],
      default: 'Neutral'
    }
  }
}, {
  timestamps: true
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;