import { carregarAgendamentos } from './storage.js';
import { parseISODate, toISODate, horaToMin } from './format.js';

export const ABERTURA_MIN = 10 * 60; // 10h00
export const FECHAMENTO_MIN = 21 * 60; // 21h00
export const PASSO_MIN = 30;
export const DIAS_FECHADO = [0, 1]; // domingo e segunda

/**
 * Ocupação simulada, determinística por (barbeiro, data), relativa à data real:
 * o site nunca parece vazio nem lotado, e o mesmo dia mostra sempre os mesmos horários.
 */
function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function ocupadosSimulados(barbeiroId, dataISO) {
  const ocupados = new Set();
  const totalSlots = (FECHAMENTO_MIN - ABERTURA_MIN) / PASSO_MIN; // 22
  let seed = hashString(`${barbeiroId}|${dataISO}`);
  const rand = () => {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    return seed / 4294967296;
  };
  const quantos = 5 + Math.floor(rand() * 4); // 5 a 8 meias-horas ocupadas
  for (let i = 0; i < quantos; i++) {
    const slot = ABERTURA_MIN + Math.floor(rand() * totalSlots) * PASSO_MIN;
    ocupados.add(slot);
    if (rand() > 0.5) ocupados.add(slot + PASSO_MIN); // às vezes 1h seguida
  }
  return ocupados;
}

function ocupadosDoStorage(barbeiroId, dataISO) {
  const ocupados = new Set();
  for (const a of carregarAgendamentos()) {
    if (a.status !== 'confirmado' || a.data !== dataISO) continue;
    if (a.barbeiroId !== barbeiroId) continue;
    const inicio = horaToMin(a.hora);
    for (let m = inicio; m < inicio + a.duracaoMin; m += PASSO_MIN) {
      ocupados.add(m);
    }
  }
  return ocupados;
}

function barbeiroLivreNoSlot(barbeiroId, dataISO, inicioMin, duracaoMin) {
  if (inicioMin + duracaoMin > FECHAMENTO_MIN) return false;
  const simulados = ocupadosSimulados(barbeiroId, dataISO);
  const salvos = ocupadosDoStorage(barbeiroId, dataISO);
  for (let m = inicioMin; m < inicioMin + duracaoMin; m += PASSO_MIN) {
    if (simulados.has(m) || salvos.has(m)) return false;
  }
  return true;
}

function barbeiroAtendeNoDia(barbeiro, dataISO) {
  return barbeiro.diasAtendimento.includes(parseISODate(dataISO).getDay());
}

/**
 * Grade de horários para uma data.
 * barbeiroId null = "sem preferência": livre se algum barbeiro que atende no dia estiver livre.
 * Retorna [{ hora: '10:00', min: 600, livre: boolean, barbeiros: [ids livres] }]
 */
export function gradeHorarios({ dataISO, barbeiroId, duracaoMin, barbeiros, agora = new Date() }) {
  const slots = [];
  const hojeISO = toISODate(agora);
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const candidatos = barbeiroId
    ? barbeiros.filter((b) => b.id === barbeiroId)
    : barbeiros;
  const atendendo = candidatos.filter((b) => barbeiroAtendeNoDia(b, dataISO));

  for (let m = ABERTURA_MIN; m + duracaoMin <= FECHAMENTO_MIN; m += PASSO_MIN) {
    const passou = dataISO === hojeISO && m <= minutosAgora;
    const livres = passou
      ? []
      : atendendo.filter((b) => barbeiroLivreNoSlot(b.id, dataISO, m, duracaoMin)).map((b) => b.id);
    slots.push({
      min: m,
      livre: livres.length > 0,
      barbeiros: livres,
    });
  }
  return slots;
}

/** Próximos N dias com info de disponibilidade geral */
export function proximosDias({ barbeiro, dias = 14, agora = new Date() }) {
  const resultado = [];
  for (let i = 0; i < dias; i++) {
    const d = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + i);
    const diaSemana = d.getDay();
    const fechado = DIAS_FECHADO.includes(diaSemana);
    const barbeiroFolga = barbeiro ? !barbeiro.diasAtendimento.includes(diaSemana) : false;
    resultado.push({
      iso: toISODate(d),
      diaSemana,
      dia: d.getDate(),
      habilitado: !fechado && !barbeiroFolga,
      motivo: fechado ? 'fechado' : barbeiroFolga ? 'folga' : null,
    });
  }
  return resultado;
}

/** Para "sem preferência": escolhe um barbeiro livre no horário (o com menos ocupação no dia). */
export function atribuirBarbeiro({ dataISO, inicioMin, duracaoMin, barbeiros }) {
  const livres = barbeiros.filter(
    (b) => barbeiroAtendeNoDia(b, dataISO) && barbeiroLivreNoSlot(b.id, dataISO, inicioMin, duracaoMin)
  );
  if (livres.length === 0) return null;
  livres.sort(
    (a, b) =>
      ocupadosSimulados(a.id, dataISO).size - ocupadosSimulados(b.id, dataISO).size
  );
  return livres[0];
}
