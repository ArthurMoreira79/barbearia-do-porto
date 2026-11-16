import { Link } from 'react-router-dom';
import { FOTOS } from '../utils/photos.js';

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${FOTOS.hero})` }}>
      <div className="container hero-conteudo">
        <span className="hero-tag">Centro Histórico · São Luís – MA</span>
        <h1>
          Chegue pro corte,
          <br />
          fique pro chopp
        </h1>
        <p className="hero-sub">
          Corte, barba e chopp gelado no Centro Histórico. Metade barbearia, metade
          bar — e as duas metades levadas a sério.
        </p>
        <div className="hero-acoes">
          <Link to="/agendar" className="btn btn-primario">
            Agendar horário
          </Link>
          <a href="#servicos" className="btn btn-contorno">
            Ver serviços
          </a>
        </div>
        <div className="hero-info">
          <span>⚓ Rua do Trapiche, 120 — Praia Grande</span>
          <span>🕙 Ter a sáb · 10h às 21h</span>
          <span>🍺 Bebida de cortesia em todo agendamento</span>
        </div>
      </div>
    </section>
  );
}
