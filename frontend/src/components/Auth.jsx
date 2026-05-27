import { useState } from 'react';
import { api, saveToken } from '../services/api.js';

export default function Auth({ onEntrar }) {
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ nome: '', email: '', password: '' });
  const [erro, setErro] = useState('');

  async function submeter(e) {
    e.preventDefault();
    setErro('');
    try {
      const resposta = modo === 'login' ? await api.login(form) : await api.registar(form);
      saveToken(resposta.token);
      await onEntrar();
    } catch (err) { setErro(err.message); }
  }

  return <div className="auth-card"><div className="auth-tabs"><button className={modo==='login'?'active':''} onClick={() => setModo('login')}>Login</button><button className={modo==='registo'?'active':''} onClick={() => setModo('registo')}>Registo</button></div><form onSubmit={submeter}>{modo === 'registo' && <input placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome:e.target.value})} />}<input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /><input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} /><button className="btn-submit">{modo === 'login' ? 'Entrar' : 'Criar conta'}</button>{erro && <p className="erro-validacao">{erro}</p>}</form></div>;
}
