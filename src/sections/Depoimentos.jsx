import testimonials from '../data/testimonials.json';

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="secao secao-alt">
      <div className="container">
        <h2 className="secao-titulo">Palavra de Cliente</h2>
        <p className="secao-sub">Quem senta na cadeira volta. E geralmente fica mais um pouco.</p>
        <div className="depo-grid">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="card-depo">
              <span className="estrelas" aria-label={`${t.nota} de 5 estrelas`}>
                {'★'.repeat(t.nota)}
              </span>
              <p>“{t.texto}”</p>
              <footer>— {t.nome}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
