// Conteúdo do Wagner para o mundo do jogo.
// Os mapas Tiled vêm do site do Ariel Roffé (MIT, ver public/game/LICENSE-ariroffe.txt);
// os textos das placas são substituídos aqui, indexados por "NomeDaCena:idDoObjeto"
// (os ids estão na camada "Objects" de cada JSON em public/game/).

import Curriculum from "../data/curriculo do Wagner.pdf";

export const LINKS = {
  github: "https://github.com/WagnerTerry",
  linkedin: "https://www.linkedin.com/in/wagner-sgonçalves",
  whatsapp:
    "https://api.whatsapp.com/send?phone=5521974841079&text=Wagner Gonçalves - Desenvolvedor de Software.",
  curriculum: Curriculum,
};

// Textos das placas e dos avisos grandes (tiles roxos)
export const SIGN_TEXTS: Record<string, string> = {
  // ---------- Overworld ----------
  "OverworldScene:13":
    "Olá! Bem-vindo ao meu site!\nMe chamo Wagner Gonçalves, sou\nDev FullStack. Explore o mapa para\nconhecer meus projetos, skills\ne formas de contato!",
  "OverworldScene:17": "Sobre mim\n& Contato",
  "OverworldScene:21": "Skills &\nFormação",
  "OverworldScene:22": "Pikaaa!",
  "OverworldScene:23": "Projetos &\nDev",
  "OverworldScene:24": "Eu vou te vencer,\nrival!!!",
  "OverworldScene:25": "Por favor, não jogue\nlixo no chão.",

  // ---------- Prédio de Software = Projetos ----------
  "SoftwareScene:3":
    "Bem-vindo ao meu estúdio dev!\n\nGestão e estoque de motopeças:\nReactJs, Typescript, NodeJs e MongoDB\n\nPizzaria (caixa e pedidos):\nReactJs, NodeJs e MySQL\n\nDicionário em Inglês (mobile):\nReact Native, Typescript e Axios\n\nA porta roxa abre meu GitHub\ncom todos os projetos!",
  "SoftwareScene:5": "Cuidado com meus\nrobôs assassinos.",
  "SoftwareScene:6": "Deploy na sexta-feira?\nJamais!!!",
  "SoftwareScene:7": "Por que não compila?\nFunciona na minha máquina!",
  "SoftwareScene:8": "O café da máquina\né meu.",

  // ---------- Universidade = Skills & Formação ----------
  "UniversityScene:21":
    "Sou Dev FullStack com mais de\n4 anos de experiência.\n\nFrontend: HTML5, CSS, Sass, JS, TS,\nAngular, Vue, React, NextJs\n\nBackend: NodeJs, NestJs, MySQL,\nPostgreSQL, MongoDB, Docker, Swagger\n\nMobile: React Native, Flutter e Ionic\n\nA porta roxa baixa meu currículo!",
  "UniversityScene:4": "Shhhhh...\nHahahahaha",
  "UniversityScene:5": "Curtiu meu\nchapéu?",
  "UniversityScene:7": "Aula de React\né a melhor!",
  "UniversityScene:8": "Professor, quando\né a prova?",
  "UniversityScene:9": "Professor, quando\né a prova?",
  "UniversityScene:10": "Professor, quando\né a prova?",
  "UniversityScene:11": "Professor, quando\né a prova?",
  "UniversityScene:12": "Professor, quando\né a prova?",
  "UniversityScene:13": "Professor, quando\né a prova?",
  "UniversityScene:14": "Professor, quando\né a prova?",
  "UniversityScene:15": "Professor, o que\ncai na prova?",
  "UniversityScene:16": "A prova vai\nser difícil?",
  "UniversityScene:17": "Tem recuperação\nda prova?",
  "UniversityScene:18": "Que curso\né esse?",
  "UniversityScene:19": "A prova é\nescrita?",

  // ---------- Laboratório = Sobre mim & Contato ----------
  "ResearchScene:6":
    "Vamos tomar um café?\n\nTel/WhatsApp: (21) 97484-1079\nEmail: goncalveswagner15@gmail.com\n\nA porta roxa ao lado abre\nmeu LinkedIn!",
  "ResearchScene:5":
    "Sabia que eu já trabalhei\ncom Angular, Vue, React\ne React Native?",
  "ResearchScene:7": "Por favor, devolva os\nlivros que pegar.",
};

// Portas com link=true nos mapas redirecionam para fora do jogo
export const DOOR_LINKS: Record<string, string> = {
  "ResearchScene:3": LINKS.linkedin,
  "SoftwareScene:4": LINKS.github,
  "UniversityScene:3": LINKS.curriculum,
};
