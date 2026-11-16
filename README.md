# Barbearia do Porto 💈⚓

> **Projeto demonstrativo — empresa fictícia.** Desenvolvido por Arthur Moreira.

Site de agendamento para um bar e barbearia fictício no Centro Histórico de São Luís – MA.
O "bar" já está dentro de "barbearia": você corta o cabelo ou faz a barba tomando um chopp,
um drink ou um café. *Chegue pro corte, fique pro chopp.*

## Problema → Solução

Barbearias pequenas ainda agendam por DM e telefone: horário duplicado, cliente sem
resposta, agenda no caderno. Este modelo mostra um fluxo de agendamento completo que
roda sem backend — o cliente escolhe serviço, barbeiro, data, horário (só aparecem
horários realmente possíveis), bebida e confirma pelo WhatsApp em menos de 1 minuto.

## Funcionalidades

- **Landing page completa:** hero, serviços, cardápio do bar, barbeiros, Clube do Porto
  (assinatura), galeria, depoimentos, contato com mapa.
- **Fluxo de agendamento em 7 passos** com barra de progresso, resumo lateral
  (fixo embaixo no celular) e botão Voltar.
- **Regras de agenda de verdade:** expediente ter–sáb 10h–21h, dias de folga por
  barbeiro, horários passados/ocupados desabilitados, o atendimento precisa caber
  inteiro antes do fechamento, "sem preferência" atribui um barbeiro livre.
- **Ocupação simulada determinística** por (barbeiro, dia), gerada em relação à data
  atual — a agenda nunca parece vazia nem lotada.
- **Persistência em `localStorage`:** recarregar não perde nada; um horário agendado
  bloqueia a grade e volta a liberar se for cancelado.
- **Confirmação via WhatsApp** com mensagem formatada automaticamente.
- **Meus agendamentos:** lista, cancelamento com confirmação e estado vazio.
- Pré-seleção vinda da home: `/agendar?servico=corte` e `/agendar?barbeiro=lp`.
- Acessibilidade: navegação por teclado, `aria-*` nos controles do fluxo, foco visível,
  `alt` nas imagens.

## Stack

- **React 18 + Vite** (JavaScript)
- **React Router** — rotas `/`, `/agendar`, `/meus-agendamentos`
- **CSS puro com variáveis** (tokens de design em `src/styles/tokens.css`)
- Dados em **JSON locais** (`src/data/`), sem backend
- Deploy: **Vercel** (`vercel.json` com rewrite de SPA)

## Rodando

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├─ components/   Header, Footer, WhatsAppButton
├─ sections/     Hero, Servicos, OBar, Barbeiros, Clube, Galeria, Depoimentos, Contato
├─ booking/      BookingFlow, useBooking, BookingSummary, steps/
├─ pages/        Home, Agendar, MeusAgendamentos
├─ data/         services, barbers, drinks, testimonials (.json)
├─ utils/        slots, storage, whatsapp, format, photos
└─ styles/       tokens.css, global.css
```

A pasta `booking/` é independente dos dados da barbearia: recebe serviços,
profissionais e bebidas por props, para reaproveitar em outros projetos.

## Créditos das fotos

Logo e fotos dos barbeiros: geradas por IA para este projeto fictício.
Duas fotos da galeria (`galeria-navalha.png` e `galeria-chopp.webp`) foram
escolhidas e fornecidas pelo autor.
Demais fotos via [Unsplash](https://unsplash.com) (licença Unsplash):

| Uso | Foto |
| --- | --- |
| Hero | [photo-1585747860715-2ba37e788b70](https://images.unsplash.com/photo-1585747860715-2ba37e788b70) |
| Balcão do bar | [photo-1514933651103-005eec06c04b](https://images.unsplash.com/photo-1514933651103-005eec06c04b) |
| Galeria | [photo-1503951914875](https://images.unsplash.com/photo-1503951914875-452162b0f3f1) · [photo-1599351431202](https://images.unsplash.com/photo-1599351431202-1e0f0137899a) · [photo-1622286342621](https://images.unsplash.com/photo-1622286342621-4bd786c2447c) · [photo-1493256338651](https://images.unsplash.com/photo-1493256338651-d82f7acb2b38) · [photo-1535958636474](https://images.unsplash.com/photo-1535958636474-b021ee887b13) · [photo-1470337458703](https://images.unsplash.com/photo-1470337458703-46ad1756a187) |

---

*Aviso fixo no rodapé do site: projeto demonstrativo — empresa fictícia. Venda de
bebidas alcoólicas proibida para menores de 18 anos.*
