const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['patient', 'doctor'],
    default: 'patient'
  },
  // Patient-specific fields
  city: { type: String, trim: true },
  address: { type: String, trim: true },

  // Doctor-specific fields
  licenseNumber: { type: String },
  specialties: [{ type: String }], // e.g., ["Hair Treatment", "Nerve Problem"]
  hospitalLocation: { type: String },
  availability: { type: Object } // We'll store available slots here later
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;