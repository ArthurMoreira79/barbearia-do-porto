import { linkContato } from '../utils/whatsapp.js';

export default function Contato() {
  return (
    <section id="contato" className="secao">
      <div className="container">
        <h2 className="secao-titulo">Contato e Localização</h2>
        <p className="secao-sub">No coração da Praia Grande, a dois passos do cais.</p>
        <div className="contato-grid">
          <div className="contato-bloco">
            <div className="contato-item">
              <h3>Endereço</h3>
              <p>
                Rua do Trapiche, 120 — Praia Grande
                <br />
                Centro Histórico, São Luís – MA
              </p>
            </div>
            <div className="contato-item">
              <h3>Funcionamento</h3>
              <p>
                Terça a sábado, das 10h às 21h
                <br />
                Domingo e segunda fechado
              </p>
            </div>
            <div className="contato-item">
              <h3>Fale com a gente</h3>
              <p>
                <a href={linkContato()} target="_blank" rel="noopener noreferrer">
                  WhatsApp: (98) 98195-2703
                </a>
                <br />
                <a
                  href="https://instagram.com/moreiradev._"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: @moreiradev._ — gostou do projeto? Chama lá
                </a>
              </p>
            </div>
          </div>
          <div className="contato-mapa">
            <iframe
              title="Mapa — Centro Histórico de São Luís"
              src="https://www.google.com/maps?q=Praia+Grande,+Centro+Hist%C3%B3rico,+S%C3%A3o+Lu%C3%ADs+-+MA&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
