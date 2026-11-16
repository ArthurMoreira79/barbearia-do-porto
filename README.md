# Barbearia do Porto 💈⚓

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Projeto demonstrativo, com empresa fictícia.**

Site com agendamento online para um bar e barbearia fictício no Centro Histórico de São Luís – MA. O "bar" já está dentro da "barbearia": o cliente corta o cabelo ou faz a barba tomando um chopp, um drink ou um café. *Chegue pro corte, fique pro chopp.*

---

## Problema e solução

Barbearias pequenas ainda agendam por mensagem e telefone: horário marcado duas vezes, cliente sem resposta, agenda no caderno. Este projeto mostra um fluxo de agendamento completo que **funciona sem back-end**. O cliente escolhe o serviço, o barbeiro, a data, o horário (só aparecem horários realmente possíveis) e uma bebida, e confirma pelo WhatsApp em menos de um minuto.

---

## Destaques

- **Agenda com regras de verdade:** a grade de horários considera expediente, folgas, horários passados, horários ocupados e a duração do serviço. Um corte de 1 hora não aparece às 20h30, porque não terminaria antes do fechamento.
- **Ocupação simulada determinística:** cada combinação de barbeiro e dia gera sempre os mesmos horários ocupados, calculados a partir da data atual. A agenda nunca parece vazia nem lotada, e não muda ao recarregar a página.
- **Agendamentos persistidos no navegador:** um horário agendado bloqueia a grade e volta a ficar livre se for cancelado.
- **Módulo de agendamento reaproveitável:** a pasta `booking/` não depende dos dados da barbearia. Ela recebe serviços, profissionais e bebidas por props e pode ser usada em outros negócios.

---

## Funcionalidades

### Landing page

Hero, serviços com preço e duração, cardápio do bar, apresentação dos barbeiros, **Clube do Porto** (planos de assinatura mensal), galeria, depoimentos e contato com mapa. Os botões da home já abrem o agendamento com a escolha feita, por exemplo `/agendar?servico=corte` ou `/agendar?barbeiro=lp`.

### Agendamento em 7 passos

| Passo | O que o cliente faz |
|---|---|
| 1. Serviços | Escolhe um ou mais serviços, como corte, barba, sobrancelha ou pigmentação |
| 2. Barbeiro | Escolhe um barbeiro ou marca "sem preferência", e o sistema atribui um que esteja livre |
| 3. Data | Escolhe o dia; dias fechados e folgas do barbeiro ficam bloqueados |
| 4. Horário | Vê só os horários em que o atendimento cabe inteiro |
| 5. Bebida | Escolhe uma bebida do bar para acompanhar o atendimento |
| 6. Dados | Informa nome e WhatsApp, com validação dos dois campos |
| 7. Resumo | Confere tudo e confirma pelo WhatsApp com uma mensagem montada automaticamente |

O fluxo tem barra de progresso, botão Voltar e um resumo lateral, que no celular fica fixo na parte de baixo da tela.

### Meus agendamentos

Lista dos agendamentos feitos no navegador, com cancelamento (pedindo confirmação) e uma tela própria para quando não há nenhum agendamento.

### Regras da agenda

| Regra | Valor |
|---|---|
| Dias de funcionamento | Terça a sábado (domingo e segunda fechado) |
| Horário | 10h às 21h |
| Intervalo da grade | 30 minutos |
| Fechamento | O atendimento precisa terminar até as 21h |

### Acessibilidade

Navegação por teclado, atributos `aria-*` nos controles do agendamento, foco visível e texto alternativo nas imagens.

---

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Interface | React 18 · JavaScript |
| Build | Vite 5 |
| Rotas | React Router 6 (`/`, `/agendar`, `/meus-agendamentos`) |
| Estilo | CSS puro com variáveis (tokens de design em `src/styles/tokens.css`) |
| Dados | Arquivos JSON locais em `src/data/` · `localStorage` para os agendamentos |
| Deploy | Vercel (`vercel.json` com rewrite para SPA) |

---

## Estrutura

```
src/
├── components/   # Header, Footer, WhatsAppButton
├── sections/     # Hero, Servicos, OBar, Barbeiros, Clube, Galeria, Depoimentos, Contato
├── booking/      # BookingFlow, useBooking, BookingSummary e os 7 passos (steps/)
├── pages/        # Home, Agendar, MeusAgendamentos
├── data/         # services, barbers, drinks, testimonials (.json)
├── utils/        # slots (regras da agenda), storage, whatsapp, format, photos
└── styles/       # tokens.css, global.css
```

---

## Como rodar localmente

**Pré-requisito:** Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Para gerar a versão de produção, use `npm run build`.

---

*O rodapé do site traz um aviso fixo: projeto demonstrativo, com empresa fictícia. Venda de bebidas alcoólicas proibida para menores de 18 anos.*

Feito por [Arthur Moreira](https://github.com/ArthurMoreira79) · Distribuído sob a licença [MIT](LICENSE).
