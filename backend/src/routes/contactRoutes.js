
const express = require('express');
const { listarContactos, criarContacto } = require('../controllers/contactController');

const router = express.Router();

router.get('/', listarContactos);
router.post('/', criarContacto);

module.exports = router;
