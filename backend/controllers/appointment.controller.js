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
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'fullName email')
      .sort({ appointmentDate: -1 });
      
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc   Get a single appointment by its ID
// @route  GET /api/appointments/:id
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'fullName email phone address city')
      .populate('doctor', 'fullName');
      
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { bookAppointment, getDoctorAppointments, getAppointmentById };