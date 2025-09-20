const DietPlan = require('../models/dietPlan.model');
const Message = require('../models/message.model'); // Import the Message model
const Appointment = require('../models/appointment.model');

const generateDietPlan = async (req, res) => {
  try {
    const { patientId, prakriti, planDuration, healthGoals, appointmentId } = req.body;

    // ... (The logic to fetch, filter, and categorize foods is the same) ...
    // ... (The logic to assemble the dailyPlans array is the same) ...
    
    // --- Step 5 (Updated): Save Plan and Send as a Message ---
    const newDietPlan = new DietPlan({
        patient: patientId,
        doctor: req.user.id, // Use the logged-in doctor's ID from middleware
        startDate: new Date(),
        durationDays: planDuration,
        goals: healthGoals,
        dailyPlans: dailyPlans
    });

    const savedPlan = await newDietPlan.save();
    
    // Now, create a message to send this plan to the patient
    const appointment = await Appointment.findById(appointmentId);

    const planMessage = new Message({
        appointment: appointmentId,
        sender: req.user.id,
        receiver: patientId,
        content: "Here is your personalized diet plan.",
        isDietChart: true,
        dietPlan: savedPlan._id
    });
    await planMessage.save();

    const populatedPlan = await DietPlan.findById(savedPlan._id).populate('dailyPlans.meals.items.foodItem', 'name');

    res.status(201).json(populatedPlan);

  } catch (error) {
    res.status(500).json({ message: 'Server error during diet generation', error: error.message });
  }
};

module.exports = { generateDietPlan };