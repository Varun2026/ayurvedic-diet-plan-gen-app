const User = require('../models/user.model');

// @desc   Get doctors based on filters (specialty, city)
// @route  GET /api/doctors
const getDoctors = async (req, res) => {
  try {
    // Build the filter object
    const filter = { role: 'doctor' };
    
    // Add filters if they exist in the query
    if (req.query.specialty) {
      filter.specialties = req.query.specialty;
    }
    if (req.query.city) {
      // Use a case-insensitive regex for the city search
      filter.city = new RegExp(`^${req.query.city}$`, 'i');
    }

    // Find doctors matching the filter, excluding their passwords
    const doctors = await User.find(filter).select('-password');
    
    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getDoctors };