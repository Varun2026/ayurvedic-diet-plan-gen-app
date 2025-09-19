const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates a link to the User model
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'] // The value must be one of these
  },
  prakriti: {
    type: String,
    trim: true
  },
  healthGoals: [{
    type: String // An array of strings
  }],
  dietaryRestrictions: [{
    type: String // An array of strings
  }],
  medicalHistory: {
    type: String
  }
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;