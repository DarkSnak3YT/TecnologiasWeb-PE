const express = require('express');
const { registo, login } = require('../controllers/authController');
const router = express.Router();

router.post('/registo', registo);
router.post('/login', login);

module.exports = router;
