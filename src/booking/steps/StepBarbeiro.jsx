import { SEM_PREFERENCIA } from '../useBooking.js';
import { DIAS_SEMANA_CURTO, parseISODate } from '../../utils/format.js';

export default function StepBarbeiro({ booking, barbeiros }) {
  const { dataISO } = booking;
  const diaEscolhido = dataISO ? parseISODate(dataISO).getDay() : null;
  const visiveis =
    diaEscolhido === null
      ? barbeiros
      : barbeiros.filter((b) => b.diasAtendimento.includes(diaEscolhido));

  return (
    <>
      <h2>Com quem?</h2>
      <p className="dica">
        {diaEscolhido === null
          ? 'Escolha seu barbeiro ou deixe com a gente.'
          : 'Mostrando só quem atende na data que você escolheu.'}
      </p>
      <div className="opcao-lista" role="radiogroup" aria-label="Barbeiro">
        {visiveis.map((b) => {
          const sel = booking.barbeiroId === b.id;
          return (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={sel}
              className={`opcao ${sel ? 'selecionada' : ''}`}
              onClick={() => booking.escolherBarbeiro(b.id)}
            >
              <img className="opcao-foto" src={b.foto} alt="" />
              <span className="opcao-corpo">
                <span className="opcao-titulo">{b.apelido}</span>
                <span className="opcao-desc">
                  {b.especialidade} · atende{' '}
                  {b.diasAtendimento.map((d) => DIAS_SEMANA_CURTO[d]).join(', ')}
                </span>
              </span>
            </button>
          );
        })}
        <button
          type="button"
          role="radio"
          aria-checked={booking.barbeiroId === SEM_PREFERENCIA}
          className={`opcao ${booking.barbeiroId === SEM_PREFERENCIA ? 'selecionada' : ''}`}
          onClick={() => booking.escolherBarbeiro(SEM_PREFERENCIA)}
        >
          <span className="opcao-check opcao-radio" aria-hidden="true">
            {booking.barbeiroId === SEM_PREFERENCIA ? '✓' : ''}
          </span>
          <span className="opcao-corpo">
            <span className="opcao-titulo">Sem preferência</span>
            <span className="opcao-desc">
              A casa escolhe quem estiver livre no seu horário.
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
