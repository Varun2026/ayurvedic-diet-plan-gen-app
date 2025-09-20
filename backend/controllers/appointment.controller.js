const Appointment = require('../models/appointment.model');

// @desc   Book a new appointment
// @route  POST /api/appointments/book
const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, appointmentDate, patientSymptoms } = req.body;
    const newAppointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      patientSymptoms,
      paymentStatus: 'Paid'
    });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error: error.message });
  }
};

// @desc   Get appointments for the logged-in doctor
// @route  GET /api/appointments/doctor
const getDoctorAppointments = async (req, res) => {
  try {
    // req.user.id comes from our 'protect' middleware
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'fullName email') // Get patient's name and email
      .sort({ appointmentDate: -1 }); // Show newest first
      
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookAppointment, getDoctorAppointments };
