
const { run, all } = require('../database/db');

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function telefoneValido(telefone) {
  return /^\d{9}$/.test(String(telefone || '').trim());
}

async function listarContactos(req, res) {
  try {
    const contactos = await all('SELECT id, nome, email, telefone, assunto, mensagem, criado_em FROM contactos ORDER BY id DESC');
    res.json(contactos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar mensagens de contacto.' });
  }
}

async function criarContacto(req, res) {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    if (!nome || String(nome).trim().length < 2) {
      return res.status(400).json({ erro: 'Indique um nome válido.' });
    }
    if (!emailValido(email)) {
      return res.status(400).json({ erro: 'Indique um e-mail válido.' });
    }
    if (!telefoneValido(telefone)) {
      return res.status(400).json({ erro: 'O telemóvel deve ter 9 dígitos.' });
    }
    if (!assunto || assunto === 'default') {
      return res.status(400).json({ erro: 'Selecione um assunto.' });
    }
    if (!mensagem || String(mensagem).trim().length < 5) {
      return res.status(400).json({ erro: 'Escreva uma mensagem com pelo menos 5 caracteres.' });
    }

    await run(
      'INSERT INTO contactos (nome, email, telefone, assunto, mensagem, criado_em) VALUES (?, ?, ?, ?, ?, ?)',
      [nome.trim(), email.trim().toLowerCase(), telefone.trim(), assunto, mensagem.trim(), new Date().toISOString()]
    );

    res.status(201).json({ mensagem: 'Mensagem de contacto guardada com sucesso.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao guardar mensagem de contacto.' });
  }
}

module.exports = { listarContactos, criarContacto };
