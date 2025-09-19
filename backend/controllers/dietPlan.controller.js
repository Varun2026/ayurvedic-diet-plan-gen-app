const Patient = require('../models/patient.model');
const FoodItem = require('../models/foodItem.model');
const DietPlan = require('../models/dietPlan.model');

const generateDietPlan = async (req, res) => {
  try {
    const { patientId, prakriti, planDuration } = req.body;

    // --- Step 1 & 2: Fetch and Filter Foods (Same as before) ---
    const enrichedFoods = await FoodItem.find({ "doshaBalancing.vata": { $ne: "Neutral" } });
    const prakritiLower = prakriti.toLowerCase();
    const suitableFoods = enrichedFoods.filter(food => food.doshaBalancing[prakritiLower] !== 'Aggravating');
    
    if (suitableFoods.length < 5) {
        return res.status(400).json({ message: "Not enough food data to generate a varied plan. Please enrich more food items." });
    }

    // --- Step 3: Categorize the Suitable Foods ---
    const categorizedFoods = {
      grain: suitableFoods.filter(f => f.category.toLowerCase() === 'grain'),
      legume: suitableFoods.filter(f => f.category.toLowerCase() === 'legume'),
      vegetable: suitableFoods.filter(f => f.category.toLowerCase() === 'vegetable'),
      fruit: suitableFoods.filter(f => f.category.toLowerCase() === 'fruit'),
      spice: suitableFoods.filter(f => f.category.toLowerCase() === 'spice'),
      nut: suitableFoods.filter(f => f.category.toLowerCase() === 'nut'),
      dairy: suitableFoods.filter(f => f.category.toLowerCase().includes('dairy'))
    };

    // Helper function to get a random food from a category
    const getRandomFood = (category) => {
        const foodList = categorizedFoods[category];
        if (!foodList || foodList.length === 0) return null; // Handle empty categories
        const randomIndex = Math.floor(Math.random() * foodList.length);
        return { foodItem: foodList[randomIndex]._id, quantity: '1 bowl' };
    };

    // --- Step 4: Assemble the Meal Plan for the specified duration ---
    const dailyPlans = [];
    for (let i = 1; i <= planDuration; i++) {
      const breakfastItem = getRandomFood('grain');
      const lunchItems = [getRandomFood('grain'), getRandomFood('legume'), getRandomFood('vegetable')].filter(Boolean);
      const dinnerItems = [getRandomFood('grain'), getRandomFood('vegetable')].filter(Boolean);

      const dailyPlan = {
        day: i,
        meals: [
          { mealType: 'Breakfast', items: breakfastItem ? [breakfastItem] : [] },
          { mealType: 'Lunch', items: lunchItems },
          { mealType: 'Dinner', items: dinnerItems }
        ]
      };
      dailyPlans.push(dailyPlan);
    }
    
    // --- Step 5: Save the New Diet Plan to the Database ---
    const newDietPlan = new DietPlan({
        patient: patientId,
        doctor: "68cb7ee786f3b519281bb97e", // Placeholder doctor ID for now
        startDate: new Date(),
        durationDays: planDuration,
        goals: req.body.healthGoals,
        dailyPlans: dailyPlans
    });

    const savedPlan = await newDietPlan.save();
    const populatedPlan = await DietPlan.findById(savedPlan._id).populate('dailyPlans.meals.items.foodItem', 'name');


    res.status(201).json(populatedPlan);

  } catch (error) {
    res.status(500).json({ message: 'Server error during diet generation', error: error.message });
  }
};

module.exports = { generateDietPlan };