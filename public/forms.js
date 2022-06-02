//signup
const signupForm = document.querySelector('#signupForm');
const usernameError = document.querySelector('.username.error');
const emailError = document.querySelector('.email.error');
const numberError = document.querySelector('.number.error');
const passwordError = document.querySelector('.password.error');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //reset errors
    usernameError.textContent = '';
    emailError.textContent = '';
    numberError.textContent = '';
    passwordError.textContent = '';
    // get values
    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const number = signupForm.number.value;
    const password = signupForm.password.value;

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, number, password }),
        headers: { 'content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        usernameError.textContent = data.errors.username;
        emailError.textContent = data.errors.email;
        numberError.textContent = data.errors.number;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('signin');
      }
    } catch (err) {
      console.log(err);
    }
  });
}

// //signin
const signinForm = document.querySelector('#signinForm');
const emailErr = document.querySelector('.email.error');
const passwordErr = document.querySelector('.password.error');
if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //reset errors
    emailErr.textContent = '';
    passwordErr.textContent = '';

    // get values
    const email = signinForm.email.value;
    const password = signinForm.password.value;

    try {
      const res = await fetch('/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.errors) {
        emailErr.textContent = data.errors.email;
        passwordErr.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('home');
      }
    } catch (err) {
      console.log(err);
    }
  });
}

//addClient
const addMember = document.querySelector('#add-member');
const fullNameError = document.querySelector('.fullName.error');
const mailError = document.querySelector('.email.error');
const phoneError = document.querySelector('.phone.error');
const idNumberError = document.querySelector('.idNumber.error');
const accountNumberError = document.querySelector('.accountNumber.error');
const productError = document.querySelector('.product.error');
if (addMember) {
  addMember.addEventListener('submit', async (e) => {
    e.preventDefault();
    //reset errors
    fullNameError.textContent = '';
    mailError.textContent = '';
    phoneError.textContent = '';
    idNumberError.textContent = '';
    accountNumberError.textContent = '';
    productError.textContent = '';
    // get values
    const fullName = addMember.fullName.value;
    const email = addMember.email.value;
    const phone = addMember.phone.value;
    const idNumber = addMember.idNumber.value;
    const accountNumber = addMember.accountNumber.value;
    const product = addMember.product.value;

    try {
      const res = await fetch('/addClient', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          phone,
          idNumber,
          accountNumber,
          product,
        }),
        headers: { 'content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.errors) {
        fullNameError.textContent = data.errors.fullName;
        mailError.textContent = data.errors.email;
        phoneError.textContent = data.errors.phone;
        idNumberError.textContent = data.errors.idNumber;
        accountNumberError.textContent = data.errors.accountNumber;
        productError.textContent = data.errors.product;
      }
    } catch (err) {
      console.log(err);
    }
  });
}

//Market form
const addRecord = document.querySelector('#add-record');
const marketNumberErr = document.querySelector('.marketNumber.error');
const quantityErr = document.querySelector('.quantity.error');
if (addRecord) {
  addRecord.addEventListener('submit', async (e) => {
    e.preventDefault();
    //reset errors
    marketNumberErr.textContent = '';
    quantityErr.textContent = '';

    // get values
    const marketNumber = addRecord.marketNumber.value;
    const quantity = addRecord.quantity.value;

    try {
      const res = await fetch('/addRecord', {
        method: 'POST',
        body: JSON.stringify({ marketNumber, quantity }),
        headers: { 'content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        marketNumberErr.textContent = data.errors.marketNumber;
        quantityErr.textContent = data.errors.quantity;
      }
    } catch (err) {
      console.log(err);
    }
  });
}
