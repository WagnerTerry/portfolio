// Pixel-art em texto: cada caractere é um pixel (16x16 por sprite).
// "." = transparente. As cores ficam na PALETTE.

export const TILE = 16;

export const PALETTE: Record<string, string> = {
  k: "#1a1c2c", // contorno
  r: "#d83a3a", // vermelho (boné/camisa)
  R: "#a32828", // vermelho escuro
  s: "#f4c08c", // pele
  h: "#5a3a22", // cabelo
  b: "#2b4fa3", // calça
  e: "#30343f", // sapato
  w: "#f8f8f8", // branco
  g: "#2e7d32", // verde escuro (copa)
  G: "#4caf50", // verde claro (copa)
  t: "#6d4c2f", // tronco
  T: "#8a6240", // tronco claro
  o: "#c8945a", // madeira clara
  O: "#8a5a30", // madeira escura
  y: "#ffd54f", // dourado (baú)
  d: "#3b3f4a", // cinza escuro (placa github)
  l: "#0a66c2", // azul linkedin
};

export type Sprite = string[];

const norm = (rows: string[]): Sprite =>
  rows.map((r) => (r + "................").slice(0, 16));

export const PLAYER_DOWN_STAND: Sprite = norm([
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "...kkkkkkkkkk...",
  "....khhsshhk....",
  "....kskssksk....",
  "....kssssssk....",
  "...kssrrrrssk...",
  "...ksrrrrrrsk...",
  "....krrRRrrk....",
  "....krrrrrrk....",
  "....kbbbbbbk....",
  "....kbb..bbk....",
  "....kee..eek....",
  "................",
]);

export const PLAYER_DOWN_WALK: Sprite = norm([
  "................",
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "...kkkkkkkkkk...",
  "....khhsshhk....",
  "....kskssksk....",
  "....kssssssk....",
  "...kssrrrrssk...",
  "...ksrrRRrrsk...",
  "....krrrrrrk....",
  "....kbbbbbbk....",
  ".....kbb.bbk....",
  ".....kee.eek....",
  "................",
]);

export const PLAYER_UP_STAND: Sprite = norm([
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "....kRRRRRRk....",
  "....khhhhhhk....",
  "....khhhhhhk....",
  "....khhhhhhk....",
  "...kssrrrrssk...",
  "...ksrrrrrrsk...",
  "....krrRRrrk....",
  "....krrrrrrk....",
  "....kbbbbbbk....",
  "....kbb..bbk....",
  "....kee..eek....",
  "................",
]);

export const PLAYER_UP_WALK: Sprite = norm([
  "................",
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "....kRRRRRRk....",
  "....khhhhhhk....",
  "....khhhhhhk....",
  "...kssrrrrssk...",
  "...ksrrrrrrsk...",
  "....krrRRrrk....",
  "....krrrrrrk....",
  "....kbbbbbbk....",
  ".....kbb.bbk....",
  ".....kee.eek....",
  "................",
]);

// olhando para a ESQUERDA (a direita é o flip horizontal)
export const PLAYER_SIDE_STAND: Sprite = norm([
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "...kkkkrrrrk....",
  "....ksshhhhk....",
  "....kksshhhk....",
  "....kssshhhk....",
  "....krrrrrsk....",
  "....ksrrrrrk....",
  "....krrRRrrk....",
  "....krrrrrrk....",
  "....kbbbbbbk....",
  ".....kbbbbk.....",
  "....keeek.......",
  "................",
]);

export const PLAYER_SIDE_WALK: Sprite = norm([
  "................",
  "......kkkk......",
  ".....krrrrk.....",
  "....krrrrrrk....",
  "....krrrrrrk....",
  "...kkkkrrrrk....",
  "....ksshhhhk....",
  "....kksshhhk....",
  "....kssshhhk....",
  "....krrrrrsk....",
  "....ksrrrrrk....",
  "....krrRRrrk....",
  "....kbbbbbbk....",
  "...kbb..kbbk....",
  "...kee...eek....",
  "................",
]);

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

/** Pré-renderiza um sprite em um canvas pequeno (para desenhar rápido no loop). */
export function bakeSprite(
  sprite: Sprite,
  options: { flip?: boolean; palette?: Record<string, string> } = {}
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext("2d")!;
  const colors = { ...PALETTE, ...(options.palette ?? {}) };

  sprite.forEach((row, y) => {
    for (let x = 0; x < 16; x++) {
      const ch = row[x];
      if (ch === "." || !colors[ch]) continue;
      ctx.fillStyle = colors[ch];
      ctx.fillRect(options.flip ? 15 - x : x, y, 1, 1);
    }
  });

  return canvas;
}
