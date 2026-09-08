// Texturas desenhadas em canvas: placas, tela do monitor, quadro branco e pôster.

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
