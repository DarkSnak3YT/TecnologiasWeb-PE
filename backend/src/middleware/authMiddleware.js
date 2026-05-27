const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: 'Token não enviado.' });

  const token = header.replace('Bearer ', '');
  try {
    req.utilizador = jwt.verify(token, process.env.JWT_SECRET || 'segredo_do_projeto_caca');
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
}

module.exports = autenticar;
