// Pixel-art própria em texto: cada caractere é um pixel. "." = transparente.
// Para trocar o avatar sem mexer aqui, coloque um spritesheet em public/avatar.png
// (3 colunas x 4 linhas, ordem das linhas: baixo, esquerda, direita, cima).

export const TILE = 16;

export const PALETTE: Record<string, string> = {
  k: "#1a1c2c", // contorno / olhos
  s: "#d49a6c", // pele
  S: "#b57b50", // pele sombra
  h: "#5a3520", // cabelo castanho
  H: "#7d4d2e", // cabelo com luz
  f: "#2c1a10", // barba
  L: "#d6ecf7", // lente dos óculos
  m: "#353a48", // armação dos óculos
  w: "#f4f4f8", // branco (camisa, brilho, detalhe do correio)
  r: "#d83a3a", // vermelho (gravata, caixa de correio)
  j: "#3558a8", // paletó azul
  J: "#264080", // paletó sombra
  p: "#3f4353", // calça escura
  P: "#2c2f3b", // calça sombra
  e: "#1f2129", // sapato
  g: "#2e7d32", // verde escuro (copa)
  G: "#4caf50", // verde claro (copa)
  t: "#6d4c2f", // tronco
  T: "#8a6240", // tronco claro
  o: "#c8945a", // madeira clara
  O: "#8a5a30", // madeira escura
  y: "#ffd54f", // dourado (baú)
};

export type Sprite = string[];

const EMPTY_ROW = "................";

const norm = (rows: string[]): Sprite =>
  rows.map((r) => (r + EMPTY_ROW).slice(0, 16));

// ---------------------------------------------------------------------------
// AVATAR PADRÃO (16x28) em estilo GBA (Pokémon FireRed/Emerald) com proporção
// mais esguia: cabeça de 10px, tronco de 8px com braços destacados, pernas longas,
// contorno escuro, 2 tons por cor e 3 frames por direção.
// Cada frame = cabeça (12 linhas, a última é o pescoço) + corpo (15 linhas).
// Nos passos a cabeça desce 1px ("bob"), o tronco perde uma linha e uma perna fica
// no ar, como nos charsets originais do GBA.

export const PLAYER_FRAME_HEIGHT = 28;
/** Linha do corpo removida nos frames de passo para compensar o "bob" da cabeça. */
const BOB_ROW = 3;

// Cabeça (12 linhas, 10px de largura): topete castanho, orelhas à mostra, óculos de armação grossa, barba aparada e pescoço
const PLAYER_HEAD_DOWN: Sprite = [
  ".....kkkk.......",
  "....kHHhhkk.....",
  "...kHHhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhssshk...",
  "..ksmmmssmmmsk..",
  "..ksmLkmmkLmsk..",
  "...kssssssssk...",
  "...kfsffffsfk...",
  "...kfffSSfffk...",
  "....kffffffk....",
  "......kssk......",
];

// Costas: cabelo curto, orelhas e nuca
const PLAYER_HEAD_UP: Sprite = [
  ".....kkkk.......",
  "....kHHhhkk.....",
  "...kHHhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "..kshhhhhhhhsk..",
  "..kshhhhhhhhsk..",
  "...khhhhhhhhk...",
  "...kshhhhhhsk...",
  "...kSshhhhsSk...",
  "....kSssssSk....",
  "......kssk......",
];

// Perfil olhando para a ESQUERDA (a direita é o flip horizontal)
const PLAYER_HEAD_SIDE: Sprite = [
  "....kkkkk.......",
  "...kHHhhhkk.....",
  "...kHhhhhhhhk...",
  "...khhhhhhhhk...",
  "...kshhhhhhhk...",
  "...kmmmsSshhk...",
  "...kLkmmSshhk...",
  "..ksssssSshhk...",
  "...kfsfffsSSk...",
  "...kffffffSSk...",
  "....kfffffSk....",
  ".......kssk.....",
];

// Corpo (15 linhas): paletó azul com braços destacados, camisa branca, gravata vermelha e pernas longas
const PLAYER_BODY_DOWN_STAND: Sprite = [
  "...kkjjwwjjkk...",
  "..kjkjwrrwjkjk..",
  "..kjkjwrrwjkjk..",
  "..kJkjjrrjjkJk..",
  "..kJkjjrrjjkJk..",
  "..kskJjjjjJksk..",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kPpkkpPk....",
  "....kPpkkpPk....",
  "....kee..eek....",
  "................",
];

const PLAYER_BODY_DOWN_WALK_A: Sprite = [
  "...kkjjwwjjkk...",
  "..kjkjwrrwjkjk..",
  "..kjkjwrrwjkjk..",
  "..kJkjjrrjjkJk..",
  "..kskjjrrjjkJk..",
  "...kkJjjjjJksk..",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kPpkkeek....",
  "....kPpk........",
  "....kee.........",
  "................",
];

const PLAYER_BODY_DOWN_WALK_B: Sprite = [
  "...kkjjwwjjkk...",
  "..kjkjwrrwjkjk..",
  "..kjkjwrrwjkjk..",
  "..kJkjjrrjjkJk..",
  "..kJkjjrrjjksk..",
  "..kskJjjjjJkk...",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....keekkpPk....",
  "........kpPk....",
  ".........eek....",
  "................",
];

const PLAYER_BODY_UP_STAND: Sprite = [
  "...kkjjjjjjkk...",
  "..kjkjjjJjjkjk..",
  "..kjkjjjJjjkjk..",
  "..kJkjjjJjjkJk..",
  "..kJkjjjJjjkJk..",
  "..kskJjjJjJksk..",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kPpkkpPk....",
  "....kPpkkpPk....",
  "....kee..eek....",
  "................",
];

const PLAYER_BODY_UP_WALK_A: Sprite = [
  "...kkjjjjjjkk...",
  "..kjkjjjJjjkjk..",
  "..kjkjjjJjjkjk..",
  "..kJkjjjJjjkJk..",
  "..kskjjjJjjkJk..",
  "...kkJjjJjJksk..",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kPpkkeek....",
  "....kPpk........",
  "....kee.........",
  "................",
];

const PLAYER_BODY_UP_WALK_B: Sprite = [
  "...kkjjjjjjkk...",
  "..kjkjjjJjjkjk..",
  "..kjkjjjJjjkjk..",
  "..kJkjjjJjjkJk..",
  "..kJkjjjJjjksk..",
  "..kskJjjJjJkk...",
  "....kJJJJJJk....",
  "....kppppppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....kppkkppk....",
  "....keekkpPk....",
  "........kpPk....",
  ".........eek....",
  "................",
];

const PLAYER_BODY_SIDE_STAND: Sprite = [
  ".....kjjjjjk....",
  "....kwjJJjjjk...",
  "....kjjJJjjjk...",
  "....kjjJJjjjk...",
  "....kjjJJjjjk...",
  "....kjjsSjjjk...",
  ".....kJJJJJk....",
  ".....kppppk.....",
  ".....kppppk.....",
  ".....kppppk.....",
  ".....kppppk.....",
  ".....kPpppk.....",
  ".....kPpppk.....",
  "....keeeek......",
  "................",
];

const PLAYER_BODY_SIDE_WALK_A: Sprite = [
  ".....kjjjjjk....",
  "....kwJJjjjjk...",
  "....kjJJjjjjk...",
  "....kjJJjjjjk...",
  "....kjsSjjjjk...",
  "....kjjjjjjjk...",
  ".....kJJJJJk....",
  ".....kppppk.....",
  "....kpppppPk....",
  "....kppkkPPk....",
  "...kppk..kPPk...",
  "...kppk..kPPk...",
  "...kppk..keek...",
  "..keeek.........",
  "................",
];

const PLAYER_BODY_SIDE_WALK_B: Sprite = [
  ".....kjjjjjk....",
  "....kwjjjJJjk...",
  "....kjjjjJJjk...",
  "....kjjjjJJjk...",
  "....kjjjjsSjk...",
  "....kjjjjjjjk...",
  ".....kJJJJJk....",
  ".....kppppk.....",
  "....kPPpppk.....",
  "....kPPkkppk....",
  "...kPPk..kppk...",
  "...kPPk..kppk...",
  "...keek..kppk...",
  "........keeeek..",
  "................",
];

/** Empilha cabeça + corpo num frame de PLAYER_FRAME_HEIGHT linhas. bob=1 = frame de passo. */
function composeFrame(head: Sprite, body: Sprite, bob = 0): Sprite {
  const trunk = bob ? [...body.slice(0, BOB_ROW), ...body.slice(BOB_ROW + 1)] : body;
  const rows = [...Array<string>(1 + bob).fill(EMPTY_ROW), ...head, ...trunk];
  while (rows.length < PLAYER_FRAME_HEIGHT) rows.push(EMPTY_ROW);
  return norm(rows.slice(0, PLAYER_FRAME_HEIGHT));
}

export const PLAYER_DOWN_STAND = composeFrame(PLAYER_HEAD_DOWN, PLAYER_BODY_DOWN_STAND);
export const PLAYER_DOWN_WALK_A = composeFrame(PLAYER_HEAD_DOWN, PLAYER_BODY_DOWN_WALK_A, 1);
export const PLAYER_DOWN_WALK_B = composeFrame(PLAYER_HEAD_DOWN, PLAYER_BODY_DOWN_WALK_B, 1);

export const PLAYER_UP_STAND = composeFrame(PLAYER_HEAD_UP, PLAYER_BODY_UP_STAND);
export const PLAYER_UP_WALK_A = composeFrame(PLAYER_HEAD_UP, PLAYER_BODY_UP_WALK_A, 1);
export const PLAYER_UP_WALK_B = composeFrame(PLAYER_HEAD_UP, PLAYER_BODY_UP_WALK_B, 1);

// olhando para a ESQUERDA (a direita é o flip horizontal)
export const PLAYER_SIDE_STAND = composeFrame(PLAYER_HEAD_SIDE, PLAYER_BODY_SIDE_STAND);
export const PLAYER_SIDE_WALK_A = composeFrame(PLAYER_HEAD_SIDE, PLAYER_BODY_SIDE_WALK_A, 1);
export const PLAYER_SIDE_WALK_B = composeFrame(PLAYER_HEAD_SIDE, PLAYER_BODY_SIDE_WALK_B, 1);

// ---------------------------------------------------------------------------
// OBJETOS DO CENÁRIO
export const TREE: Sprite = norm([
  "................",
  "......GGGG......",
  "....GGGGGGGG....",
  "...GGGgGGgGGG...",
  "..GGgGGGGGGgGG..",
  "..GGGGgGGgGGGG..",
  "..gGGGGGGGGGGg..",
  "..GgGGgGGGgGGG..",
  "..GGGGGGgGGGgG..",
  "...gGGgGGGGGg...",
  "....gggGGggg....",
  "......tTtt......",
  "......tTtt......",
  "......tTtt......",
  ".....tttttt.....",
  "................",
]);

export const SIGN: Sprite = norm([
  "................",
  "................",
  "................",
  "..kkkkkkkkkkkk..",
  "..kooooooooook..",
  "..koOOoOOoOOok..",
  "..kooooooooook..",
  "..kkkkkkkkkkkk..",
  ".......oo.......",
  ".......oo.......",
  ".......oo.......",
  "......oooo......",
  "................",
  "................",
  "................",
  "................",
]);

export const CHEST: Sprite = norm([
  "................",
  "................",
  "................",
  "................",
  "...kkkkkkkkkk...",
  "..kOooooooooOk..",
  "..kOoooyyoooOk..",
  "..kkkkkyykkkkk..",
  "..kOooooooooOk..",
  "..kOooooooooOk..",
  "..kkkkkkkkkkkk..",
  "................",
  "................",
  "................",
  "................",
  "................",
]);

export const MAILBOX: Sprite = norm([
  "................",
  "................",
  "................",
  "....kkkkkkkk....",
  "...krrrrrrrrk...",
  "...krwwwrrrrk...",
  "...krrrrrrrrk...",
  "....kkkkkkkk....",
  ".......oo.......",
  ".......oo.......",
  ".......oo.......",
  "......oooo......",
  "................",
  "................",
  "................",
  "................",
]);

/** Pré-renderiza um sprite em um canvas (1 char = 1 pixel). */
export function bakeSprite(
  sprite: Sprite,
  options: { flip?: boolean } = {}
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = sprite.length;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  sprite.forEach((row, y) => {
    for (let x = 0; x < 16; x++) {
      const ch = row[x];
      if (ch === "." || !PALETTE[ch]) continue;
      ctx.fillStyle = PALETTE[ch];
      ctx.fillRect(options.flip ? 15 - x : x, y, 1, 1);
    }
  });

  return canvas;
}

// ---------------------------------------------------------------------------
// CENÁRIO: desenha o mundo inteiro num canvas a partir do mapa ASCII

const hash = (x: number, y: number) =>
  Math.abs(((x * 73856093) ^ (y * 19349663)) % 997);

function drawGrass(g: CanvasRenderingContext2D, x: number, y: number) {
  const px = x * TILE;
  const py = y * TILE;
  g.fillStyle = hash(x, y) % 2 === 0 ? "#8fce4f" : "#85c447";
  g.fillRect(px, py, TILE, TILE);
  g.fillStyle = "#7ab53d";
  for (let i = 0; i < 4; i++) {
    g.fillRect(px + (hash(x * 4 + i, y) % 14) + 1, py + (hash(x, y * 4 + i) % 14) + 1, 1, 2);
  }
}

function drawTallGrass(g: CanvasRenderingContext2D, x: number, y: number) {
  const px = x * TILE;
  const py = y * TILE;
  g.fillStyle = "#4f8f2f";
  for (let i = 0; i < 5; i++) {
    const sway = hash(x + i, y) % 2;
    g.fillRect(px + 1 + i * 3 + sway, py + 6, 2, 9);
    g.fillRect(px + i * 3 + sway, py + 9, 1, 6);
  }
  g.fillStyle = "#3e7325";
  for (let i = 0; i < 4; i++) g.fillRect(px + 3 + i * 3, py + 10, 1, 5);
}

function drawPath(g: CanvasRenderingContext2D, x: number, y: number) {
  const px = x * TILE;
  const py = y * TILE;
  g.fillStyle = "#d8b878";
  g.fillRect(px, py, TILE, TILE);
  g.fillStyle = "#c4a261";
  for (let i = 0; i < 5; i++) {
    g.fillRect(px + (hash(x * 3 + i, y + 7) % 13) + 1, py + (hash(x + 7, y * 3 + i) % 13) + 1, 2, 1);
  }
}

function drawFlowers(g: CanvasRenderingContext2D, x: number, y: number) {
  const px = x * TILE;
  const py = y * TILE;
  const colors = ["#e85d75", "#f8d847", "#f8f8f8"];
  [
    [4, 4],
    [11, 7],
    [6, 11],
  ].forEach(([fx, fy], i) => {
    g.fillStyle = colors[(hash(x + i, y + i) + i) % colors.length];
    g.fillRect(px + fx - 1, py + fy, 3, 1);
    g.fillRect(px + fx, py + fy - 1, 1, 3);
    g.fillStyle = "#f8a830";
    g.fillRect(px + fx, py + fy, 1, 1);
  });
}

/** Casa principal: telhado vermelho, paredes claras e porta no tile indicado. */
function drawHouse(
  g: CanvasRenderingContext2D,
  tx: number,
  ty: number,
  wTiles: number,
  doorTx: number
) {
  const px = tx * TILE;
  const py = ty * TILE;
  const w = wTiles * TILE;
  // telhado (2 tiles)
  g.fillStyle = "#c0392b";
  g.fillRect(px - 4, py, w + 8, TILE * 2);
  g.fillStyle = "#a93226";
  for (let i = 0; i < 4; i++) g.fillRect(px - 4, py + 6 + i * 7, w + 8, 2);
  g.fillStyle = "#1a1c2c";
  g.fillRect(px - 4, py, w + 8, 2);
  g.fillRect(px - 4, py + TILE * 2 - 2, w + 8, 2);
  // paredes (2 tiles)
  g.fillStyle = "#f0e3c0";
  g.fillRect(px, py + TILE * 2, w, TILE * 2);
  g.fillStyle = "#d8c89a";
  g.fillRect(px, py + TILE * 4 - 3, w, 3);
  // janelas
  g.fillStyle = "#1a1c2c";
  g.fillRect(px + 10, py + TILE * 2 + 6, 14, 12);
  g.fillRect(px + w - 24, py + TILE * 2 + 6, 14, 12);
  g.fillStyle = "#9adcf8";
  g.fillRect(px + 12, py + TILE * 2 + 8, 10, 8);
  g.fillRect(px + w - 22, py + TILE * 2 + 8, 10, 8);
  // porta
  const dx = doorTx * TILE;
  const dy = (ty + 3) * TILE;
  g.fillStyle = "#1a1c2c";
  g.fillRect(dx + 1, dy - 6, TILE - 2, TILE + 6);
  g.fillStyle = "#8a5a30";
  g.fillRect(dx + 3, dy - 4, TILE - 6, TILE + 4);
  g.fillStyle = "#ffd54f";
  g.fillRect(dx + TILE - 6, dy + 6, 2, 2);
}

/** Casinha-portal (GitHub/LinkedIn): 3x3 tiles com porta no meio e logo na fachada. */
function drawPortal(
  g: CanvasRenderingContext2D,
  tx: number,
  ty: number,
  wall: string,
  roof: string,
  logo: "github" | "linkedin"
) {
  const px = tx * TILE;
  const py = ty * TILE;
  const w = 3 * TILE;
  // telhado (1 tile)
  g.fillStyle = roof;
  g.fillRect(px - 3, py, w + 6, TILE);
  g.fillStyle = "#1a1c2c";
  g.fillRect(px - 3, py, w + 6, 2);
  g.fillRect(px - 3, py + TILE - 2, w + 6, 2);
  // paredes (2 tiles)
  g.fillStyle = wall;
  g.fillRect(px, py + TILE, w, TILE * 2);
  g.fillStyle = "rgba(0,0,0,0.25)";
  g.fillRect(px, py + TILE * 3 - 3, w, 3);
  // porta no tile do meio
  const dx = (tx + 1) * TILE;
  const dy = (ty + 2) * TILE;
  g.fillStyle = "#1a1c2c";
  g.fillRect(dx + 1, dy - 6, TILE - 2, TILE + 6);
  g.fillStyle = "#4a4f5a";
  g.fillRect(dx + 3, dy - 4, TILE - 6, TILE + 4);
  // logo na fachada, acima da porta
  const cx = dx + TILE / 2;
  const cy = py + TILE + 7;
  if (logo === "github") {
    g.fillStyle = "#f8f8f8";
    g.beginPath();
    g.arc(cx, cy, 5, 0, Math.PI * 2);
    g.fill();
    g.fillRect(cx - 5, cy - 5, 3, 3); // orelhas do gatopolvo
    g.fillRect(cx + 2, cy - 5, 3, 3);
    g.fillStyle = wall;
    g.fillRect(cx - 3, cy - 1, 2, 2); // olhos
    g.fillRect(cx + 1, cy - 1, 2, 2);
  } else {
    g.fillStyle = "#f8f8f8";
    g.fillRect(cx - 6, cy - 5, 12, 11);
    g.fillStyle = "#0a66c2";
    g.fillRect(cx - 4, cy - 3, 2, 2); // ponto do "i"
    g.fillRect(cx - 4, cy, 2, 5); // haste do "i"
    g.fillRect(cx - 1, cy, 2, 5); // "n"
    g.fillRect(cx + 1, cy, 3, 2);
    g.fillRect(cx + 2, cy, 2, 5);
  }
}

export type WorldBuildings = {
  house: { tx: number; ty: number; wTiles: number; doorTx: number };
  github: { tx: number; ty: number };
  linkedin: { tx: number; ty: number };
};

/** Desenha o mundo inteiro (chão + construções + objetos) num canvas. */
export function buildWorldCanvas(
  map: string[],
  buildings: WorldBuildings
): HTMLCanvasElement {
  const h = map.length;
  const w = map[0].length;
  const canvas = document.createElement("canvas");
  canvas.width = w * TILE;
  canvas.height = h * TILE;
  const g = canvas.getContext("2d");
  if (!g) return canvas;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawGrass(g, x, y);
      const tile = map[y][x];
      if (tile === "=") drawPath(g, x, y);
      if (tile === ",") drawTallGrass(g, x, y);
      if (tile === "f") drawFlowers(g, x, y);
    }
  }

  drawHouse(g, buildings.house.tx, buildings.house.ty, buildings.house.wTiles, buildings.house.doorTx);
  drawPortal(g, buildings.github.tx, buildings.github.ty, "#3b3f4a", "#24292e", "github");
  drawPortal(g, buildings.linkedin.tx, buildings.linkedin.ty, "#0a66c2", "#084d92", "linkedin");

  const sprites = {
    "#": bakeSprite(TREE),
    s: bakeSprite(SIGN),
    c: bakeSprite(CHEST),
    m: bakeSprite(MAILBOX),
  } as Record<string, HTMLCanvasElement>;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sprite = sprites[map[y][x]];
      if (sprite) g.drawImage(sprite, x * TILE, y * TILE);
    }
  }

  return canvas;
}
