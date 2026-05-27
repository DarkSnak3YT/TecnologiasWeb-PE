import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';
import Auth from './components/Auth.jsx';
import Perfil from './components/Perfil.jsx';
import Footer from './components/Footer.jsx';
import { api, getToken, logout as limparToken } from './services/api.js';

export default function App() {
  const [utilizador, setUtilizador] = useState(null);
  const [mensagem, setMensagem] = useState('');

  async function carregarPerfil() {
    if (!getToken()) return;
    try {
      const dados = await api.perfil();
      setUtilizador(dados.utilizador);
    } catch {
      limparToken();
      setUtilizador(null);
    }
  }

  useEffect(() => { carregarPerfil(); }, []);

  function terminarSessao() {
    limparToken();
    setUtilizador(null);
    setMensagem('Sessão terminada.');
  }

  return (
    <>
      <Header utilizador={utilizador} onLogout={terminarSessao} />
      {mensagem && <div className="toast success"><span>{mensagem}</span></div>}
      <main>
        <LandingPage />
        <section id="area-utilizador" className="auth-section" tabIndex="0">
          <h1>Área de Utilizador</h1>
          {utilizador ? (
            <Perfil utilizador={utilizador} onAtualizar={carregarPerfil} />
          ) : (
            <Auth onEntrar={carregarPerfil} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
