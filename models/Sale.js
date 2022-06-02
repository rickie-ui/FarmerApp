const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  marketNumber: {
    type: Number,
    trim: true,
    required: [true, 'Please enter account number'],
    minlength: [4, 'Account number must be  minimum  4 characters'],
    maxlength: [4, 'Account number must be  maximum  4 characters'],
  },
  quantity: {
    type: String,
    required: [true, 'Please enter quantity'],
    capitalize: true,
    trim: true,
  },

  date: { type: Date, default: Date.now() },
});

const Sale = mongoose.model('sale', saleSchema);

module.exports = Sale;
