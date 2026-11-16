import { SEM_PREFERENCIA } from '../useBooking.js';
import { proximosDias } from '../../utils/slots.js';
import { DIAS_SEMANA_CURTO } from '../../utils/format.js';

export default function StepData({ booking, barbeiros }) {
  const barbeiro =
    booking.barbeiroId && booking.barbeiroId !== SEM_PREFERENCIA
      ? barbeiros.find((b) => b.id === booking.barbeiroId)
      : null;

  const dias = proximosDias({ barbeiro, dias: 14 });

  return (
    <>
      <h2>Que dia?</h2>
      <p className="dica">
        Próximos 14 dias. Domingo e segunda a casa descansa
        {barbeiro ? `; e o ${barbeiro.apelido} tem os dias dele.` : '.'}
      </p>
      <div className="grade-datas" role="radiogroup" aria-label="Data">
        {dias.map((d) => (
          <button
            key={d.iso}
            type="button"
            role="radio"
            aria-checked={booking.dataISO === d.iso}
            className={`data-btn ${booking.dataISO === d.iso ? 'selecionada' : ''}`}
            disabled={!d.habilitado}
            title={
              d.motivo === 'fechado'
                ? 'Fechado'
                : d.motivo === 'folga'
                  ? 'Barbeiro de folga'
                  : undefined
            }
            onClick={() => booking.escolherData(d.iso)}
          >
            <span className="semana">{DIAS_SEMANA_CURTO[d.diaSemana]}</span>
            <span className="dia">{d.dia}</span>
          </button>
        ))}
      </div>
    </>
  );
}
