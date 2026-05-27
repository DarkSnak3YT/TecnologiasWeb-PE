export default function Footer() {
  return (
    <footer>
      <div className="footer_copyright">
        <p>© 2026 Centro Académico Clínico dos Açores</p>
      </div>
      <div className="footer_socialmedia" aria-label="Redes sociais">
        <a href="#" aria-label="Facebook"><img src="/media/fb.png" alt="Facebook" /></a>{' '}
        <a href="#" aria-label="Instagram"><img src="/media/ig.png" alt="Instagram" /></a>{' '}
        <a href="#" aria-label="LinkedIn"><img src="/media/linkedIn.png" alt="LinkedIn" /></a>
      </div>
      <div className="footer_course">
        <p>Universidade dos Açores | Tecnologias Web</p>
      </div>
      <div className="footer_privacy">
        <p><a href="#">Política de Privacidade</a></p>
      </div>
    </footer>
  );
}
