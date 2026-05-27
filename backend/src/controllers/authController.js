const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { run, get } = require('../database/db');

function criarToken(utilizador) {
  return jwt.sign(
    { id: utilizador.id, email: utilizador.email, role: utilizador.role },
    process.env.JWT_SECRET || 'segredo_do_projeto_caca',
    { expiresIn: '2h' }
  );
}

async function registo(req, res) {
  const { nome, email, password } = req.body;
  if (!nome || !email || !password) return res.status(400).json({ erro: 'Nome, email e password são obrigatórios.' });
  if (password.length < 6) return res.status(400).json({ erro: 'A password deve ter pelo menos 6 caracteres.' });

  try {
    const existe = await get('SELECT id FROM utilizadores WHERE email = ?', [email]);
    if (existe) return res.status(409).json({ erro: 'Este email já está registado.' });

    const hash = await bcrypt.hash(password, 10);
    const resultado = await run('INSERT INTO utilizadores (nome, email, password_hash, role, criado_em) VALUES (?, ?, ?, ?, ?)',
      [nome, email, hash, 'utilizador', new Date().toISOString()]);

    const utilizador = { id: resultado.lastID, nome, email, role: 'utilizador' };
    res.status(201).json({ utilizador, token: criarToken(utilizador) });
  } catch {
    res.status(500).json({ erro: 'Erro ao criar utilizador.' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ erro: 'Email e password são obrigatórios.' });

  const utilizador = await get('SELECT * FROM utilizadores WHERE email = ?', [email]);
  if (!utilizador) return res.status(401).json({ erro: 'Credenciais inválidas.' });

  const passwordCorreta = await bcrypt.compare(password, utilizador.password_hash);
  if (!passwordCorreta) return res.status(401).json({ erro: 'Credenciais inválidas.' });

  res.json({
    utilizador: { id: utilizador.id, nome: utilizador.nome, email: utilizador.email, role: utilizador.role },
    token: criarToken(utilizador)
  });
}

module.exports = { registo, login };
