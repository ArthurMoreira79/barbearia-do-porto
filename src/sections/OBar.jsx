import drinks from '../data/drinks.json';
import { formatPreco } from '../utils/format.js';
import { FOTOS } from '../utils/photos.js';

export default function OBar() {
  return (
    <section id="o-bar" className="secao secao-alt">
      <div className="container">
        <h2 className="secao-titulo">O Bar</h2>
        <p className="secao-sub">
          Chopp gelado na torneira, café passado na hora e um balcão que rende
          conversa. Chegue antes, fique depois — aqui ninguém corta e corre.
        </p>
        <div className="obar-grid">
          <div className="obar-foto">
            <img src={FOTOS.balcao} alt="Balcão de madeira do bar, com banquetas e luz quente" loading="lazy" />
          </div>
          <div>
            <ul className="obar-lista">
              {drinks.map((d) => (
                <li key={d.id}>
                  <span>{d.nome}</span>
                  <span className="preco">{formatPreco(d.preco)}</span>
                </li>
              ))}
            </ul>
            <div className="cortesia-box">
              🍺 <strong>Por conta da casa:</strong> agendou, ganhou. Todo
              atendimento vem com um chopp 300 ml, refri ou café de cortesia — é só
              escolher o seu na hora de agendar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
