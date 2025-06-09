const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: String,

  },
  otpExpires: {
    type: Date,        // OTP expiration time

  },
  isVerified: {
    type: Boolean,     // Tracks if user completed OTP verification
    default: false
  }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;