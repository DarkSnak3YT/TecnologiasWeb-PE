const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const caminhoBD = path.join(__dirname, 'caca.db');
const db = new sqlite3.Database(caminhoBD);

function run(sql, params = []) {
  return new Promise((resolve, reject) => db.run(sql, params, function (erro) {
    if (erro) reject(erro); else resolve(this);
  }));
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => db.get(sql, params, (erro, linha) => {
    if (erro) reject(erro); else resolve(linha);
  }));
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => db.all(sql, params, (erro, linhas) => {
    if (erro) reject(erro); else resolve(linhas);
  }));
}

async function iniciarBaseDados() {
  await run(`CREATE TABLE IF NOT EXISTS utilizadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'utilizador',
    criado_em TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    cidade TEXT NOT NULL,
    local TEXT NOT NULL,
    criado_em TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    pais TEXT NOT NULL,
    criado_em TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    assunto TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TEXT NOT NULL
  )`);


  const admin = await get('SELECT id FROM utilizadores WHERE email = ?', ['admin@caca.pt']);
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    await run('INSERT INTO utilizadores (nome, email, password_hash, role, criado_em) VALUES (?, ?, ?, ?, ?)',
      ['Administrador CACA', 'admin@caca.pt', hash, 'admin', new Date().toISOString()]);
  }

  const totalEventos = await get('SELECT COUNT(*) AS total FROM eventos');
  if (!totalEventos || totalEventos.total === 0) {
    await run('INSERT INTO eventos (titulo, descricao, data, hora, cidade, local, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['Seminário de Saúde Mental', 'Exercício físico como ferramenta de promoção da saúde mental.', '2026-06-04', '10:00', 'Ponta Delgada', 'Auditório Principal', new Date().toISOString()]);
    await run('INSERT INTO eventos (titulo, descricao, data, hora, cidade, local, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['Formação em Telemedicina', 'Boas práticas no acompanhamento remoto de utentes.', '2026-06-12', '14:30', 'Angra do Heroísmo', 'Sala de Conferências', new Date().toISOString()]);
  }
}

module.exports = { db, run, get, all, iniciarBaseDados };
