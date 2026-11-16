import { SEM_PREFERENCIA } from '../useBooking.js';
import { gradeHorarios } from '../../utils/slots.js';
import { minToHora, formatDuracao } from '../../utils/format.js';

export default function StepHorario({ booking, barbeiros }) {
  const { dataISO, barbeiroId, duracaoMin } = booking;
  const slots = gradeHorarios({
    dataISO,
    barbeiroId: barbeiroId === SEM_PREFERENCIA ? null : barbeiroId,
    duracaoMin,
    barbeiros,
  });

  const algumLivre = slots.some((s) => s.livre);

  return (
    <>
      <h2>Que horas?</h2>
      <p className="dica">
        Seu atendimento leva {formatDuracao(duracaoMin)}. Só mostramos horários em
        que ele cabe inteiro.
      </p>
      {algumLivre ? (
        <div className="grade-horas" role="radiogroup" aria-label="Horário">
          {slots.map((s) => (
            <button
              key={s.min}
              type="button"
              role="radio"
              aria-checked={booking.horaMin === s.min}
              className={`hora-btn ${booking.horaMin === s.min ? 'selecionada' : ''}`}
              disabled={!s.livre}
              onClick={() => booking.setHoraMin(s.min)}
            >
              {minToHora(s.min)}
            </button>
          ))}
        </div>
      ) : (
        <div className="estado-vazio">
          <div className="icone">🌊</div>
          <p>
            Maré cheia: nenhum horário livre nesse dia pra essa duração.
            <br />
            Tente outra data ou outro barbeiro.
          </p>
        </div>
      )}
    </>
  );
}
