const Patient = require('../models/patient.model');

// @desc   Create a new patient
// @route  POST /api/patients/add
// @access Private (will be secured later)
const createPatient = async (req, res) => {
  try {
    const { doctor, fullName, age, gender, prakriti, healthGoals, dietaryRestrictions, medicalHistory } = req.body;

    const newPatient = new Patient({
      doctor,
      fullName,
      age,
      gender,
      prakriti,
      healthGoals,
      dietaryRestrictions,
      medicalHistory
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);

  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error: error.message });
  }
};

// @desc   Get all patients
// @route  GET /api/patients
// @access Private (will be secured later)
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('doctor', 'fullName'); // .populate gets doctor's name
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createPatient, getAllPatients };