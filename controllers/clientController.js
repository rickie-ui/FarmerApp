const Client = require('../models/Client');

//handleErrors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    accountNumber: '',
    product: '',
  };

  if (err.code === 11000) {
    //duplicate error code
    errors.email = 'Email already exists';
    errors.phone = 'Phone number already exists';
    errors.idNumber = 'ID number already exists';
    errors.accountNumber = 'Account number already exists';
    return errors;
  }

  //validation errors

  if (err.message.includes('client validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const addClient_get = (req, res) => {
  res.render('addClient');
};
const addClient_post = async (req, res) => {
  const { fullName, email, phone, idNumber, accountNumber, product } = req.body;
  try {
    const client = await Client.create({
      fullName,
      email,
      phone,
      idNumber,
      accountNumber,
      product,
    });
    res.status(201).json({ client: client._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  addClient_get,
  addClient_post,
};
