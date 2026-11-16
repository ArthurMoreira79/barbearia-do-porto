const CHAVE = 'bdp:agendamentos';

export function carregarAgendamentos() {
  try {
    const raw = localStorage.getItem(CHAVE);
    const lista = raw ? JSON.parse(raw) : [];
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function salvarAgendamento(agendamento) {
  const lista = carregarAgendamentos();
  lista.push(agendamento);
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    /* localStorage indisponível: o fluxo segue sem persistir */
  }
  return lista;
}

export function cancelarAgendamento(id) {
  const lista = carregarAgendamentos().map((a) =>
    a.id === id ? { ...a, status: 'cancelado' } : a
  );
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    /* idem */
  }
  return lista;
}

export function novoId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `bdp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
