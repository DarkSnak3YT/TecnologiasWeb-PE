const { run } = require('../database/db');

async function subscreverNewsletter(req, res) {
  try {
    const { email, pais } = req.body;
    if (!email || !email.includes('@') || !pais || pais === 'default') {
      return res.status(400).json({ erro: 'Indique um e-mail válido e selecione o país.' });
    }

    await run(
      'INSERT INTO newsletter (email, pais, criado_em) VALUES (?, ?, ?)',
      [email.trim().toLowerCase(), pais, new Date().toISOString()]
    );
    res.status(201).json({ mensagem: 'Subscrição registada com sucesso.' });
  } catch (erro) {
    if (erro && erro.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ erro: 'Este e-mail já está subscrito.' });
    }
    res.status(500).json({ erro: 'Erro ao registar subscrição.' });
  }
}

module.exports = { subscreverNewsletter };
