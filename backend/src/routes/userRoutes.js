const express = require('express');
const autenticar = require('../middleware/authMiddleware');
const { perfil, atualizarPerfil } = require('../controllers/userController');
const router = express.Router();

router.get('/perfil', autenticar, perfil);
router.put('/perfil', autenticar, atualizarPerfil);

module.exports = router;
