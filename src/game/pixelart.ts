// Pixel-art própria em texto: cada caractere é um pixel. "." = transparente.
// Para trocar o avatar sem mexer aqui, coloque um spritesheet em public/avatar.png
// (3 colunas x 4 linhas, ordem das linhas: baixo, esquerda, direita, cima).

export const TILE = 16;

export const PALETTE: Record<string, string> = {
  k: "#1a1c2c", // contorno
  r: "#d83a3a", // vermelho (caixa de correio)
  s: "#e0a96d", // pele
  h: "#2e2018", // cabelo e barba
  b: "#2b4fa3", // calça
  e: "#30343f", // sapato
  w: "#e8e8ee", // jaqueta clara
  g: "#2e7d32", // verde escuro (copa)
  G: "#4caf50", // verde claro (copa)
  t: "#6d4c2f", // tronco
  T: "#8a6240", // tronco claro
  o: "#c8945a", // madeira clara
  O: "#8a5a30", // madeira escura
  y: "#ffd54f", // dourado (baú)
};

export type Sprite = string[];

const norm = (rows: string[]): Sprite =>
  rows.map((r) => (r + "................").slice(0, 16));

// ---------------------------------------------------------------------------
// AVATAR PADRÃO (16x24): sem boné, cabelo escuro, óculos e barba
export const PLAYER_DOWN_STAND: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khsssssshk...",
  "...kkwwkkwwkk...",
  "...kssssssssk...",
  "...khsssssshk...",
  "...khhsssshhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....kssssk.....",
  "...kkwwwwwwkk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwkkwwwwk..",
  "..kwwwwkkwwwwk..",
  "..kswwwkkwwwsk..",
  "...kwwwwwwwwk...",
  "....kbbbbbbk....",
  "....kbbbbbbk....",
  "....kbb..bbk....",
  "....kee..eek....",
  "................",
]);

export const PLAYER_DOWN_WALK: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khsssssshk...",
  "...kkwwkkwwkk...",
  "...kssssssssk...",
  "...khsssssshk...",
  "...khhsssshhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....kssssk.....",
  "...kkwwwwwwkk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwkkwwwwk..",
  "..kwwwwkkwwwwk..",
  "..kswwwkkwwwsk..",
  "...kwwwwwwwwk...",
  "....kbbbbbbk....",
  "....kbbbbbbk....",
  ".....kbb.bbk....",
  ".....kee.eek....",
  "................",
]);

export const PLAYER_UP_STAND: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....kssssk.....",
  "...kkwwwwwwkk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kswwwwwwwwsk..",
  "...kwwwwwwwwk...",
  "....kbbbbbbk....",
  "....kbbbbbbk....",
  "....kbb..bbk....",
  "....kee..eek....",
  "................",
]);

export const PLAYER_UP_WALK: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....kssssk.....",
  "...kkwwwwwwkk...",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kwwwwwwwwwwk..",
  "..kswwwwwwwwsk..",
  "...kwwwwwwwwk...",
  "....kbbbbbbk....",
  "....kbbbbbbk....",
  ".....kbb.bbk....",
  ".....kee.eek....",
  "................",
]);

// olhando para a ESQUERDA (a direita é o flip horizontal)
export const PLAYER_SIDE_STAND: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...ksshhhhhhk...",
  "...kkwwkhhhhk...",
  "...kssshhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....khhhhk.....",
  ".....kssssk.....",
  "....kwwwwwwk....",
  "...kwwwwwwwwk...",
  "...kwwwwwwwwk...",
  "...kwwwwwwwwk...",
  "....kswwwwsk....",
  "....kwwwwwwk....",
  "....kbbbbbbk....",
  "....kbbbbbbk....",
  ".....kbbbbk.....",
  "....keeek.......",
  "................",
]);

export const PLAYER_SIDE_WALK: Sprite = norm([
  "................",
  ".....kkkkkk.....",
  "....khhhhhhk....",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "...ksshhhhhhk...",
  "...kkwwkhhhhk...",
  "...kssshhhhhk...",
  "...khhhhhhhhk...",
  "...khhhhhhhhk...",
  "....khhhhhhk....",
  ".....khhhhk.....",
  ".....kssssk.....",
  "....kwwwwwwk....",
  "...kwwwwwwwwk...",
  "...kwwwwwwwwk...",
  "...kwwwwwwwwk...",
  "....kswwwwsk....",
  "....kwwwwwwk....",
  "....kbbbbbbk....",
  "...kbb..kbbk....",
  "...kbb...bbk....",
  "...kee....eek...",
  "................",
]);

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
