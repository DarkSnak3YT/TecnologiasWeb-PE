const { run, get, all } = require('../database/db');

function validarEvento(dados) {
  const campos = ['titulo', 'descricao', 'data', 'hora', 'cidade', 'local'];
  return campos.every(campo => dados[campo] && String(dados[campo]).trim() !== '');
}

async function listarEventos(req, res) {
  try {
    const eventos = await all('SELECT id, titulo, descricao, data, hora, cidade, local FROM eventos ORDER BY data ASC, hora ASC');
    res.json(eventos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar eventos.' });
  }
}

async function criarEvento(req, res) {
  try {
    if (!validarEvento(req.body)) return res.status(400).json({ erro: 'Todos os campos do evento são obrigatórios.' });
    const { titulo, descricao, data, hora, cidade, local } = req.body;
    const resultado = await run(
      'INSERT INTO eventos (titulo, descricao, data, hora, cidade, local, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, descricao, data, hora, cidade, local, new Date().toISOString()]
    );
    const evento = await get('SELECT id, titulo, descricao, data, hora, cidade, local FROM eventos WHERE id = ?', [resultado.lastID]);
    res.status(201).json(evento);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar evento.' });
  }
}

async function atualizarEvento(req, res) {
  try {
    if (!validarEvento(req.body)) return res.status(400).json({ erro: 'Todos os campos do evento são obrigatórios.' });
    const { titulo, descricao, data, hora, cidade, local } = req.body;
    const resultado = await run(
      'UPDATE eventos SET titulo = ?, descricao = ?, data = ?, hora = ?, cidade = ?, local = ? WHERE id = ?',
      [titulo, descricao, data, hora, cidade, local, req.params.id]
    );
    if (resultado.changes === 0) return res.status(404).json({ erro: 'Evento não encontrado.' });
    const evento = await get('SELECT id, titulo, descricao, data, hora, cidade, local FROM eventos WHERE id = ?', [req.params.id]);
    res.json(evento);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar evento.' });
  }
}

async function removerEvento(req, res) {
  try {
    const resultado = await run('DELETE FROM eventos WHERE id = ?', [req.params.id]);
    if (resultado.changes === 0) return res.status(404).json({ erro: 'Evento não encontrado.' });
    res.json({ mensagem: 'Evento removido com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover evento.' });
  }
}

module.exports = { listarEventos, criarEvento, atualizarEvento, removerEvento };
