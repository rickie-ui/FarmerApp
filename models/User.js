const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
    capitalize: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  number: {
    type: String,
    required: [true, 'Please enter mobile number'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

// //fire a function after user has been saved to db
// userSchema.post('save', function (user, next) {
//   console.log('New user has been saved', user);
//   next();
// });

//fire a function before user has been saved to db
// userSchema.pre('save', function (next) {
//   console.log('New user about to be created and  saved', this);
//   next();
// });

//hash password before its saved
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user

userSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Invalid email or password');
  }
  throw Error('Invalid email or password');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
