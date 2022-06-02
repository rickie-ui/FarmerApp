const mongoose = require('mongoose');
const { isEmail } = require('validator');

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
    capitalize: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Please enter phone'],
  },
  idNumber: {
    type: Number,
    trim: true,
    required: [true, 'Please enter ID number'],
  },
  accountNumber: {
    type: Number,
    trim: true,
    required: [true, 'Please enter phone'],
    minlength: [4, 'Account number must be  minimum  4 characters'],
    maxlength: [4, 'Account number must be  maximum  4 characters'],
  },
  product: {
    type: String,
    required: [true, 'Please enter coffee type'],
    capitalize: true,
    trim: true,
  },

  date: { type: Date, default: Date.now() },
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
