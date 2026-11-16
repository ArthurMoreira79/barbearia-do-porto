import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking, PASSOS, SEM_PREFERENCIA, SEM_BEBIDA } from './useBooking.js';
import BookingSummary from './BookingSummary.jsx';
import StepServicos from './steps/StepServicos.jsx';
import StepBarbeiro from './steps/StepBarbeiro.jsx';
import StepData from './steps/StepData.jsx';
import StepHorario from './steps/StepHorario.jsx';
import StepBebida from './steps/StepBebida.jsx';
import StepDados from './steps/StepDados.jsx';
import StepResumo from './steps/StepResumo.jsx';
import { atribuirBarbeiro } from '../utils/slots.js';
import { salvarAgendamento, novoId } from '../utils/storage.js';
import { mensagemAgendamento, linkWhatsApp } from '../utils/whatsapp.js';
import {
  toISODate,
  minToHora,
  formatDataBR,
  validaNome,
  validaWhatsApp,
} from '../utils/format.js';

/**
 * Fluxo de agendamento reutilizável: recebe o catálogo (serviços, profissionais,
 * bebidas) por props, sem depender dos dados da barbearia.
 */
export default function BookingFlow({ servicos, barbeiros, bebidas, inicial }) {
  const booking = useBooking({ servicos, bebidas, inicial });
  const [tentouAvancar, setTentouAvancar] = useState(false);
  const [erroConfirmar, setErroConfirmar] = useState(null);
  const [concluido, setConcluido] = useState(null);

  const passoAtual = PASSOS[booking.passo];

  function avancar() {
    if (passoAtual.id === 'dados') {
      const ok = validaNome(booking.cliente.nome) && validaWhatsApp(booking.cliente.whatsapp);
      if (!ok) {
        setTentouAvancar(true);
        return;
      }
    }
    if (!booking.podeAvancar[passoAtual.id]) return;
    setTentouAvancar(false);
    booking.avancar();
  }

  function confirmar() {
    const { dataISO, horaMin, duracaoMin, servicosSel, bebidaId, bebidaSel, cliente, total } = booking;

    let barbeiro =
      booking.barbeiroId === SEM_PREFERENCIA
        ? atribuirBarbeiro({ dataISO, inicioMin: horaMin, duracaoMin, barbeiros })
        : barbeiros.find((b) => b.id === booking.barbeiroId);

    if (!barbeiro) {
      setErroConfirmar('Esse horário acabou de ser ocupado. Escolha outro, por favor.');
      booking.setHoraMin(null);
      booking.setPasso(3);
      return;
    }

    const agendamento = {
      id: novoId(),
      criadoEm: new Date().toISOString(),
      servicos: servicosSel.map((s) => s.id),
      servicosNomes: servicosSel.map((s) => s.nome),
      barbeiroId: barbeiro.id,
      barbeiroNome: barbeiro.apelido,
      data: dataISO,
      hora: minToHora(horaMin),
      duracaoMin,
      bebidaId: bebidaId === SEM_BEBIDA ? null : bebidaId,
      bebidaNome: bebidaId === SEM_BEBIDA ? 'Sem bebida' : bebidaSel.nome,
      cliente: { nome: cliente.nome.trim(), whatsapp: cliente.whatsapp },
      observacao: cliente.observacao.trim(),
      total,
      status: 'confirmado',
    };

    salvarAgendamento(agendamento);

    const mensagem = mensagemAgendamento({
      nome: agendamento.cliente.nome,
      servicos: agendamento.servicosNomes,
      barbeiro: agendamento.barbeiroNome,
      data: agendamento.data,
      hora: agendamento.hora,
      bebida: agendamento.bebidaNome,
      total: agendamento.total,
    });

    window.open(linkWhatsApp(mensagem), '_blank', 'noopener');
    setConcluido(agendamento);
    window.scrollTo(0, 0);
  }

  if (concluido) {
    return (
      <div className="sucesso">
        <div className="sucesso-icone" aria-hidden="true">✓</div>
        <h2 style={{ fontSize: '2.2rem' }}>Agendado, marujo!</h2>
        <p style={{ color: 'var(--cor-texto-suave)' }}>
          Seu horário está guardado. Se o WhatsApp não abriu sozinho, é só chamar a
          gente por lá.
        </p>
        <div className="booking-card">
          <p style={{ margin: 0 }}>
            <strong>{concluido.servicosNomes.join(', ')}</strong>
            <br />
            com {concluido.barbeiroNome} · {formatDataBR(concluido.data)} às {concluido.hora}
            <br />
            {concluido.bebidaNome} · Total R$ {concluido.total}
          </p>
        </div>
        <div className="hero-acoes" style={{ justifyContent: 'center' }}>
          <Link to="/meus-agendamentos" className="btn btn-primario">
            Ver meus agendamentos
          </Link>
          <Link to="/" className="btn btn-fantasma">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="booking-progresso" aria-hidden="true">
        {PASSOS.map((p, i) => (
          <span
            key={p.id}
            className={`booking-progresso-passo ${
              i < booking.passo ? 'feito' : i === booking.passo ? 'atual' : ''
            }`}
          />
        ))}
      </div>
      <p className="booking-passo-rotulo">
        Passo {booking.passo + 1} de {PASSOS.length} — {passoAtual.rotulo}
      </p>

      <div className="booking-layout">
        <div className="booking-card">
          {erroConfirmar && (
            <p className="erro" role="alert" style={{ color: 'var(--cor-erro)' }}>
              {erroConfirmar}
            </p>
          )}
          {passoAtual.id === 'servicos' && <StepServicos booking={booking} servicos={servicos} />}
          {passoAtual.id === 'barbeiro' && <StepBarbeiro booking={booking} barbeiros={barbeiros} />}
          {passoAtual.id === 'data' && <StepData booking={booking} barbeiros={barbeiros} />}
          {passoAtual.id === 'horario' && <StepHorario booking={booking} barbeiros={barbeiros} />}
          {passoAtual.id === 'bebida' && <StepBebida booking={booking} bebidas={bebidas} />}
          {passoAtual.id === 'dados' && <StepDados booking={booking} tentouAvancar={tentouAvancar} />}
          {passoAtual.id === 'resumo' && <StepResumo booking={booking} barbeiros={barbeiros} />}

          <div className="booking-acoes">
            <button
              type="button"
              className="btn btn-fantasma"
              onClick={booking.voltar}
              disabled={booking.passo === 0}
            >
              ← Voltar
            </button>
            {passoAtual.id === 'resumo' ? (
              <button type="button" className="btn btn-primario" onClick={confirmar}>
                Confirmar pelo WhatsApp
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primario"
                onClick={avancar}
                disabled={passoAtual.id !== 'dados' && !booking.podeAvancar[passoAtual.id]}
              >
                Continuar →
              </button>
            )}
          </div>
        </div>

        <BookingSummary booking={booking} barbeiros={barbeiros} />
      </div>
    </>
  );
}
