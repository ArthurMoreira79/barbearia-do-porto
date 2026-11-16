import { FOTOS } from '../utils/photos.js';

export default function Galeria() {
  return (
    <section id="galeria" className="secao">
      <div className="container">
        <h2 className="secao-titulo">No Porto</h2>
        <p className="secao-sub">Um pouco do que rola entre uma navalha e um colarinho.</p>
        <div className="galeria-grid">
          {FOTOS.galeria.map((f) => (
            <img key={f.url} src={f.url} alt={f.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
