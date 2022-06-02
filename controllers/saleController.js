const Sale = require('../models/Sale');

//handleErrors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    marketNumber: '',
    quantity: '',
  };

  //validation errors

  if (err.message.includes('sale validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const addRecord_get = (req, res) => {
  res.render('addRecord');
};
const addRecord_post = async (req, res) => {
  const { marketNumber, quantity } = req.body;
  try {
    const sale = await Sale.create({
      marketNumber,
      quantity,
    });

    res.status(201).json({ sale: sale._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  addRecord_get,
  addRecord_post,
};
