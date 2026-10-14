// Texturas desenhadas em canvas: placas, telas (monitores, notebook, TV com o minigame), janela de
// dia e de noite, letreiro neon, relógio, partículas, quadro branco, pôster, rosto e camiseta.

import * as THREE from "three";

import { BattleView, COMMANDS, HERO_MAX_HP, HERO_MAX_MP, MAGIC_COST, SLIME_MAX_HP } from "../battle";

const FONT = "Ubuntu, 'Segoe UI', system-ui, sans-serif";

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function wrapTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, width, height);
  return wrapTexture(canvas);
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

/** Vista da janela: dia com sol e nuvens ou noite com lua e estrelas. */
export function windowTexture(night: boolean) {
  return canvasTexture(1000, 520, (ctx, w, h) => {
    if (night) {
      ctx.fillStyle = "#0b1030";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#f8f8f8";
      const stars = [
        [60, 70, 3], [160, 150, 2], [240, 40, 2], [330, 110, 3], [420, 60, 2], [500, 180, 2], [580, 90, 3],
        [660, 200, 2], [720, 40, 2], [900, 230, 3], [950, 80, 2], [120, 260, 2], [380, 250, 2], [840, 140, 2],
      ];
      stars.forEach(([x, y, r]) => ctx.fillRect(x, y, r * 2, r * 2));
      ctx.fillStyle = "#f4f1d8";
      ctx.beginPath();
      ctx.arc(780, 130, 62, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#d9d5b8";
      [[760, 110, 12], [800, 150, 9], [775, 160, 6]].forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#101d1a";
    } else {
      ctx.fillStyle = "#8fd3ff";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ffe74c";
      ctx.beginPath();
      ctx.arc(800, 120, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      [[120, 120], [430, 70], [620, 190]].forEach(([x, y]) => {
        roundRect(ctx, x, y, 190, 50, 25);
        ctx.fill();
        roundRect(ctx, x + 40, y - 34, 110, 60, 30);
        ctx.fill();
      });
      ctx.fillStyle = "#3f9a3f";
    }
    // colinas ao fundo
    [[150, 170], [520, 230], [880, 200]].forEach(([x, r]) => {
      ctx.beginPath();
      ctx.arc(x, h + 40, r, Math.PI, 0);
      ctx.fill();
    });
    ctx.fillStyle = night ? "#0c1613" : "#2e7d32";
    ctx.fillRect(0, h - 60, w, 60);
  });
}

/** Letreiro neon "WAGNER.EXE": apagado (tubos cinza) ou aceso (ciano com brilho). Fundo transparente. */
export function neonTexture(on: boolean) {
  return canvasTexture(1024, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.font = `800 128px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (on) {
      ctx.shadowColor = "#00f5ff";
      ctx.shadowBlur = 48;
      ctx.fillStyle = "#00f5ff";
      ctx.fillText("WAGNER.EXE", w / 2, h / 2);
      ctx.fillText("WAGNER.EXE", w / 2, h / 2);
      ctx.shadowBlur = 0;
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#dfffff";
      ctx.strokeText("WAGNER.EXE", w / 2, h / 2);
    } else {
      ctx.fillStyle = "#2b4a55";
      ctx.fillText("WAGNER.EXE", w / 2, h / 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#3f6a78";
      ctx.strokeText("WAGNER.EXE", w / 2, h / 2);
    }
  });
}

/** Mostrador do relógio de parede (os ponteiros são 3D). Fundo transparente fora do círculo. */
export function clockFaceTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const c = w / 2;
    ctx.fillStyle = "#f8f8f8";
    ctx.beginPath();
    ctx.arc(c, c, 236, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2f3340";
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.lineCap = "round";
    for (let i = 0; i < 60; i++) {
      const major = i % 5 === 0;
      const angle = (i / 60) * Math.PI * 2;
      const r0 = major ? 190 : 206;
      ctx.lineWidth = major ? 10 : 4;
      ctx.beginPath();
      ctx.moveTo(c + Math.sin(angle) * r0, c - Math.cos(angle) * r0);
      ctx.lineTo(c + Math.sin(angle) * 218, c - Math.cos(angle) * 218);
      ctx.stroke();
    }
    ctx.fillStyle = "#5d275d";
    ctx.beginPath();
    ctx.arc(c, c, 14, 0, Math.PI * 2);
    ctx.fill();
  });
}

/** Nota musical branca com contorno, para tingir pela cor do material. */
export function noteTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.font = `800 108px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#1a1c2c";
    ctx.strokeText("♪", w / 2, h / 2 + 6);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("♪", w / 2, h / 2 + 6);
  });
}

/** Bolinha macia (gradiente radial) para vapor e brilhos. */
export function softDotTexture() {
  return canvasTexture(64, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
}

/** Rosto do personagem (sem barba), mapeado na esfera da cabeça (centro do canvas = frente). */
export type FaceKind = "open" | "closed" | "wide";

export function faceTexture(eyes: FaceKind = "open") {
  return canvasTexture(1024, 512, (ctx, w, h) => {
    const cx = 512;
    const eyeY = 258;
    const wide = eyes === "wide";
    ctx.fillStyle = "#d9a274";
    ctx.fillRect(0, 0, w, h);

    // bochechas
    ctx.fillStyle = "rgba(220, 120, 110, 0.22)";
    [424, 600].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, 312, 34, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    if (wide) {
      // boca de susto
      ctx.fillStyle = "#7a3a3a";
      ctx.beginPath();
      ctx.ellipse(cx, 332, 16, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
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
    }
    // nariz pequeno
    ctx.fillStyle = "#c48a5e";
    ctx.beginPath();
    ctx.moveTo(cx, 272);
    ctx.lineTo(cx - 10, 294);
    ctx.lineTo(cx + 10, 294);
    ctx.closePath();
    ctx.fill();
    // sobrancelhas finas (sobem no susto)
    const browY = wide ? 196 : 210;
    ctx.strokeStyle = "#6b3f27";
    ctx.lineWidth = 8;
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x - 34, browY);
      ctx.quadraticCurveTo(x, browY - 16, x + 34, browY);
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
    if (eyes === "closed") {
      // piscando: dois arcos
      ctx.strokeStyle = "#3a2416";
      ctx.lineWidth = 7;
      [452, 572].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, eyeY - 6, 18, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();
      });
      return;
    }
    // olhos grandes com brilho (arregalados no susto)
    ctx.fillStyle = "#ffffff";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, eyeY + 2, wide ? 27 : 22, wide ? 25 : 18, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    const px = wide ? 0 : 4;
    const py = wide ? 2 : 4;
    ctx.fillStyle = "#3a2416";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + px, eyeY + py, wide ? 9 : 13, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#1a1c2c";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + px + 1, eyeY + py + 1, wide ? 5 : 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#ffffff";
    [452, 572].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x + px + 5, eyeY - 2, 4.5, 0, Math.PI * 2);
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

// ---------- batalha de RPG (TV do cantinho gamer e minigame) ----------

function drawSlime(ctx: CanvasRenderingContext2D, cx: number, bottom: number, squash: number, dead: boolean) {
  ctx.save();
  ctx.translate(cx, bottom);
  ctx.scale(1, squash);
  ctx.fillStyle = "#1b7a3f";
  ctx.beginPath();
  ctx.ellipse(0, -86, 122, 86, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#39ff88";
  ctx.beginPath();
  ctx.ellipse(0, -86, 108, 74, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#b8ffd6";
  ctx.beginPath();
  ctx.ellipse(-42, -126, 22, 14, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1a1c2c";
  ctx.fillStyle = "#1a1c2c";
  ctx.lineCap = "round";
  if (dead) {
    ctx.lineWidth = 7;
    [-30, 30].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x - 12, -108);
      ctx.lineTo(x + 12, -84);
      ctx.moveTo(x + 12, -108);
      ctx.lineTo(x - 12, -84);
      ctx.stroke();
    });
    ctx.fillRect(-14, -66, 28, 8);
  } else {
    [-30, 30].forEach((x) => {
      ctx.beginPath();
      ctx.ellipse(x, -96, 13, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillRect(-18, -62, 36, 10);
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-48, -128);
    ctx.lineTo(-18, -114);
    ctx.moveTo(48, -128);
    ctx.lineTo(18, -114);
    ctx.stroke();
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.moveTo(-38, -156);
    ctx.lineTo(-38, -196);
    ctx.lineTo(-14, -174);
    ctx.lineTo(0, -208);
    ctx.lineTo(14, -174);
    ctx.lineTo(38, -196);
    ctx.lineTo(38, -156);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawKnight(ctx: CanvasRenderingContext2D, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
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
  ctx.lineCap = "round";
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
  ctx.restore();
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, ratio: number, color: string) {
  ctx.fillStyle = "#3f4353";
  ctx.fillRect(x, y, w, 22);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * Math.max(0, Math.min(1, ratio)), 22);
}

/** Desenha a batalha (cenário, slime, cavaleiro, efeitos e caixa de comandos) no estado dado. */
export function drawBattle(ctx: CanvasRenderingContext2D, w: number, h: number, view: BattleView) {
  const boxY = 400;
  const { fx, phase } = view;
  const ended = phase === "won" || phase === "lost" || phase === "fled";
  // mensagem no alto
  ctx.fillStyle = "#12141f";
  ctx.fillRect(0, 0, w, 56);
  ctx.fillStyle = "#f8f8f8";
  ctx.font = `700 30px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(view.message, 28, 28);
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

  // Slime Rei: pula no turno dele, fica achatado quando derrotado
  const hop = fx.kind === "enemy" ? Math.sin(Math.PI * fx.t) : 0;
  const slimeX = 330 + hop * 230;
  const slimeBottom = 404 - (fx.kind === "enemy" ? Math.abs(Math.sin(Math.PI * 2 * fx.t)) * 70 : 0);
  drawSlime(ctx, slimeX, slimeBottom, phase === "won" ? 0.22 : 1, phase === "won");
  if (phase !== "won") {
    bar(ctx, slimeX - 100, 176, 200, view.slimeHp / SLIME_MAX_HP, "#d83a3a");
  }
  if (fx.kind === "magic" && fx.t < 0.55) {
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffe74c";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(300, 56);
    ctx.lineTo(350, 130);
    ctx.lineTo(306, 190);
    ctx.lineTo(348, 250);
    ctx.lineTo(330, 318);
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.globalAlpha = 0.6 * (1 - fx.t / 0.55);
    ctx.fillStyle = "#ffe74c";
    ctx.fillRect(208, 196, 244, 208);
    ctx.globalAlpha = 1;
  }

  // cavaleiro
  if (phase !== "fled") {
    drawKnight(ctx, phase === "lost" ? 0.35 : 1);
    if (fx.kind === "enemy" && fx.t > 0.42 && fx.t < 0.72) {
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = "#ff3b3b";
      ctx.fillRect(640, 140, 160, 255);
      ctx.globalAlpha = 1;
    }
  } else {
    ctx.fillStyle = "rgba(220,220,220,0.5)";
    [[690, 380, 30], [740, 372, 22], [780, 384, 16]].forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // efeitos do herói: corte, cura e números de dano
  ctx.font = `800 54px ${FONT}`;
  if (fx.kind === "slash") {
    ctx.strokeStyle = "#f8f8f8";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.globalAlpha = 1 - fx.t;
    ctx.beginPath();
    ctx.arc(420, 300, 90, 1.15 * Math.PI, 1.15 * Math.PI + 0.6 * Math.PI * Math.min(1, fx.t * 2));
    ctx.stroke();
    ctx.fillStyle = "#ffd54f";
    ctx.fillText(`-${fx.value}`, 440, 230 - fx.t * 50);
    ctx.globalAlpha = 1;
  } else if (fx.kind === "magic") {
    ctx.globalAlpha = 1 - fx.t;
    ctx.fillStyle = "#ffd54f";
    ctx.fillText(`-${fx.value}`, 440, 200 - fx.t * 50);
    ctx.globalAlpha = 1;
  } else if (fx.kind === "heal") {
    const onSlime = fx.value < 0;
    const cx = onSlime ? slimeX : 720;
    const cy = onSlime ? 300 : 280;
    ctx.globalAlpha = 1 - fx.t;
    ctx.fillStyle = "#39ff88";
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + fx.t * 1.5;
      const r = 60 + fx.t * 50;
      ctx.fillRect(cx + Math.cos(angle) * r - 4, cy + Math.sin(angle) * r - 12, 8, 24);
      ctx.fillRect(cx + Math.cos(angle) * r - 12, cy + Math.sin(angle) * r - 4, 24, 8);
    }
    ctx.fillText(`+${Math.abs(fx.value)}`, cx, 150 - fx.t * 40);
    ctx.globalAlpha = 1;
  } else if (fx.kind === "enemy" && fx.t > 0.4) {
    ctx.globalAlpha = Math.min(1, (1 - fx.t) * 2);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillText(`-${fx.value}`, 690, 130 - (fx.t - 0.4) * 60);
    ctx.globalAlpha = 1;
  }

  // caixa de comandos e status
  ctx.fillStyle = "#12141f";
  ctx.fillRect(0, boxY, w, h - boxY);
  ctx.strokeStyle = "#f8f8f8";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, boxY + 12, 420, h - boxY - 28);
  ctx.strokeRect(452, boxY + 12, 556, h - boxY - 28);
  ctx.font = `700 30px ${FONT}`;
  const items = ended ? ["Jogar de novo", "Levantar do pufe"] : COMMANDS.map((c) => (c === "Item" ? `Item (${view.potions})` : c));
  items.forEach((label, i) => {
    const disabled =
      !ended && ((i === 1 && view.heroMp < MAGIC_COST) || (i === 2 && view.potions === 0));
    ctx.fillStyle = disabled ? "#6b7080" : "#f8f8f8";
    ctx.fillText(label, 76, boxY + 42 + i * 34);
  });
  ctx.fillStyle = "#ffd54f";
  ctx.fillText("▶", 40, boxY + 42 + Math.min(view.cursor, items.length - 1) * 34);
  ctx.fillStyle = "#f8f8f8";
  ctx.fillText("WAGNER", 480, boxY + 42);
  ctx.fillStyle = "#9adcf8";
  ctx.fillText("LV 7", 640, boxY + 42);
  ctx.fillStyle = "#f8f8f8";
  ctx.fillText(`HP  ${view.heroHp}/${HERO_MAX_HP}`, 480, boxY + 90);
  bar(ctx, 680, boxY + 79, 300, view.heroHp / HERO_MAX_HP, view.heroHp < 30 ? "#d83a3a" : "#39ff88");
  ctx.fillStyle = "#f8f8f8";
  ctx.fillText(`MP  ${view.heroMp}/${HERO_MAX_MP}`, 480, boxY + 134);
  bar(ctx, 680, boxY + 123, 300, view.heroMp / HERO_MAX_MP, "#2f80ff");
}

/** Tela da TV: um canvas que redesenha a batalha sob demanda (espelho do minigame). */
export function createBattleScreen() {
  const canvas = makeCanvas(1024, 576);
  const ctx = canvas.getContext("2d");
  const texture = wrapTexture(canvas);
  return {
    texture,
    draw(view: BattleView) {
      if (ctx) drawBattle(ctx, canvas.width, canvas.height, view);
      texture.needsUpdate = true;
    },
  };
}
