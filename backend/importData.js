const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const FoodItem = require('./models/foodItem.model');
require('dotenv').config();

const importData = async () => {
  // Connect to the database
  const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/ayurvedaDB';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connection successful for import.');

  const foodItems = [];
  
  fs.createReadStream('indian_food.csv')
    .pipe(csv())
    .on('data', (row) => {
      // *** THIS IS THE NEW FILTERING LOGIC ***
      if (row.course !== 'dessert') {
        const food = {
          name: row.name,
          category: row.course,
          nutritionalInfo: {
            calories: parseFloat(row.calories) || 0,
            protein: parseFloat(row.protein) || 0,
            carbs: parseFloat(row.carbs) || 0,
            fats: parseFloat(row.fat) || 0,
          },
        };
        foodItems.push(food);
      }
    })
    .on('end', async () => {
      try {
        await FoodItem.deleteMany({});
        console.log('Previous food items cleared.');

        await FoodItem.insertMany(foodItems);
        console.log(`${foodItems.length} food items (excluding desserts) have been successfully imported.`);
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
      }
    });
};

importData().catch(err => console.error(err));