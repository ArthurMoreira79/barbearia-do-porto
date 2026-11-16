import { Link } from 'react-router-dom';
import barbers from '../data/barbers.json';
import { DIAS_SEMANA_CURTO } from '../utils/format.js';

export default function Barbeiros() {
  return (
    <section id="barbeiros" className="secao">
      <div className="container">
        <h2 className="secao-titulo">A Tripulação</h2>
        <p className="secao-sub">
          Três barbeiros, três especialidades. Escolha o seu ou deixe a maré decidir.
        </p>
        <div className="grade-barbeiros">
          {barbers.map((b) => (
            <article key={b.id} className="card-barbeiro">
              <img src={b.foto} alt={`${b.nome}, barbeiro especialista em ${b.especialidade.toLowerCase()}`} loading="lazy" />
              <div className="card-barbeiro-corpo">
                <h3>{b.apelido}</h3>
                <span className="card-barbeiro-especialidade">{b.especialidade}</span>
                <p>{b.descricao}</p>
                <span className="card-barbeiro-dias">
                  Atende: {b.diasAtendimento.map((d) => DIAS_SEMANA_CURTO[d]).join(', ')}
                </span>
                <Link to={`/agendar?barbeiro=${b.id}`} className="btn btn-contorno">
                  Agendar com ele
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
