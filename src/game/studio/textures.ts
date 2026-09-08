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
