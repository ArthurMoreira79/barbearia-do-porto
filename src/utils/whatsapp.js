import { formatDataBR } from './format.js';

export const NUMERO_WHATSAPP = '5598981952703';

export function linkWhatsApp(texto) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

/** Contato geral (botão flutuante, seção de contato, Clube) */
export const MENSAGEM_CONTATO =
  'Olá, Arthur! Me interessei no projeto Barbearia do Porto e quero saber mais.';

export function linkContato() {
  return linkWhatsApp(MENSAGEM_CONTATO);
}

export function linkClube(plano) {
  return linkWhatsApp(
    `Olá, Arthur! Me interessei no projeto Barbearia do Porto e quero saber mais. (Vi o plano ${plano} do Clube do Porto)`
  );
}

/** Mensagem de confirmação do agendamento (modelo do plano) */
export function mensagemAgendamento({ nome, servicos, barbeiro, data, hora, bebida, total }) {
  return [
    'Olá! Quero confirmar meu agendamento na Barbearia do Porto.',
    '',
    `Nome: ${nome}`,
    `Serviços: ${servicos.join(', ')}`,
    `Barbeiro: ${barbeiro}`,
    `Data: ${formatDataBR(data)} às ${hora}`,
    `Bebida: ${bebida}`,
    `Total: R$ ${total}`,
  ].join('\n');
}
