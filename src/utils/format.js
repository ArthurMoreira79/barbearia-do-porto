export function formatPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',').replace(',00', '')}`;
}

export function formatDuracao(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
}

export const DIAS_SEMANA = [
  'domingo',
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
];

export const DIAS_SEMANA_CURTO = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

/** '2026-11-18' -> Date local (sem fuso surpresa) */
export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** '2026-11-18' -> '18/11 (quarta)' */
export function formatDataBR(iso, { comSemana = true } = {}) {
  const date = parseISODate(iso);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return comSemana ? `${dd}/${mm} (${DIAS_SEMANA[date.getDay()]})` : `${dd}/${mm}`;
}

/** minutos desde 00:00 -> '15:30' */
export function minToHora(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** '15:30' -> minutos desde 00:00 */
export function horaToMin(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** Máscara (98) 98195-2703 enquanto digita */
export function maskWhatsApp(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validaWhatsApp(valor) {
  return valor.replace(/\D/g, '').length === 11;
}

export function validaNome(nome) {
  const partes = nome.trim().split(/\s+/);
  return partes.length >= 2 && partes.every((p) => p.length >= 1);
}
