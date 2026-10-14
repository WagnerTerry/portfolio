# Portfólio do Wagner Gonçalves

Site pessoal de **Wagner da Silva Gonçalves**, desenvolvedor FullStack (React, Node, TypeScript), com visual
retrô de fliperama e um **modo game**: o "Estúdio do Wagner", uma sala 3D low-poly onde um personagem cartoon
do Wagner anda pela sala e usa os móveis para abrir bio, currículo, GitHub, LinkedIn e contato.

Este README é a documentação do repositório. Serve para pessoas e para agentes de IA que forem alterar o site:
descreve o conteúdo, a estrutura, as regras do modo game e como verificar mudanças. Mantenha-o atualizado
quando mudar conteúdo, objetos do estúdio ou a forma de verificar.

- Site: https://portfolio-wagner-terry-projects.vercel.app/ (o endereço antigo
  https://portfolio-wagnerterry.vercel.app/ continua no ar)
- GitHub: https://github.com/WagnerTerry
- LinkedIn: https://www.linkedin.com/in/wagner-sgonçalves

## Sobre o Wagner

- Dev FullStack com mais de 5 anos construindo interfaces, APIs e apps web e mobile. Gosta de transformar
  ideias em produtos que funcionam bem e são bons de usar.
- Formação: Análise e Desenvolvimento de Sistemas (Unicarioca).
- Experiência registrada no currículo: Calindra Tech (2019–2023, desenvolvimento web e mobile) e MagIt
  (2023, app mobile de fotos de viagem); antes disso, suporte técnico.
- Contato: goncalveswagner15@gmail.com · (21) 97484-1079 (também WhatsApp).
- Currículo em PDF: `src/data/curriculo do Wagner.pdf`. É baixado pelo botão CURRÍCULO do site e pela bancada
  do modo game. Para atualizar, substitua o arquivo mantendo o nome.

### Habilidades

As três áreas abaixo são as exibidas na seção SKILLS do site (`src/App.tsx`). Ao mudar aqui, mude lá também.

| Área | Tecnologias |
| --- | --- |
| Frontend | HTML5, CSS, Sass, Styled Components, JavaScript, TypeScript, Angular, Vue, React, NextJs |
| Backend | NodeJs, NestJs, MySQL, PostgreSQL, MongoDB, Docker, Swagger |
| Mobile | React Native, Flutter, Ionic |

Outras que constam no currículo e não aparecem no site: Java, C/C++, Prisma, noções de AWS, Git/GitHub/Bitbucket.
Soft skills: organização, pontualidade, criatividade, resolução de problemas, comprometimento.

### Projetos exibidos

| Projeto | Descrição | Stack | Repositório |
| --- | --- | --- | --- |
| Gestão e Estoque | Controle de estoque de loja de motopeças | ReactJs, TypeScript, NodeJs, MongoDB | [moto-pecas-projeto](https://github.com/WagnerTerry/moto-pecas-projeto) |
| Pizzaria | Fluxo de caixa e pedidos de uma pizzaria | ReactJs, NodeJs, MySQL | [new_disk_pizza](https://github.com/WagnerTerry/new_disk_pizza) |
| Dicionário em Inglês | App de dicionário com significados e fonética | React Native, TypeScript, Async Storage, Axios | [challenge-coodesh-mobile](https://github.com/WagnerTerry/challenge-coodesh-mobile) |

## Stack e comandos

- Vite 4, React 18, TypeScript 5, Tailwind CSS 3, ESLint. Three.js 0.185 com @react-three/fiber 8 só no modo game.
- Node 22 (campo `engines` do `package.json`; a Vercel usa essa versão no build).
- Sem testes automatizados: a verificação é `tsc`, `eslint`, o build e abrir o site no navegador.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc && vite build → dist/
npm run lint      # eslint em src, zero warnings
npm run preview   # serve o dist/
```

Deploy na Vercel a partir da branch `main`. A variável `VITE_SITE_URL` (no `.env`, não versionado) guarda o
domínio publicado sem barra final; o `index.html` usa `%VITE_SITE_URL%` nas meta tags Open Graph e Twitter
(`og:url` e `og:image`, que aponta para `public/og-image.jpg`). Se ficar vazia, a prévia ao compartilhar o
link sai sem imagem.

Tamanho do build (out/2026): site ≈ 155 KB de JS (50 KB gzip); modo game ≈ 910 KB (247 KB gzip) num chunk
separado, baixado só quando o visitante clica em MODO GAME (`lazy()` em `src/App.tsx`).

## Estrutura

```
index.html                 título, meta tags, fontes do Google (Press Start 2P, VT323, Michroma)
public/                    favicon (notebook.png) e og-image.jpg
src/
  main.tsx                 entrada React
  App.tsx                  página inteira: header, hero, projetos, skills, contato, footer e botão do modo game
  index.css                Tailwind, fundo quadriculado, scanlines, .neon-text, .pixel-btn
  components/
    PixelIcon/             ícones SVG pixelados (Arrow, Gamepad, Cursor) alinhados à fonte Press Start 2P
    Project/               card de projeto (imagem, techs, link do GitHub)
    Skills/                card de habilidades (ícone, descrição, techs)
  assets/                  fotos e capas em WebP, ícones das stacks em SVG
  data/                    currículo em PDF
  game/                    modo game (detalhado abaixo)
tailwind.config.js         cores (neon-*, hud-*, game-*), fontes, animações e a variante `touch:`
```

## O site

Página única com âncoras (`#about`, `#projects`, `#skills`, `#contact`) e estética de fliperama: fundo escuro
quadriculado, textos neon, botões `.pixel-btn` com sombra dura, overlay de scanlines, fonte Press Start 2P nos
títulos e VT323 no texto. Todo o conteúdo está escrito direto no `src/App.tsx` (não há CMS nem arquivo de
dados): para trocar um projeto, uma skill ou um contato, edite o JSX ali. O botão MODO GAME aparece no hero e,
quando o hero sai da tela, vira um botão flutuante no canto.

## Modo game: Estúdio do Wagner

Sala 3D low-poly, inspirada no bruno-simon.com, renderizada com Three.js via React Three Fiber. O personagem é
um cartoon do Wagner (cabeça esférica com o rosto pintado em textura, óculos, camiseta azul com violão). Ele anda
pela sala e, perto de uma **estação**, aparece um balão; Enter abre um card com texto e links.

Controles: setas ou WASD; clique ou toque no chão para caminhar até o ponto; Enter, Espaço ou E para usar;
Esc fecha o card ou sai do game. No celular (variante `touch:` do Tailwind, `pointer: coarse`) aparecem um
direcional e um botão "Usar" na tela.

### Estações (conteúdo interativo)

| Estação | Objeto | Card |
| --- | --- | --- |
| `desk` | Bancada com monitor | Bio curta e botão para baixar o currículo |
| `github` | Rack de servidor com placa GitHub | Link para o GitHub |
| `linkedin` | Banner roll-up azul | Link para o LinkedIn |
| `coffee` | Balcão com máquina de café | Telefone, e-mail e WhatsApp |

Tudo isso fica em `src/game/content.ts`: `STATIONS` (zona do chão onde o balão aparece, ponto `approach` para
onde o personagem anda ao clicar no objeto, posição do marcador flutuante), `CARDS` (título, parágrafos e
botões) e `LINKS`. Para mudar um texto ou link do game, edite só esse arquivo.

### A sala

14 × 12 m com o chão centrado na origem; x cresce para a direita e z para a frente (lado da câmera). Parede do
fundo em z = −6 e parede esquerda em x = −7; frente e direita abertas, como um diorama. Câmera alta a 45°,
vinda de +z, seguindo o personagem (`CAMERA_OFFSET`). O personagem começa em (0.6, 3.2).

| Objeto | Posição (x, z) | Função em `props.tsx` |
| --- | --- | --- |
| Bancada com monitor, teclado, caneca, currículo e cadeira | (−2, −5.2) | `Desk` |
| Quadro branco | parede do fundo, x −5.4 | `Whiteboard` |
| Janela | parede do fundo, x −2 | `Room.tsx` |
| Pôster arcade | parede do fundo, x 0.3 | `Poster` |
| Estante de livros | (2.2, −5.5) | `Bookshelf` |
| Rack de servidor GitHub | (5.1, −5.3) | `ServerRack` |
| Luminária de chão | (6.3, −1) | `FloorLamp` |
| Banner LinkedIn | (−5.5, −0.45) | `LinkedInBoard` |
| Guitarra elétrica vermelha num suporte | (−6.4, 1.1) | `Guitar` |
| Balcão do café com máquina, xícaras e pote | (−6.35, 3.5) | `CoffeeStation` |
| Tapete roxo | (0.8, 0.2) | `Room.tsx` |
| Cantinho gamer: rack com TV (batalha de RPG de espadas na tela), console no nicho e pufe com controle | rack (5, 0.3), pufe (5, 1.9) | `GameCorner` |
| Mesa auxiliar com notebook (terminal), monitor externo (navegador), mouse, caneca e banquinho | (−2.9, 4.3) | `LaptopDesk` |
| Planta | (6.2, 3.5) | `Plant` |

### Arquivos de `src/game/`

| Arquivo | Papel |
| --- | --- |
| `GameMode.tsx` | Overlay em tela cheia: HUD, tela inicial, cards, teclado e direcional touch. Em desenvolvimento expõe `window.__studio`. |
| `content.ts` | `ROOM`, `PLAYER` (início, velocidade, raio), `CAMERA_OFFSET`, `STATIONS`, `OBSTACLES`, `CARDS`, `LINKS`. |
| `input.ts` | Estado de entrada: teclas, direcional e destino do clique. |
| `game.css` | Animação do balão de interação. |
| `studio/Scene.tsx` | Canvas, luzes e sombras; monta Room, Props, Markers, Player e CameraRig. |
| `studio/Room.tsx` | Piso de tábuas, base do diorama, paredes, janela e tapete. |
| `studio/props.tsx` | Todos os móveis, montados só com `Block`, `Cylinder`, `Sphere` e `Picture`. |
| `studio/Block.tsx` | Primitivas low-poly; `at` = [x, altura da base, z]. `Cylinder` aceita `rotation` (deitado vira um disco). |
| `studio/textures.ts` | Texturas desenhadas em canvas: placas, telas (monitor, navegador, terminal, TV), quadro, pôster, rosto e camiseta. |
| `studio/Player.tsx` | Personagem, movimento, colisão, animação de andar e detecção da estação ao alcance. |
| `studio/collision.ts` | Círculo do personagem contra os retângulos de `OBSTACLES` e os limites da sala, deslizando nas bordas. |
| `studio/CameraRig.tsx` | Câmera com suavização seguindo o personagem. |
| `studio/Markers.tsx` | Losangos flutuantes sobre as estações. |

### Regras para mexer no cenário

1. **Colisão acompanha o visual.** Cada móvel que o personagem não atravessa precisa de um retângulo em
   `OBSTACLES` (`content.ts`) cobrindo a área no chão com alguns centímetros de folga. O raio do personagem é
   0,34 m, então uma passagem precisa de pelo menos 0,7 m.
2. **O clique anda em linha reta.** Ao clicar num objeto ou no chão, o personagem vai reto até o destino e
   desiste se travar nos dois eixos. Móveis novos devem ficar fora dos segmentos entre o início (0.6, 3.2) e os
   `approach` das estações, e entre as estações entre si. Foi por isso que a mesa auxiliar ficou em z ≥ 3.85:
   mais para o fundo ela cortava o caminho início → café.
3. **A câmera esconde o que está atrás de objetos altos.** Com a câmera a 45° vinda de +z, um objeto de altura
   h em z esconde o chão atrás dele até cerca de z − h na mesma faixa de x. Confira objetos novos com o
   personagem no início, na parede esquerda e no café.
4. **Zonas das estações.** Um objeto decorativo dentro da `zone` de uma estação faz o balão daquela estação
   aparecer ao lado dele; ajuste a zona se ficar estranho.
5. **Paleta.** Reaproveite as cores já usadas: roxo `#5d275d`, vermelho `#d83a3a`, amarelo `#ffd54f`, azul
   `#2b4fa3`, verde `#2e7d32`, laranja `#f4a261`, cinza-escuro `#2f3340`, madeiras `#8a5a30` e `#6d4c2f`. São as
   mesmas do `tailwind.config.js`.
6. **Texturas só em canvas** (`textures.ts`), com fonte do sistema: o game não carrega imagens nem fontes
   externas.
7. **Personagem.** O visual já passou por várias rodadas de ajuste e está aprovado; alterações pedem conversa
   antes. O rosto e a camiseta vêm de `faceTexture` e `outfitTexture`.

### Como verificar uma mudança no game

```bash
npx tsc --noEmit && npm run lint
npx vite --port 5199
```

Abra o site, clique em MODO GAME e aperte Enter. Em desenvolvimento, `window.__studio` dá acesso ao estado:
`__studio.input.target = { x, z }` faz o personagem andar até o ponto (serve para testar colisão),
`__studio.use()` abre o card da estação ao alcance e o balão `.door-prompt` mostra qual estação está ativa.
Confira o visual dos objetos novos de perto, se o personagem para na borda deles e se todos os caminhos entre
as estações continuam chegando com o balão certo.

## Guia rápido de alterações

| Quero mudar… | Onde |
| --- | --- |
| Texto do hero, projetos, skills, contato | `src/App.tsx` |
| Imagem de projeto ou foto | `src/assets/` (WebP) e o `import` em `App.tsx` |
| Currículo | substituir `src/data/curriculo do Wagner.pdf` |
| Textos e links dos cards do game | `src/game/content.ts` (`CARDS`, `LINKS`) |
| Um móvel do estúdio | `src/game/studio/props.tsx` e `OBSTACLES` em `content.ts` |
| Tela de um monitor ou da TV do estúdio | `src/game/studio/textures.ts` |
| Personagem | `src/game/studio/Player.tsx`, `faceTexture` e `outfitTexture` |
| Cores, fontes, animações | `tailwind.config.js` e `src/index.css` |
| Meta tags e prévia de compartilhamento | `index.html` e `VITE_SITE_URL` |

Depois de qualquer mudança: `npm run build` precisa passar (ele roda o `tsc`), `npm run lint` sem warnings, e o
site e o modo game conferidos no navegador. Atualize as tabelas deste README se mudou conteúdo, objetos ou
estações.
