const API_URL = 'http://localhost:3001/api';

export function getToken() { return localStorage.getItem('token'); }
export function saveToken(token) { localStorage.setItem('token', token); }
export function logout() { localStorage.removeItem('token'); }

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const resposta = await fetch(`${API_URL}${path}`, { ...options, headers });
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.erro || 'Erro na comunicação com a API');
  return dados;
}

export const api = {
  registar: (dados) => request('/auth/registo', { method: 'POST', body: JSON.stringify(dados) }),
  login: (dados) => request('/auth/login', { method: 'POST', body: JSON.stringify(dados) }),
  perfil: () => request('/utilizadores/perfil'),
  atualizarPerfil: (dados) => request('/utilizadores/perfil', { method: 'PUT', body: JSON.stringify(dados) }),
  listarEventos: () => request('/eventos'),
  criarEvento: (dados) => request('/eventos', { method: 'POST', body: JSON.stringify(dados) }),
  atualizarEvento: (id, dados) => request(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
  removerEvento: (id) => request(`/eventos/${id}`, { method: 'DELETE' }),
  subscreverNewsletter: (dados) => request('/newsletter', { method: 'POST', body: JSON.stringify(dados) }),
  enviarContacto: (dados) => request('/contactos', { method: 'POST', body: JSON.stringify(dados) })
};
