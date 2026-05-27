export default function Header({ utilizador, onLogout }) {
  return (
    <header>
      <div className="logo">
        <a href="#apresentacao"><img src="/media/logo.png" alt="Centro Académico Clínico dos Açores" /></a>
      </div>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-label="Abrir menu de navegação" />
      <label htmlFor="menu-toggle" className="hamburger">
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        <div className="hamburger-line" />
      </label>

      <nav className="navbar" aria-label="Menu principal">
        <a href="#apresentacao">Apresentação</a>
        <a href="#noticias">Notícias</a>
        <a href="#investigacao">Investigação</a>
        <a href="#eventos">Eventos</a>
        <a href="#parceiros">Parceiros</a>
        <a href="#oportunidades">Oportunidades</a>
        <a href="#contactos">Contactos</a>
        <a href="#area-utilizador">{utilizador ? 'Perfil' : 'Login'}</a>
        {utilizador && <button className="nav-button" onClick={onLogout}>Sair</button>}
      </nav>
    </header>
  );
}
