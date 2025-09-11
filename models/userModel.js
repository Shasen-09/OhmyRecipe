const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true }, // recipe ID
    title: String,
    image: String,
  },
  { _id: false }
);

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
  },
  bookmarks: [bookmarkSchema],
}, { timestamps: true });

userSchema.index({ "bookmarks.id": 1 });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;