import { useState } from 'react';
import { api } from '../services/api.js';

export default function Perfil({ utilizador, onAtualizar }) {
  const [nome, setNome] = useState(utilizador.nome);
  const [mensagem, setMensagem] = useState('');

  async function guardar(e) {
    e.preventDefault();
    await api.atualizarPerfil({ nome });
    setMensagem('Perfil atualizado com sucesso.');
    await onAtualizar();
  }

  return <div className="auth-card"><h2>Perfil</h2><p><strong>Email:</strong> {utilizador.email}</p><p><strong>Permissão:</strong> {utilizador.role}</p><form onSubmit={guardar}><label>Nome</label><input value={nome} onChange={e => setNome(e.target.value)} /><button className="btn-submit">Guardar alterações</button></form>{mensagem && <p className="feedback">{mensagem}</p>}</div>;
}
