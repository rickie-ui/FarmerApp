const { Router } = require('express');
const router = Router();

const clientController = require('../controllers/clientController');

const { addClient_get, addClient_post } = clientController;

router.get('/addClient', addClient_get);
router.post('/addClient', addClient_post);

module.exports = router;
