const express = require('express');
const { listarEventos, criarEvento, atualizarEvento, removerEvento } = require('../controllers/eventController');

const router = express.Router();

router.get('/', listarEventos);
router.post('/', criarEvento);
router.put('/:id', atualizarEvento);
router.delete('/:id', removerEvento);

module.exports = router;
