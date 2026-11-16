import { useState } from 'react';
import { Link } from 'react-router-dom';
import { carregarAgendamentos, cancelarAgendamento } from '../utils/storage.js';
import { formatDataBR, parseISODate, horaToMin } from '../utils/format.js';

function ehPassado(a) {
  const d = parseISODate(a.data);
  d.setMinutes(horaToMin(a.hora) + a.duracaoMin);
  return d < new Date();
}

export default function MeusAgendamentos() {
  const [lista, setLista] = useState(carregarAgendamentos);
  const [confirmandoId, setConfirmandoId] = useState(null);

  function cancelar(id) {
    setLista(cancelarAgendamento(id));
    setConfirmandoId(null);
  }

  const ordenados = [...lista].sort((a, b) => {
    const pa = ehPassado(a) || a.status === 'cancelado';
    const pb = ehPassado(b) || b.status === 'cancelado';
    if (pa !== pb) return pa ? 1 : -1;
    const da = `${a.data}T${a.hora}`;
    const db = `${b.data}T${b.hora}`;
    return pa ? db.localeCompare(da) : da.localeCompare(db);
  });

  return (
    <div className="pagina">
      <div className="container">
        <h1 className="pagina-titulo">Meus agendamentos</h1>

        {ordenados.length === 0 ? (
          <div className="estado-vazio">
            <div className="icone" aria-hidden="true">⚓</div>
            <p>
              Nenhum agendamento por aqui ainda.
              <br />
              Bora resolver isso?
            </p>
            <Link to="/agendar" className="btn btn-primario" style={{ marginTop: 16 }}>
              Agendar agora
            </Link>
          </div>
        ) : (
          <div className="agd-lista">
            {ordenados.map((a) => {
              const passado = ehPassado(a);
              const cancelado = a.status === 'cancelado';
              return (
                <article
                  key={a.id}
                  className={`agd-card ${cancelado ? 'cancelado' : passado ? 'passado' : ''}`}
                >
                  <div>
                    <h3>{a.servicosNomes?.join(', ') ?? a.servicos.join(', ')}</h3>
                    <p>
                      {formatDataBR(a.data)} às {a.hora} · com {a.barbeiroNome}
                    </p>
                    <p>
                      {a.bebidaNome} · Total R$ {a.total}
                    </p>
                  </div>
                  <div className="agd-acoes">
                    <span className={`agd-status ${cancelado ? 'cancelado' : 'confirmado'}`}>
                      {cancelado ? 'Cancelado' : passado ? 'Realizado' : 'Confirmado'}
                    </span>
                    {!cancelado && !passado && (
                      confirmandoId === a.id ? (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            className="btn btn-fantasma"
                            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                            onClick={() => setConfirmandoId(null)}
                          >
                            Manter
                          </button>
                          <button
                            type="button"
                            className="btn btn-contorno"
                            style={{
                              padding: '8px 14px',
                              fontSize: '0.82rem',
                              borderColor: 'var(--cor-erro)',
                              color: 'var(--cor-erro)',
                            }}
                            onClick={() => cancelar(a.id)}
                          >
                            Confirmar cancelamento
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-fantasma"
                          style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                          onClick={() => setConfirmandoId(a.id)}
                        >
                          Cancelar
                        </button>
                      )
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
