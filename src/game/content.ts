// Conteúdo do modo game: medidas do estúdio, estações interativas, móveis que bloqueiam
// a passagem, textos dos cards e links. Distâncias em metros, chão centrado na origem.
import Curriculum from "../data/curriculo do Wagner.pdf";

export const LINKS = {
  github: "https://github.com/WagnerTerry",
  linkedin: "https://www.linkedin.com/in/wagner-sgonçalves",
  whatsapp:
    "https://api.whatsapp.com/send?phone=5521974841079&text=Wagner Gonçalves - Desenvolvedor de Software.",
  email: "mailto:goncalveswagner15@gmail.com",
  curriculum: Curriculum,
};

/** Sala: parede do fundo em z = -depth/2, parede esquerda em x = -width/2; frente e direita abertas. */
export const ROOM = { width: 14, depth: 12, wallHeight: 3.6 };

export const PLAYER = {
  start: { x: 0.6, z: 3.2 },
  /** metros por segundo */
  speed: 3.4,
  /** raio usado na colisão com os móveis */
  radius: 0.34,
};

/** Deslocamento da câmera em relação ao personagem (alta e inclinada). */
export const CAMERA_OFFSET: [number, number, number] = [0, 10.5, 10.5];

export type Direction = "up" | "down" | "left" | "right";
export type StationId = "desk" | "github" | "linkedin" | "coffee";

/** Retângulo no chão (x1 < x2, z1 < z2). */
export type Rect = { x1: number; z1: number; x2: number; z2: number };

export type Station = {
  id: StationId;
  label: string;
  /** texto do balão/botão de interação */
  prompt: string;
  /** área do chão onde dá para interagir */
  zone: Rect;
  /** para onde o personagem caminha ao clicar no objeto */
  approach: { x: number; z: number };
  /** posição do marcador flutuante */
  marker: [number, number, number];
};

export const STATIONS: Station[] = [
  {
    id: "desk",
    label: "Bancada",
    prompt: "Usar a bancada",
    zone: { x1: -4.2, z1: -3.8, x2: 0.2, z2: -2.2 },
    approach: { x: -2, z: -3.1 },
    marker: [-2, 2.4, -5.2],
  },
  {
    id: "github",
    label: "Servidor GitHub",
    prompt: "Abrir o GitHub",
    zone: { x1: 3.8, z1: -4.6, x2: 6.4, z2: -2.8 },
    approach: { x: 5.1, z: -3.7 },
    marker: [5.1, 2.9, -5.2],
  },
  {
    id: "linkedin",
    label: "Banner LinkedIn",
    prompt: "Abrir o LinkedIn",
    zone: { x1: -6.7, z1: 0.1, x2: -4.3, z2: 1.9 },
    approach: { x: -5.5, z: 1.0 },
    marker: [-5.5, 2.7, -0.4],
  },
  {
    id: "coffee",
    label: "Máquina de café",
    prompt: "Tomar um café",
    zone: { x1: -5.7, z1: 2.3, x2: -4.3, z2: 4.7 },
    approach: { x: -5.0, z: 3.5 },
    marker: [-6.3, 2.2, 3.5],
  },
];

/** Área ocupada pelos móveis no chão (o personagem não atravessa). Deve bater com props.tsx. */
export const OBSTACLES: Rect[] = [
  { x1: -3.9, z1: -6.0, x2: -0.1, z2: -3.85 }, // bancada + cadeira
  { x1: 4.4, z1: -6.0, x2: 5.8, z2: -4.6 }, // rack de servidor
  { x1: 1.0, z1: -6.0, x2: 3.4, z2: -5.1 }, // estante
  { x1: -7.0, z1: 2.6, x2: -5.7, z2: 4.4 }, // balcão do café
  { x1: -6.4, z1: -0.9, x2: -4.6, z2: 0.0 }, // banner do LinkedIn
  { x1: 5.6, z1: 2.9, x2: 6.8, z2: 4.1 }, // planta
  { x1: 5.95, z1: -1.35, x2: 6.65, z2: -0.65 }, // luminária
];

export type CardLink = {
  label: string;
  url: string;
  /** classes Tailwind de cor do botão */
  color: string;
  download?: string;
};

export type Card = {
  title: string;
  text: string[];
  links: CardLink[];
};

export const CARDS: Record<StationId, Card> = {
  desk: {
    title: "Bancada",
    text: [
      "E aí, tudo bem? Me chamo Wagner, sou Dev FullStack com mais de 4 anos de experiência criando aplicações web e mobile.",
      "Trabalho com React, Node, TypeScript e afins, do front ao banco de dados. Curto transformar ideias em produtos que funcionam bem e são bons de usar.",
      "Meu currículo está aqui na mesa, pode levar uma cópia.",
    ],
    links: [
      {
        label: "Baixar currículo",
        url: LINKS.curriculum,
        download: "Currículo do Wagner",
        color: "bg-emerald-500 hover:bg-emerald-400",
      },
    ],
  },
  github: {
    title: "Servidor GitHub",
    text: [
      "Aqui rodam meus repositórios: projetos pessoais, estudos e experimentos.",
      "Quer dar uma olhada no código?",
    ],
    links: [{ label: "Abrir GitHub ↗", url: LINKS.github, color: "bg-[#24292e] hover:bg-[#3b4048]" }],
  },
  linkedin: {
    title: "Banner LinkedIn",
    text: [
      "Experiência, formação e recomendações ficam por aqui.",
      "Vamos nos conectar profissionalmente?",
    ],
    links: [{ label: "Abrir LinkedIn ↗", url: LINKS.linkedin, color: "bg-[#0a66c2] hover:bg-[#1b7ad8]" }],
  },
  coffee: {
    title: "Vamos tomar um café?",
    text: [
      "Café passado na hora. Se quiser conversar sobre um projeto, uma vaga ou só trocar ideia, é por aqui.",
      "Tel: (21) 97484-1079 · goncalveswagner15@gmail.com",
    ],
    links: [
      { label: "WhatsApp", url: LINKS.whatsapp, color: "bg-[#25d366] hover:bg-[#3fdc78]" },
      { label: "E-mail", url: LINKS.email, color: "bg-slate-700 hover:bg-slate-600" },
    ],
  },
};
