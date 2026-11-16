import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LINKS = [
  { href: '#servicos', rotulo: 'Serviços' },
  { href: '#o-bar', rotulo: 'O Bar' },
  { href: '#barbeiros', rotulo: 'Barbeiros' },
  { href: '#clube', rotulo: 'Clube' },
  { href: '#contato', rotulo: 'Contato' },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function irParaSecao(e, hash) {
    e.preventDefault();
    setAberto(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo" onClick={() => setAberto(false)}>
          <img src="/img/logo.jpg" alt="Logo da Barbearia do Porto" />
          <span>Barbearia do Porto</span>
        </Link>

        <button
          className="menu-burger"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {aberto ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>

        <nav className={`header-nav ${aberto ? 'aberto' : ''}`} aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a key={l.href} href={`/${l.href}`} onClick={(e) => irParaSecao(e, l.href)}>
              {l.rotulo}
            </a>
          ))}
          <Link to="/meus-agendamentos" onClick={() => setAberto(false)}>
            Meus agendamentos
          </Link>
          <Link to="/agendar" className="btn btn-primario header-agendar" onClick={() => setAberto(false)}>
            Agendar
          </Link>
        </nav>
      </div>
    </header>
  );
}
