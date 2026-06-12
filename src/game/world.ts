// Mundo simples: casa, portas GitHub/LinkedIn, baús de informação, placas e correio.
// 1 caractere = 1 tile de 16px.
// "#" árvore  "H" casa  "D" porta da casa  "G/g" portal github (parede/porta)
// "L/l" portal linkedin  "c" baú  "m" correio  "s" placa  "," grama alta  "f" flores  "=" caminho

import Curriculum from "../data/curriculo do Wagner.pdf";

export const MAP = [
  "########################",
  "#......................#",
  "#.GGG....HHHHHH...LLL..#",
  "#.GGG....HHHHHH...LLL..#",
  "#.GgG....HHHHHH...LlL..#",
  "#........HHDHHH........#",
  "#..........=...........#",
  "#...s......=......s....#",
  "#..........=...........#",
  "#..........=...........#",
  "#.....c....c....c......#",
  "#......................#",
  "#.,,,..............ff..#",
  "#.,,,....c.........ff..#",
  "#.,,,..........c.......#",
  "#.....m................#",
  "#......................#",
  "########################",
];

export const MAP_W = MAP[0].length;
export const MAP_H = MAP.length;

export const SOLID_TILES = new Set(["#", "H", "D", "G", "g", "L", "l", "c", "m", "s"]);

export const PLAYER_START = { x: 11, y: 8 };

// Posições das construções (usadas pelo desenho do cenário)
export const BUILDINGS = {
  house: { tx: 9, ty: 2, wTiles: 6, doorTx: 11 },
  github: { tx: 2, ty: 2 },
  linkedin: { tx: 18, ty: 2 },
};

export const LINKS = {
  github: "https://github.com/WagnerTerry",
  linkedin: "https://www.linkedin.com/in/wagner-sgonçalves",
  whatsapp:
    "https://api.whatsapp.com/send?phone=5521974841079&text=Wagner Gonçalves - Desenvolvedor de Software.",
  curriculum: Curriculum,
};

export type GameLink = { label: string; url: string; download?: string };

export type Interaction = {
  title: string;
  lines: string[];
  links?: GameLink[];
  /** Tile que dispara o diálogo automaticamente ao pisar (sensação de "entrar na porta") */
  autoTile?: { x: number; y: number };
};

// Chave: "x,y" do tile interativo (o jogador interage de frente para ele)
export const INTERACTIONS: Record<string, Interaction> = {
  // ---- Portas ----
  "11,5": {
    title: "Minha casa",
    lines: [
      "E aí, tudo bem? Me chamo Wagner, sou Dev FullStack!",
      "Mais de 4 anos de experiência criando aplicações web e mobile.",
      "Explore o mapa: os baús guardam meus projetos e skills!",
    ],
    autoTile: { x: 11, y: 6 },
  },
  "3,4": {
    title: "Porta do GitHub",
    lines: ["Aqui dentro ficam todos os meus repositórios. Vamos entrar?"],
    links: [{ label: "Entrar no GitHub", url: LINKS.github }],
    autoTile: { x: 3, y: 5 },
  },
  "19,4": {
    title: "Porta do LinkedIn",
    lines: ["Vamos nos conectar profissionalmente?"],
    links: [{ label: "Entrar no LinkedIn", url: LINKS.linkedin }],
    autoTile: { x: 19, y: 5 },
  },

  // ---- Placas ----
  "4,7": {
    title: "Placa",
    lines: ["← A casinha escura é a porta do meu GitHub!"],
  },
  "18,7": {
    title: "Placa",
    lines: ["A casinha azul é a porta do meu LinkedIn! →"],
  },

  // ---- Baús de projetos ----
  "6,10": {
    title: "Baú: Sistema de gestão e estoque",
    lines: [
      "Sistema web para controle de estoque de loja de motopeças.",
      "Feito com ReactJs, Typescript, NodeJs e MongoDB.",
    ],
    links: [
      { label: "Ver no GitHub", url: "https://github.com/WagnerTerry/moto-pecas-projeto" },
    ],
  },
  "11,10": {
    title: "Baú: Pizzaria",
    lines: [
      "Sistema web para controle do fluxo de caixa e pedidos de uma pizzaria.",
      "Feito com ReactJs, NodeJs e MySQL.",
    ],
    links: [
      { label: "Ver no GitHub", url: "https://github.com/WagnerTerry/new_disk_pizza" },
    ],
  },
  "16,10": {
    title: "Baú: Dicionário em Inglês",
    lines: [
      "Dicionário em inglês, com significados e fonéticas.",
      "Feito com React Native, Typescript, Async Storage e Axios.",
    ],
    links: [
      { label: "Ver no GitHub", url: "https://github.com/WagnerTerry/challenge-coodesh-mobile" },
    ],
  },

  // ---- Outros baús ----
  "9,13": {
    title: "Baú: Skills",
    lines: [
      "Frontend: HTML5, CSS, Sass, JS, TS, Angular, Vue, React, NextJs.",
      "Backend: NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Swagger.",
      "Mobile: React Native, Flutter e Ionic.",
    ],
  },
  "15,14": {
    title: "Baú: Currículo",
    lines: ["Você encontrou o currículo do Wagner!"],
    links: [
      { label: "Baixar Currículo", url: LINKS.curriculum, download: "Currículo do Wagner" },
    ],
  },

  // ---- Correio ----
  "6,15": {
    title: "Caixa de Correio",
    lines: [
      "Vamos tomar um café?",
      "Tel: (21) 97484-1079",
      "Email: goncalveswagner15@gmail.com",
    ],
    links: [{ label: "Chamar no WhatsApp", url: LINKS.whatsapp }],
  },
};

// Índice dos gatilhos automáticos: tile pisado -> chave da interação
export const AUTO_TILES: Record<string, string> = Object.fromEntries(
  Object.entries(INTERACTIONS).flatMap(([key, i]) =>
    i.autoTile ? [[`${i.autoTile.x},${i.autoTile.y}`, key]] : []
  )
);
