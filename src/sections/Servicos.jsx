import { Link } from 'react-router-dom';
import services from '../data/services.json';
import { formatPreco, formatDuracao } from '../utils/format.js';

export default function Servicos() {
  return (
    <section id="servicos" className="secao">
      <div className="container">
        <h2 className="secao-titulo">Serviços</h2>
        <p className="secao-sub">
          Preço fechado, horário marcado e navalha afiada. Sem surpresa, só capricho.
        </p>
        <div className="grade-servicos">
          {services.map((s) => (
            <article key={s.id} className="card-servico">
              <div className="card-servico-topo">
                <h3>{s.nome}</h3>
                <span className="card-servico-preco">{formatPreco(s.preco)}</span>
              </div>
              <span className="card-servico-duracao">{formatDuracao(s.duracaoMin)}</span>
              <p>{s.descricao}</p>
              <Link to={`/agendar?servico=${s.id}`} className="btn btn-contorno">
                Agendar este
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
