const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const clientRoute = require('./routes/add');
const saleRoute = require('./routes/sales');
const cookieParser = require('cookie-parser');

const Client = require('./models/Client');
const Sale = require('./models/Sale');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
//middlesware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
        styleSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://cdn.datatables.net',
          'fonts.googleapis.com',
          "'unsafe-inline'",
        ],
        fontSrc: [
          "'self'",
          'fonts.gstatic.com',
          'https://cdnjs.cloudflare.com',
        ],
        imgSrc: [
          "'self'",
          'https://maps.gstatic.com',
          'https://maps.googleapis.com',
          'https://cdn.datatables.net',
          'data:',
        ],
        frameSrc: ["'self'", 'https://www.google.com'],
      },
    },
  })
);
app.use(cors('*'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//view engine
app.set('view engine', 'ejs');

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);

app.get('/', (req, res) => res.render('index'));
app.get('/home', requireAuth, (req, res) => {
  Client.find({}).exec((err, clients) => {
    if (err) throw err;
    res.render('home', {
      clients: clients,
    });
  });
});

app.get('/addRecord', requireAuth, (req, res) => {
  Sale.find({}).exec((err, sales) => {
    if (err) throw err;
    res.render('addRecord', { sales: sales });
  });
});
app.get('/addClient', requireAuth, (req, res) => res.render('addClient'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.use(authRoutes, clientRoute, saleRoute);

// 404 error handler
app.use(function (req, res, next) {
  res.status(404).render('404');
});
//error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
