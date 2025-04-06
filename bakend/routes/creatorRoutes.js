const express = require('express');
const router = express.Router();
const { registerCreator } = require('../controllers/creatorController');

router.post('/register', registerCreator);

module.exports = router;
