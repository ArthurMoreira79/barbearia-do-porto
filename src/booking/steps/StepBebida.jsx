import { SEM_BEBIDA } from '../useBooking.js';
import { formatPreco } from '../../utils/format.js';

export default function StepBebida({ booking, bebidas }) {
  const precisaConfirmarIdade = booking.bebidaSel?.alcoolica;

  return (
    <>
      <h2>E pra beber?</h2>
      <p className="dica">
        Uma bebida de cortesia por agendamento — chopp 300 ml, refri ou café. As
        demais entram na conta.
      </p>
      <div className="opcao-lista" role="radiogroup" aria-label="Bebida">
        {bebidas.map((b) => {
          const sel = booking.bebidaId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={sel}
              className={`opcao ${sel ? 'selecionada' : ''}`}
              onClick={() => booking.escolherBebida(b.id, b.alcoolica)}
            >
              <span className="opcao-check opcao-radio" aria-hidden="true">
                {sel ? '✓' : ''}
              </span>
              <span className="opcao-corpo">
                <span className="opcao-titulo">
                  {b.nome}
                  {b.cortesia && <span className="tag-cortesia">Cortesia</span>}
                </span>
                <span className="opcao-desc">{b.descricao}</span>
              </span>
              <span className="opcao-preco">
                {b.cortesia ? 'R$ 0' : formatPreco(b.preco)}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          role="radio"
          aria-checked={booking.bebidaId === SEM_BEBIDA}
          className={`opcao ${booking.bebidaId === SEM_BEBIDA ? 'selecionada' : ''}`}
          onClick={() => booking.escolherBebida(SEM_BEBIDA, false)}
        >
          <span className="opcao-check opcao-radio" aria-hidden="true">
            {booking.bebidaId === SEM_BEBIDA ? '✓' : ''}
          </span>
          <span className="opcao-corpo">
            <span className="opcao-titulo">Sem bebida</span>
            <span className="opcao-desc">Só a navalha mesmo.</span>
          </span>
        </button>
      </div>

      {precisaConfirmarIdade && (
        <label className="check-idade">
          <input
            type="checkbox"
            checked={booking.maior18}
            onChange={(e) => booking.setMaior18(e.target.checked)}
          />
          <span>
            Tenho 18 anos ou mais. (Venda de bebidas alcoólicas proibida para
            menores de 18 anos.)
          </span>
        </label>
      )}
    </>
  );
}
