const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

// @desc   Book a new appointment
// @route  POST /api/appointments/book
const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, appointmentDate, patientSymptoms } = req.body;

    // Here you could add logic to check if the doctor is available, etc.
    // For now, we'll directly create the appointment.

    const newAppointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      patientSymptoms,
      paymentStatus: 'Paid' // We assume payment is successful
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);

  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error: error.message });
  }
};

module.exports = { bookAppointment };