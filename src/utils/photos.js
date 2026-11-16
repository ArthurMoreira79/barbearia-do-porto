/**
 * Registro central das fotos externas (Unsplash).
 * Para trocar uma foto na curadoria, basta mudar a URL aqui.
 * Créditos no README.
 */
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const FOTOS = {
  hero: u('photo-1585747860715-2ba37e788b70', 2000), // F1 — interior de barbearia
  balcao: u('photo-1514933651103-005eec06c04b', 1200), // F11 — balcão de madeira
  galeria: [
    { url: u('photo-1503951914875-452162b0f3f1', 900), alt: 'Barbeiro aparando a barba de um cliente na navalha' }, // F2
    { url: u('photo-1599351431202-1e0f0137899a', 900), alt: 'Acabamento de corte feito na navalha' }, // F3
    { url: u('photo-1622286342621-4bd786c2447c', 900), alt: 'Corte na tesoura visto de perto' }, // F5
    { url: '/img/galeria-navalha.png', alt: 'Barba sendo feita na navalha, com espuma' }, // escolhida pelo Arthur
    { url: '/img/galeria-chopp.webp', alt: 'Chopp sendo tirado na torneira do bar' }, // escolhida pelo Arthur
    { url: u('photo-1493256338651-d82f7acb2b38', 900), alt: 'Corte masculino com máquina' }, // F9
    { url: u('photo-1535958636474-b021ee887b13', 900), alt: 'Chopp sendo tirado na torneira' }, // F10
    { url: u('photo-1470337458703-46ad1756a187', 900), alt: 'Drink da casa servido com gelo' }, // F12
  ],
};
