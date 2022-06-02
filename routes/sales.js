const { Router } = require('express');
const router = Router();

const saleController = require('../controllers/saleController');

const { addRecord_get, addRecord_post } = saleController;

router.get('/addRecord', addRecord_get);
router.post('/addRecord', addRecord_post);

module.exports = router;
