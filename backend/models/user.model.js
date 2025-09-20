// backend/models/user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['patient', 'doctor'], default: 'patient' },
  
  // --- Updated Patient-specific fields ---
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },

  // --- Doctor-specific fields ---
  licenseNumber: { type: String },
  specialties: [{ type: String }],
  hospitalLocation: { type: String },
  availability: { type: Object }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;