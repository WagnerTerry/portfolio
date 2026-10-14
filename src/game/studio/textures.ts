// Texturas desenhadas em canvas: placas, telas (monitores, notebook, TV), quadro branco e pôster.

import * as THREE from "three";

const FONT = "Ubuntu, 'Segoe UI', system-ui, sans-serif";

function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Placa branca "GitHub" com o gatinho. */
export function githubSignTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = "#f8f8f8";
    roundRect(ctx, 0, 0, w, h, 60);
    ctx.fill();
    // gatinho
    ctx.fillStyle = "#24292e";
    ctx.beginPath();
    ctx.arc(230, 270, 110, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(140, 210);
    ctx.lineTo(150, 90);
    ctx.lineTo(225, 170);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(320, 210);
    ctx.lineTo(310, 90);
    ctx.lineTo(235, 170);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#f8f8f8";
    ctx.beginPath();
    ctx.ellipse(230, 300, 70, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#24292e";
    ctx.beginPath();
    ctx.arc(200, 290, 14, 0, Math.PI * 2);
    ctx.arc(260, 290, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `800 190px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("GitHub", 380, 270);
  });
}

/** Painel azul com o "in". */
export function linkedinSignTexture() {
  return canvasTexture(1024, 640, (ctx, w, h) => {
    ctx.fillStyle = "#0a66c2";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#f8f8f8";
    roundRect(ctx, 312, 120, 400, 400, 70);
    ctx.fill();
    ctx.fillStyle = "#0a66c2";
    ctx.font = `800 300px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("in", 512, 330);
  });
}

/** Tela do monitor com "código". */
export function screenTexture() {
  return canvasTexture(1024, 600, (ctx, w, h) => {
    ctx.fillStyle = "#12141f";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1c2440";
    ctx.fillRect(0, 0, w, 64);
    ctx.fillStyle = "#00f5ff";
    ctx.font = `700 34px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("WAGNER.EXE — portfolio.tsx", 32, 32);
    const colors = ["#ff2fd6", "#39ff88", "#ffe74c", "#9adcf8", "#dbe7ff"];
    let y = 110;
    const rows = [
      [0, 180, 0],
      [1, 260, 40],
      [2, 120, 80],
      [3, 320, 80],
      [4, 90, 40],
      [1, 220, 40],
      [0, 150, 0],
      [2, 280, 40],
      [3, 200, 80],
      [4, 140, 40],
    ];
    rows.forEach(([c, len, indent]) => {
      ctx.fillStyle = colors[c];
      roundRect(ctx, 40 + indent, y, len, 26, 8);
      ctx.fill();
      y += 46;
    });
    ctx.fillStyle = "#dbe7ff";
    ctx.fillRect(40, y, 18, 30); // cursor
  });
}

/** Monitor externo da mesa auxiliar: navegador aberto no próprio portfólio. */
export function browserTexture() {
  return canvasTexture(1024, 576, (ctx, w, h) => {
    // barra de abas e endereço
    ctx.fillStyle = "#2f3340";
    ctx.fillRect(0, 0, w, 60);
    ctx.fillStyle = "#3f4353";
    roundRect(ctx, 24, 12, 260, 48, 14);
    ctx.fill();
    ctx.fillStyle = "#f4f4f8";
    ctx.font = `600 26px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("Wagner · Portfólio", 44, 36);
    ctx.fillStyle = "#1f2129";
    ctx.fillRect(0, 60, w, 56);
    ctx.fillStyle = "#12141f";
    roundRect(ctx, 120, 68, w - 160, 40, 20);
    ctx.fill();
    ctx.fillStyle = "#9adcf8";
    ctx.font = `500 24px ${FONT}`;
    ctx.fillText("localhost:5173/portfolio", 144, 88);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(40 + i * 32, 88, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    // página: hero roxo com título e botão do modo game
    ctx.fillStyle = "#1a1c2c";
    ctx.fillRect(0, 116, w, h - 116);
    ctx.fillStyle = "#5d275d";
    ctx.fillRect(0, 116, w, 250);
    ctx.fillStyle = "#f8f8f8";
    ctx.font = `800 64px ${FONT}`;
    ctx.fillText("WAGNER", 60, 200);
    ctx.fillStyle = "#ffd54f";
    ctx.font = `700 30px ${FONT}`;
    ctx.fillText("DEV FULLSTACK", 60, 256);
    ctx.fillStyle = "#39ff88";
    roundRect(ctx, 60, 290, 240, 54, 12);
    ctx.fill();
    ctx.fillStyle = "#12141f";
    ctx.font = `800 26px ${FONT}`;
    ctx.fillText("▶ MODO GAME", 86, 317);
    // cards de projetos
    const cards = ["#2b4fa3", "#2e7d32", "#d83a3a", "#00b4d8"];
    cards.forEach((color, i) => {
      const x = 60 + i * 230;
      ctx.fillStyle = "#252838";
      roundRect(ctx, x, 400, 200, 140, 14);
      ctx.fill();
      ctx.fillStyle = color;
      roundRect(ctx, x + 16, 416, 168, 70, 10);
      ctx.fill();
      ctx.fillStyle = "#dbe7ff";
      roundRect(ctx, x + 16, 500, 120, 14, 6);
      ctx.fill();
    });
  });
}

/** Tela do notebook: terminal com o servidor de desenvolvimento rodando. */
export function terminalTexture() {
  return canvasTexture(1024, 640, (ctx, w, h) => {
    ctx.fillStyle = "#12141f";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1c2440";
    ctx.fillRect(0, 0, w, 56);
    ctx.fillStyle = "#dbe7ff";
    ctx.font = `600 26px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("wagner@studio: ~/portfolio", 28, 28);
    ctx.font = `500 32px ${FONT}`;
    const lines: [string, string][] = [
      ["#dbe7ff", "$ npm run dev"],
      ["#9adcf8", ""],
      ["#39ff88", "  VITE v4.3  ready in 312 ms"],
      ["#9adcf8", ""],
      ["#dbe7ff", "  ➜  Local:   http://localhost:5173/"],
      ["#dbe7ff", "  ➜  Network: use --host to expose"],
      ["#9adcf8", ""],
      ["#dbe7ff", "$ git push origin main"],
      ["#ffe74c", "  main -> main  ✔"],
      ["#9adcf8", ""],
      ["#ff2fd6", "$ npm run build"],
      ["#39ff88", "  ✓ built in 1.84s"],
    ];
    lines.forEach(([color, text], i) => {
      ctx.fillStyle = color;
      ctx.fillText(text, 28, 100 + i * 42);
    });
    ctx.fillStyle = "#dbe7ff";
    ctx.fillText("$", 28, 100 + lines.length * 42);
    ctx.fillRect(60, 100 + lines.length * 42 - 16, 16, 32); // cursor
  });
}

/** TV do cantinho gamer: batalha de um RPG de espadas estilo 16 bits. */
export function tvScreenTexture() {
  return canvasTexture(1024, 576, (ctx, w, h) => {
    const boxY = 400; // topo da caixa de comandos
    // mensagem no alto
    ctx.fillStyle = "#12141f";
    ctx.fillRect(0, 0, w, 56);
    ctx.fillStyle = "#f8f8f8";
    ctx.font = `700 30px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("Um Slime Rei apareceu!", 28, 28);
    // céu noturno com estrelas e lua, montanhas e campo
    ctx.fillStyle = "#2b2f6b";
    ctx.fillRect(0, 56, w, boxY - 56);
    ctx.fillStyle = "#f8f8f8";
    [[80, 90], [220, 130], [400, 80], [640, 120], [760, 70], [960, 150], [520, 160]].forEach(([x, y]) =>
      ctx.fillRect(x, y, 6, 6)
    );
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.arc(900, 110, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1a1c2c";
    [[0, 180, 360], [300, 500, 700], [640, 860, 1024]].forEach(([a, peak, b]) => {
      ctx.beginPath();
      ctx.moveTo(a, 270);
      ctx.lineTo(peak, 150);
      ctx.lineTo(b, 270);
      ctx.closePath();
      ctx.fill();
    });
    ctx.fillStyle = "#2e7d32";
    ctx.fillRect(0, 262, w, boxY - 262);
    ctx.fillStyle = "#3f9a3f";
    [[40, 300, 120], [260, 370, 90], [520, 340, 140], [820, 380, 110]].forEach(([x, y, len]) =>
      ctx.fillRect(x, y, len, 8)
    );

    // Slime Rei: blob verde com coroa, olhos bravos e boca
    ctx.fillStyle = "#1b7a3f";
    ctx.beginPath();
    ctx.ellipse(330, 318, 122, 86, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#39ff88";
    ctx.beginPath();
    ctx.ellipse(330, 318, 108, 74, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#b8ffd6";
    ctx.beginPath();
    ctx.ellipse(288, 278, 22, 14, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1a1c2c";
    [300, 360].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, 308, 13, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillRect(312, 342, 36, 10);
    ctx.strokeStyle = "#1a1c2c";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(282, 276);
    ctx.lineTo(312, 290);
    ctx.moveTo(378, 276);
    ctx.lineTo(348, 290);
    ctx.stroke();
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.moveTo(292, 248);
    ctx.lineTo(292, 208);
    ctx.lineTo(316, 230);
    ctx.lineTo(330, 196);
    ctx.lineTo(344, 230);
    ctx.lineTo(368, 208);
    ctx.lineTo(368, 248);
    ctx.closePath();
    ctx.fill();
    // golpe e dano
    ctx.strokeStyle = "#f8f8f8";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(420, 300, 90, 1.15 * Math.PI, 1.75 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#ffd54f";
    ctx.font = `800 54px ${FONT}`;
    ctx.fillText("-42", 440, 230);

    // cavaleiro: elmo com pluma, túnica azul, escudo vermelho e espada erguida
    ctx.fillStyle = "#d83a3a";
    ctx.fillRect(690, 150, 14, 44);
    ctx.fillStyle = "#cfd3dc";
    roundRect(ctx, 650, 180, 90, 80, 20);
    ctx.fill();
    ctx.fillStyle = "#1a1c2c";
    ctx.fillRect(650, 214, 62, 14);
    ctx.fillStyle = "#2b4fa3";
    ctx.fillRect(655, 260, 80, 80);
    ctx.fillStyle = "#5c3b1e";
    ctx.fillRect(655, 302, 80, 12);
    ctx.fillStyle = "#3a2416";
    ctx.fillRect(660, 340, 28, 40);
    ctx.fillRect(702, 340, 28, 40);
    ctx.fillStyle = "#1a1c2c";
    ctx.fillRect(654, 376, 38, 14);
    ctx.fillRect(698, 376, 38, 14);
    ctx.fillStyle = "#d83a3a";
    roundRect(ctx, 728, 250, 62, 84, 16);
    ctx.fill();
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(754, 258, 10, 68);
    ctx.fillRect(738, 284, 42, 10);
    // espada apontada para o slime
    ctx.strokeStyle = "#e6e9ef";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(636, 286);
    ctx.lineTo(520, 170);
    ctx.stroke();
    ctx.strokeStyle = "#9ea3ad";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(636, 286);
    ctx.lineTo(520, 170);
    ctx.stroke();
    ctx.strokeStyle = "#ffd54f";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(616, 306);
    ctx.lineTo(656, 266);
    ctx.stroke();
    ctx.strokeStyle = "#5c3b1e";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(640, 290);
    ctx.lineTo(664, 314);
    ctx.stroke();
    ctx.fillStyle = "#d9a274";
    ctx.beginPath();
    ctx.arc(652, 302, 12, 0, Math.PI * 2);
    ctx.fill();

    // caixa de comandos e status
    ctx.fillStyle = "#12141f";
    ctx.fillRect(0, boxY, w, h - boxY);
    ctx.strokeStyle = "#f8f8f8";
    ctx.lineWidth = 6;
    ctx.strokeRect(16, boxY + 12, 420, h - boxY - 28);
    ctx.strokeRect(452, boxY + 12, 556, h - boxY - 28);
    ctx.fillStyle = "#f8f8f8";
    ctx.font = `700 30px ${FONT}`;
    ["Atacar", "Magia", "Item", "Fugir"].forEach((label, i) => {
      ctx.fillText(label, 76, boxY + 42 + i * 34);
    });
    ctx.fillStyle = "#ffd54f";
    ctx.fillText("▶", 40, boxY + 42);
    ctx.fillStyle = "#f8f8f8";
    ctx.fillText("WAGNER", 480, boxY + 42);
    ctx.fillStyle = "#9adcf8";
    ctx.fillText("LV 7", 640, boxY + 42);
    const bar = (label: string, y: number, ratio: number, color: string) => {
      ctx.fillStyle = "#f8f8f8";
      ctx.fillText(label, 480, y);
      ctx.fillStyle = "#3f4353";
      ctx.fillRect(660, y - 11, 320, 22);
      ctx.fillStyle = color;
      ctx.fillRect(660, y - 11, 320 * ratio, 22);
    };
    bar("HP  87/120", boxY + 90, 87 / 120, "#39ff88");
    bar("MP  30/45", boxY + 134, 30 / 45, "#2f80ff");
  });
}

/** Quadro branco com um diagrama rabiscado. */
export function whiteboardTexture() {
  return canvasTexture(1024, 640, (ctx, w, h) => {
    ctx.fillStyle = "#fbfbfb";
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    const box = (x: number, y: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      roundRect(ctx, x, y, 220, 110, 18);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = `700 40px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x + 110, y + 55);
    };
    box(90, 120, "#2b4fa3", "React");
    box(400, 120, "#d83a3a", "API");
    box(710, 120, "#2e7d32", "Banco");
    ctx.strokeStyle = "#333";
    [[310, 400], [620, 710]].forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a, 175);
      ctx.lineTo(b, 175);
      ctx.moveTo(b - 25, 155);
      ctx.lineTo(b, 175);
      ctx.lineTo(b - 25, 195);
      ctx.stroke();
    });
    ctx.fillStyle = "#5d275d";
    ctx.font = `700 44px ${FONT}`;
    ctx.textAlign = "left";
    ctx.fillText("TODO:", 90, 330);
    ctx.font = `500 38px ${FONT}`;
    ctx.fillStyle = "#333";
    ["☑ portfólio em 3D", "☐ próximo projeto", "☐ mais café"].forEach((line, i) => {
      ctx.fillText(line, 110, 400 + i * 62);
    });
  });
}

/** Pôster roxo estilo arcade. */
export function posterTexture() {
  return canvasTexture(600, 800, (ctx, w, h) => {
    ctx.fillStyle = "#5d275d";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.arc(300, 300, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5d275d";
    ctx.beginPath();
    ctx.arc(250, 270, 22, 0, Math.PI * 2);
    ctx.arc(350, 270, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#5d275d";
    ctx.beginPath();
    ctx.arc(300, 320, 70, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#f8f8f8";
    ctx.font = `800 64px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PLAYER 1", 300, 560);
    ctx.fillStyle = "#39ff88";
    ctx.fillText("READY", 300, 650);
  });
}

/** Rosto do personagem (sem barba), mapeado na esfera da cabeça (centro do canvas = frente). */
export function faceTexture() {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    const cx = 512;
    const eyeY = 258;
    ctx.fillStyle = "#d9a274";
    ctx.fillRect(0, 0, w, h);

    // bochechas
    ctx.fillStyle = "rgba(220, 120, 110, 0.22)";
    [424, 600].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, 312, 34, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    // boca sorrindo
    ctx.strokeStyle = "#d98a7a";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, 322, 34, 0.18 * Math.PI, 0.82 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#fff5f0";
    ctx.beginPath();
    ctx.arc(cx, 322, 30, 0.22 * Math.PI, 0.78 * Math.PI);
    ctx.lineTo(cx + 22, 338);
    ctx.lineTo(cx - 22, 338);
    ctx.closePath();
    ctx.fill();
    // nariz pequeno
    ctx.fillStyle = "#c48a5e";
    ctx.beginPath();
    ctx.moveTo(cx, 272);
    ctx.lineTo(cx - 10, 294);
    ctx.lineTo(cx + 10, 294);
    ctx.closePath();
    ctx.fill();
    // sobrancelhas finas
    ctx.strokeStyle = "#6b3f27";
    ctx.lineWidth = 8;
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x - 34, 210);
      ctx.quadraticCurveTo(x, 194, x + 34, 210);
      ctx.stroke();
    });
    // óculos de armação fina
    ctx.strokeStyle = "#2f3340";
    ctx.lineWidth = 6;
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    [452, 572].forEach((x) => {
      roundRect(ctx, x - 50, eyeY - 34, 100, 68, 26);
      ctx.fill();
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(502, eyeY - 8);
    ctx.lineTo(522, eyeY - 8);
    ctx.moveTo(402, eyeY - 10);
    ctx.lineTo(300, eyeY - 18);
    ctx.moveTo(622, eyeY - 10);
    ctx.lineTo(724, eyeY - 18);
    ctx.stroke();
    // olhos grandes com brilho
    ctx.fillStyle = "#ffffff";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, eyeY + 2, 22, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#3a2416";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + 4, eyeY + 4, 13, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#1a1c2c";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + 5, eyeY + 5, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#ffffff";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + 9, eyeY - 2, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

export const SHIRT_COLOR = "#3178c6";

/** Camiseta azul lisa com a silhueta de um violão em azul escuro (centro = frente). */
export function outfitTexture() {
  const print = "#1b4784";
  return canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = SHIRT_COLOR;
    ctx.fillRect(0, 0, w, h);
    // gola
    ctx.strokeStyle = print;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(512, -14, 56, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
    // violão inclinado, só silhueta
    ctx.save();
    ctx.translate(512, 290);
    ctx.rotate(-0.35);
    ctx.fillStyle = print;
    ctx.beginPath();
    ctx.ellipse(0, 40, 50, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -18, 38, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-8, -180, 16, 180);
    roundRect(ctx, -14, -216, 28, 44, 7);
    ctx.fill();
    ctx.restore();
  });
}
