// Mapa do mundo: 1 caractere = 1 tile de 16px.
// "#" árvore  "H" casa  "D" porta  "s" placa  "g" placa github  "l" placa linkedin
// "c" baú  "m" caixa de correio  "~" água  "," grama alta  "f" flores  "=" caminho  "." grama

export const MAP = [
  "########################",
  "#......................#",
  "#.ff.....HHHHHH......f.#",
  "#.ff.....HHHHHH.....ff.#",
  "#..s.....HHHHHH........#",
  "#........HHDHHH........#",
  "#..........=...........#",
  "#..g.......=.........l.#",
  "#..........=...........#",
  "#..........=...........#",
  "#...s.....s.....s......#",
  "#......................#",
  "#.,,,...........~~~~~..#",
  "#.,,,....c......~~~~~..#",
  "#.,,,...........~~~~~..#",
  "#.....m................#",
  "#......................#",
  "########################",
];

export const MAP_W = MAP[0].length;
export const MAP_H = MAP.length;

export const SOLID_TILES = new Set(["#", "H", "D", "s", "g", "l", "c", "m", "~"]);
export const WALKABLE = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < MAP_W && y < MAP_H && !SOLID_TILES.has(MAP[y][x]);

export const PLAYER_START = { x: 11, y: 8 };

export type GameLink = { label: string; url: string; download?: string };

export type Interaction = {
  title: string;
  lines: string[];
  links?: GameLink[];
};

// Chave: "x,y" do tile interativo
export const INTERACTIONS: Record<string, Interaction> = {
  "11,5": {
    title: "Casa do Wagner",
    lines: [
      "E aí, tudo bem? Me chamo Wagner, sou Dev FullStack!",
      "Mais de 4 anos de experiência criando aplicações web e mobile.",
      "Explore o mapa para conhecer meus projetos e redes!",
    ],
  },
  "3,4": {
    title: "Skills",
    lines: [
      "Frontend: HTML5, CSS, Sass, Javascript, Typescript, Angular, Vue, React, NextJs.",
      "Backend: NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Swagger.",
      "Mobile: React Native, Flutter e Ionic.",
    ],
  },
  "4,10": {
    title: "Sistema de gestão e estoque",
    lines: [
      "Sistema web para controle de estoque de loja de motopeças.",
      "Desenvolvido em ReactJs, Typescript, NodeJs e MongoDB.",
    ],
    links: [
      {
        label: "Ver no GitHub",
        url: "https://github.com/WagnerTerry/moto-pecas-projeto",
      },
    ],
  },
  "10,10": {
    title: "Pizzaria",
    lines: [
      "Sistema web para controle do fluxo de caixa e pedidos de uma pizzaria.",
      "Desenvolvido em ReactJs, NodeJs e MySQL.",
    ],
    links: [
      {
        label: "Ver no GitHub",
        url: "https://github.com/WagnerTerry/new_disk_pizza",
      },
    ],
  },
  "16,10": {
    title: "Dicionário em Inglês",
    lines: [
      "Dicionário em inglês, com significados e fonéticas.",
      "Desenvolvido em React Native, Typescript, Async Storage e Axios.",
    ],
    links: [
      {
        label: "Ver no GitHub",
        url: "https://github.com/WagnerTerry/challenge-coodesh-mobile",
      },
    ],
  },
  "3,7": {
    title: "GitHub",
    lines: ["Aqui ficam todos os meus repositórios e experimentos."],
    links: [{ label: "Abrir GitHub", url: "https://github.com/WagnerTerry" }],
  },
  "21,7": {
    title: "LinkedIn",
    lines: ["Vamos nos conectar profissionalmente?"],
    links: [
      {
        label: "Abrir LinkedIn",
        url: "https://www.linkedin.com/in/wagner-sgonçalves",
      },
    ],
  },
  "9,13": {
    title: "Baú do Currículo",
    lines: ["Você encontrou o currículo do Wagner!"],
    links: [], // o link do currículo é preenchido no GameMode (import do PDF)
  },
  "6,15": {
    title: "Caixa de Correio",
    lines: [
      "Vamos tomar um café?",
      "Tel: 21 974841079",
      "Email: goncalveswagner15@gmail.com",
    ],
    links: [
      {
        label: "Chamar no WhatsApp",
        url: "https://api.whatsapp.com/send?phone=5521974841079&text=Wagner Gonçalves - Desenvolvedor de Software.",
      },
    ],
  },
};
