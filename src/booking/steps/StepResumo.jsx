import { SEM_PREFERENCIA, SEM_BEBIDA } from '../useBooking.js';
import {
  formatPreco,
  formatDuracao,
  formatDataBR,
  minToHora,
} from '../../utils/format.js';

export default function StepResumo({ booking, barbeiros }) {
  const {
    servicosSel,
    barbeiroId,
    dataISO,
    horaMin,
    bebidaId,
    bebidaSel,
    cliente,
    duracaoMin,
    total,
  } = booking;

  const barbeiro =
    barbeiroId !== SEM_PREFERENCIA ? barbeiros.find((b) => b.id === barbeiroId) : null;

  const linhas = [
    ['Serviços', `${servicosSel.map((s) => s.nome).join(', ')} (${formatDuracao(duracaoMin)})`],
    ['Barbeiro', barbeiro ? `${barbeiro.apelido} — ${barbeiro.especialidade}` : 'Sem preferência (a casa escolhe)'],
    ['Data e hora', `${formatDataBR(dataISO)} às ${minToHora(horaMin)}`],
    [
      'Bebida',
      bebidaId === SEM_BEBIDA
        ? 'Sem bebida'
        : `${bebidaSel.nome}${bebidaSel.cortesia ? ' — cortesia da casa' : ''}`,
    ],
    ['Nome', cliente.nome],
    ['WhatsApp', cliente.whatsapp],
  ];
  if (cliente.observacao.trim()) linhas.push(['Observação', cliente.observacao.trim()]);

  return (
    <>
      <h2>Confere aí</h2>
      <p className="dica">
        Tudo certo? O botão abaixo salva seu horário e abre o WhatsApp com a
        mensagem pronta.
      </p>
      <dl style={{ display: 'grid', gap: 12, margin: 0 }}>
        {linhas.map(([rotulo, valor]) => (
          <div key={rotulo}>
            <dt
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--cor-texto-suave)',
              }}
            >
              {rotulo}
            </dt>
            <dd style={{ margin: 0 }}>{valor}</dd>
          </div>
        ))}
      </dl>
      <div className="resumo-total">
        <span>Total</span>
        <span className="valor">{formatPreco(total)}</span>
      </div>
    </>
  );
}
