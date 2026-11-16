import { SEM_PREFERENCIA, SEM_BEBIDA } from './useBooking.js';
import { formatPreco, formatDuracao, formatDataBR, minToHora } from '../utils/format.js';

export default function BookingSummary({ booking, barbeiros }) {
  const {
    servicosSel,
    barbeiroId,
    dataISO,
    horaMin,
    bebidaId,
    bebidaSel,
    duracaoMin,
    total,
  } = booking;

  const barbeiro =
    barbeiroId && barbeiroId !== SEM_PREFERENCIA
      ? barbeiros.find((b) => b.id === barbeiroId)
      : null;

  const partesMobile = [
    servicosSel.length > 0 && `${servicosSel.length} serviço${servicosSel.length > 1 ? 's' : ''}`,
    dataISO && formatDataBR(dataISO, { comSemana: false }),
    horaMin !== null && minToHora(horaMin),
  ].filter(Boolean);

  return (
    <aside className="resumo" aria-label="Resumo do agendamento">
      <h3>Resumo</h3>
      <dl>
        <div>
          <dt>Serviços</dt>
          <dd>
            {servicosSel.length
              ? servicosSel.map((s) => s.nome).join(', ')
              : '— escolha ao lado'}
            {duracaoMin > 0 && ` · ${formatDuracao(duracaoMin)}`}
          </dd>
        </div>
        {barbeiroId && (
          <div>
            <dt>Barbeiro</dt>
            <dd>{barbeiro ? barbeiro.apelido : 'Sem preferência'}</dd>
          </div>
        )}
        {dataISO && (
          <div>
            <dt>Data</dt>
            <dd>
              {formatDataBR(dataISO)}
              {horaMin !== null && ` às ${minToHora(horaMin)}`}
            </dd>
          </div>
        )}
        {bebidaId && (
          <div>
            <dt>Bebida</dt>
            <dd>
              {bebidaId === SEM_BEBIDA ? 'Sem bebida' : bebidaSel?.nome}
              {bebidaSel?.cortesia && ' (cortesia)'}
            </dd>
          </div>
        )}
      </dl>
      <span className="resumo-mobile-info">{partesMobile.join(' · ')}</span>
      <div className="resumo-total">
        <span>Total</span>
        <span className="valor">{formatPreco(total)}</span>
      </div>
    </aside>
  );
}
