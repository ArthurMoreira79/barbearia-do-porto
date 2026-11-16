import { linkClube } from '../utils/whatsapp.js';

const PLANOS = [
  {
    id: 'marinheiro',
    nome: 'Marinheiro',
    preco: 79,
    beneficios: ['2 cortes por mês', '2 chopps da casa', 'Prioridade na agenda'],
    destaque: false,
  },
  {
    id: 'capitao',
    nome: 'Capitão',
    preco: 149,
    beneficios: [
      'Cortes e barbas ilimitados',
      'Chopp em todo atendimento',
      'Prioridade máxima na agenda',
      'Desconto no bar',
    ],
    destaque: true,
  },
];

export default function Clube() {
  return (
    <section id="clube" className="secao secao-alt">
      <div className="container">
        <h2 className="secao-titulo">Clube do Porto</h2>
        <p className="secao-sub">
          Assinatura mensal pra quem vive de corte em dia. Cancele quando quiser —
          mas ninguém cancela.
        </p>
        <div className="clube-grid">
          {PLANOS.map((p) => (
            <article key={p.id} className={`card-plano ${p.destaque ? 'destaque' : ''}`}>
              {p.destaque && <span className="selo">Mais pedido</span>}
              <h3>{p.nome}</h3>
              <div className="card-plano-preco">
                R$ {p.preco}
                <small>/mês</small>
              </div>
              <ul>
                {p.beneficios.map((b) => (
                  <li key={b}>⚓ {b}</li>
                ))}
              </ul>
              <a
                href={linkClube(p.nome)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${p.destaque ? 'btn-primario' : 'btn-contorno'}`}
              >
                Assinar pelo WhatsApp
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
