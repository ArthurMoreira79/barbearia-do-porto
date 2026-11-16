import { formatPreco, formatDuracao } from '../../utils/format.js';

export default function StepServicos({ booking, servicos }) {
  return (
    <>
      <h2>O que vai ser hoje?</h2>
      <p className="dica">Pode marcar mais de um — o tempo e o total somam sozinhos.</p>
      <div className="opcao-lista" role="group" aria-label="Serviços">
        {servicos.map((s) => {
          const sel = booking.servicosIds.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              className={`opcao ${sel ? 'selecionada' : ''}`}
              aria-pressed={sel}
              onClick={() => booking.toggleServico(s.id)}
            >
              <span className="opcao-check" aria-hidden="true">
                {sel ? '✓' : ''}
              </span>
              <span className="opcao-corpo">
                <span className="opcao-titulo">{s.nome}</span>
                <span className="opcao-desc">
                  {formatDuracao(s.duracaoMin)} · {s.descricao}
                </span>
              </span>
              <span className="opcao-preco">{formatPreco(s.preco)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
