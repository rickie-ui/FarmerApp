const { Router } = require('express');
const router = Router();

const authController = require('../controllers/authControllers');

const {
  signup_get,
  signup_post,
  signin_get,
  signin_post,
  logout_get,
} = authController;

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/signin', signin_get);
router.post('/signin', signin_post);
router.get('/logout', logout_get);
module.exports = router;
