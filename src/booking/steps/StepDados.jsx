import { maskWhatsApp, validaNome, validaWhatsApp } from '../../utils/format.js';

export default function StepDados({ booking, tentouAvancar }) {
  const { cliente, setCliente } = booking;
  const nomeOk = validaNome(cliente.nome);
  const zapOk = validaWhatsApp(cliente.whatsapp);

  return (
    <>
      <h2>Seus dados</h2>
      <p className="dica">Só o essencial pra confirmar com você pelo WhatsApp.</p>

      <div className="campo">
        <label htmlFor="nome">Nome completo *</label>
        <input
          id="nome"
          type="text"
          autoComplete="name"
          placeholder="Ex.: João Ribamar"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          aria-invalid={tentouAvancar && !nomeOk}
        />
        {tentouAvancar && !nomeOk && (
          <span className="erro">Informe nome e sobrenome.</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="whatsapp">WhatsApp *</label>
        <input
          id="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(98) 9XXXX-XXXX"
          value={cliente.whatsapp}
          onChange={(e) =>
            setCliente({ ...cliente, whatsapp: maskWhatsApp(e.target.value) })
          }
          aria-invalid={tentouAvancar && !zapOk}
        />
        {tentouAvancar && !zapOk && (
          <span className="erro">Número incompleto — use DDD + 9 dígitos.</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="obs">Observação (opcional)</label>
        <textarea
          id="obs"
          rows={3}
          placeholder="Alguma preferência de corte, referência, etc."
          value={cliente.observacao}
          onChange={(e) => setCliente({ ...cliente, observacao: e.target.value })}
        />
      </div>
    </>
  );
}
