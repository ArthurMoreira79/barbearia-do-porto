import { useMemo, useState } from 'react';

export const SEM_PREFERENCIA = 'sem-preferencia';
export const SEM_BEBIDA = 'sem-bebida';

export const PASSOS = [
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'barbeiro', rotulo: 'Barbeiro' },
  { id: 'data', rotulo: 'Data' },
  { id: 'horario', rotulo: 'Horário' },
  { id: 'bebida', rotulo: 'Bebida' },
  { id: 'dados', rotulo: 'Seus dados' },
  { id: 'resumo', rotulo: 'Confirmar' },
];

/**
 * Estado do fluxo de agendamento.
 * Independente dos dados da barbearia: recebe serviços e bebidas por parâmetro
 * (a clínica reaproveita esse hook com outro catálogo).
 */
export function useBooking({ servicos, bebidas, inicial = {} }) {
  const [passo, setPasso] = useState(0);
  const [servicosIds, setServicosIds] = useState(inicial.servicosIds ?? []);
  const [barbeiroId, setBarbeiroId] = useState(inicial.barbeiroId ?? null);
  const [dataISO, setDataISO] = useState(null);
  const [horaMin, setHoraMin] = useState(null);
  const [bebidaId, setBebidaId] = useState(null);
  const [maior18, setMaior18] = useState(false);
  const [cliente, setCliente] = useState({ nome: '', whatsapp: '', observacao: '' });

  const servicosSel = useMemo(
    () => servicos.filter((s) => servicosIds.includes(s.id)),
    [servicos, servicosIds]
  );
  const duracaoMin = servicosSel.reduce((acc, s) => acc + s.duracaoMin, 0);
  const precoServicos = servicosSel.reduce((acc, s) => acc + s.preco, 0);

  const bebidaSel = useMemo(
    () => (bebidaId && bebidaId !== SEM_BEBIDA ? bebidas.find((b) => b.id === bebidaId) : null),
    [bebidas, bebidaId]
  );
  const precoBebida = bebidaSel && !bebidaSel.cortesia ? bebidaSel.preco : 0;
  const total = precoServicos + precoBebida;

  function toggleServico(id) {
    setServicosIds((atual) =>
      atual.includes(id) ? atual.filter((s) => s !== id) : [...atual, id]
    );
    setHoraMin(null); // duração mudou: horário escolhido pode não caber mais
  }

  function escolherBarbeiro(id) {
    setBarbeiroId(id);
    setHoraMin(null);
  }

  function escolherData(iso) {
    setDataISO(iso);
    setHoraMin(null);
  }

  function escolherBebida(id, alcoolica) {
    setBebidaId(id);
    if (!alcoolica) setMaior18(false);
  }

  const podeAvancar = {
    servicos: servicosIds.length > 0,
    barbeiro: barbeiroId !== null,
    data: dataISO !== null,
    horario: horaMin !== null,
    bebida:
      bebidaId !== null && (!bebidaSel || !bebidaSel.alcoolica || maior18),
    dados: true, // validação detalhada no passo
    resumo: true,
  };

  return {
    passo,
    setPasso,
    avancar: () => setPasso((p) => Math.min(p + 1, PASSOS.length - 1)),
    voltar: () => setPasso((p) => Math.max(p - 1, 0)),
    servicosIds,
    servicosSel,
    toggleServico,
    barbeiroId,
    escolherBarbeiro,
    dataISO,
    escolherData,
    horaMin,
    setHoraMin,
    bebidaId,
    bebidaSel,
    escolherBebida,
    maior18,
    setMaior18,
    cliente,
    setCliente,
    duracaoMin,
    precoServicos,
    precoBebida,
    total,
    podeAvancar,
  };
}
