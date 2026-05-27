const { get, run } = require('../database/db');

async function perfil(req, res) {
  const utilizador = await get('SELECT id, nome, email, role, criado_em FROM utilizadores WHERE id = ?', [req.utilizador.id]);
  if (!utilizador) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
  res.json({ utilizador });
}

async function atualizarPerfil(req, res) {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: 'O nome é obrigatório.' });
  await run('UPDATE utilizadores SET nome = ? WHERE id = ?', [nome, req.utilizador.id]);
  const utilizador = await get('SELECT id, nome, email, role, criado_em FROM utilizadores WHERE id = ?', [req.utilizador.id]);
  res.json({ utilizador });
}

module.exports = { perfil, atualizarPerfil };
