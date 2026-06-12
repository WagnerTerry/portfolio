import { useEffect, useRef, useState } from "react";

import Curriculum from "../data/curriculo do Wagner.pdf";
import {
  TILE,
  bakeSprite,
  CHEST,
  MAILBOX,
  PLAYER_DOWN_STAND,
  PLAYER_DOWN_WALK,
  PLAYER_SIDE_STAND,
  PLAYER_SIDE_WALK,
  PLAYER_UP_STAND,
  PLAYER_UP_WALK,
  SIGN,
  TREE,
} from "./pixelart";
import {
  Interaction,
  INTERACTIONS,
  MAP,
  MAP_H,
  MAP_W,
  PLAYER_START,
  WALKABLE,
} from "./world";

import "./GameMode.scss";

type Direction = "down" | "up" | "left" | "right";

type GameModeProps = {
  onExit: () => void;
};

const SPEED = 72; // pixels por segundo
const DIRECTION_KEYS: Record<string, Direction> = {
  ArrowDown: "down",
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowRight: "right",
  s: "down",
  w: "up",
  a: "left",
  d: "right",
};

const hash = (x: number, y: number) =>
  Math.abs(((x * 73856093) ^ (y * 19349663)) % 997);

export function GameMode({ onExit }: GameModeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const [dialog, setDialog] = useState<Interaction | null>(null);
  const [typedCount, setTypedCount] = useState(0);

  const dialogRef = useRef<Interaction | null>(null);
  dialogRef.current = dialog;
  const startedRef = useRef(false);
  startedRef.current = started;
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  // teclas viradas "estado" para o loop (também usadas pelo d-pad mobile)
  const keysRef = useRef<Partial<Record<Direction, boolean>>>({});
  const interactRef = useRef<() => void>(() => undefined);

  const dialogText = dialog ? dialog.lines.join("\n") : "";
  const typingDone = typedCount >= dialogText.length;

  // efeito máquina de escrever do diálogo
  useEffect(() => {
    setTypedCount(0);
    if (!dialog) return;
    const interval = setInterval(() => {
      setTypedCount((count) => {
        if (count >= dialog.lines.join("\n").length) {
          clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, 18);
    return () => clearInterval(interval);
  }, [dialog]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    // ---------- sprites pré-renderizados ----------
    const sprites = {
      tree: bakeSprite(TREE),
      sign: bakeSprite(SIGN),
      signGithub: bakeSprite(SIGN, {
        palette: { o: "#444a57", O: "#f8f8f8" },
      }),
      signLinkedin: bakeSprite(SIGN, {
        palette: { o: "#0a66c2", O: "#f8f8f8" },
      }),
      chest: bakeSprite(CHEST),
      mailbox: bakeSprite(MAILBOX),
      player: {
        down: [
          bakeSprite(PLAYER_DOWN_STAND),
          bakeSprite(PLAYER_DOWN_WALK),
          bakeSprite(PLAYER_DOWN_WALK, { flip: true }),
        ],
        up: [
          bakeSprite(PLAYER_UP_STAND),
          bakeSprite(PLAYER_UP_WALK),
          bakeSprite(PLAYER_UP_WALK, { flip: true }),
        ],
        left: [
          bakeSprite(PLAYER_SIDE_STAND),
          bakeSprite(PLAYER_SIDE_WALK),
          bakeSprite(PLAYER_SIDE_WALK),
        ],
        right: [
          bakeSprite(PLAYER_SIDE_STAND, { flip: true }),
          bakeSprite(PLAYER_SIDE_WALK, { flip: true }),
          bakeSprite(PLAYER_SIDE_WALK, { flip: true }),
        ],
      } as Record<Direction, HTMLCanvasElement[]>,
    };

    // ---------- cenário estático pré-renderizado ----------
    const drawGrass = (g: CanvasRenderingContext2D, x: number, y: number) => {
      const px = x * TILE;
      const py = y * TILE;
      g.fillStyle = hash(x, y) % 2 === 0 ? "#8fce4f" : "#85c447";
      g.fillRect(px, py, TILE, TILE);
      g.fillStyle = "#7ab53d";
      for (let i = 0; i < 4; i++) {
        const sx = px + (hash(x * 4 + i, y) % 14) + 1;
        const sy = py + (hash(x, y * 4 + i) % 14) + 1;
        g.fillRect(sx, sy, 1, 2);
      }
    };

    const drawTallGrass = (
      g: CanvasRenderingContext2D,
      x: number,
      y: number
    ) => {
      const px = x * TILE;
      const py = y * TILE;
      g.fillStyle = "#4f8f2f";
      for (let i = 0; i < 5; i++) {
        const sx = px + 1 + i * 3;
        const sway = hash(x + i, y) % 2;
        g.fillRect(sx + sway, py + 6, 2, 9);
        g.fillRect(sx + sway - 1, py + 9, 1, 6);
      }
      g.fillStyle = "#3e7325";
      for (let i = 0; i < 4; i++) {
        g.fillRect(px + 3 + i * 3, py + 10, 1, 5);
      }
    };

    const drawPath = (g: CanvasRenderingContext2D, x: number, y: number) => {
      const px = x * TILE;
      const py = y * TILE;
      g.fillStyle = "#d8b878";
      g.fillRect(px, py, TILE, TILE);
      g.fillStyle = "#c4a261";
      for (let i = 0; i < 5; i++) {
        const sx = px + (hash(x * 3 + i, y + 7) % 13) + 1;
        const sy = py + (hash(x + 7, y * 3 + i) % 13) + 1;
        g.fillRect(sx, sy, 2, 1);
      }
    };

    const drawFlowers = (g: CanvasRenderingContext2D, x: number, y: number) => {
      const px = x * TILE;
      const py = y * TILE;
      const colors = ["#e85d75", "#f8d847", "#f8f8f8"];
      const color = colors[hash(x, y) % colors.length];
      [
        [4, 4],
        [11, 7],
        [6, 11],
      ].forEach(([fx, fy], i) => {
        g.fillStyle = colors[(hash(x + i, y + i) + i) % colors.length] || color;
        g.fillRect(px + fx - 1, py + fy, 3, 1);
        g.fillRect(px + fx, py + fy - 1, 1, 3);
        g.fillStyle = "#f8a830";
        g.fillRect(px + fx, py + fy, 1, 1);
      });
    };

    const drawHouse = (g: CanvasRenderingContext2D) => {
      // casa ocupa os tiles "H"/"D": colunas 9-14, linhas 2-5
      const px = 9 * TILE;
      const py = 2 * TILE;
      const w = 6 * TILE;
      // telhado (2 tiles de altura)
      g.fillStyle = "#c0392b";
      g.fillRect(px - 4, py, w + 8, TILE * 2);
      g.fillStyle = "#a93226";
      for (let i = 0; i < 4; i++) {
        g.fillRect(px - 4, py + 6 + i * 7, w + 8, 2);
      }
      g.fillStyle = "#1a1c2c";
      g.fillRect(px - 4, py, w + 8, 2);
      g.fillRect(px - 4, py + TILE * 2 - 2, w + 8, 2);
      // paredes (2 tiles de altura)
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
      // porta (no tile D: coluna 11, linha 5)
      const dx = 11 * TILE;
      const dy = 5 * TILE;
      g.fillStyle = "#1a1c2c";
      g.fillRect(dx + 1, dy - 6, TILE - 2, TILE + 6);
      g.fillStyle = "#8a5a30";
      g.fillRect(dx + 3, dy - 4, TILE - 6, TILE + 4);
      g.fillStyle = "#ffd54f";
      g.fillRect(dx + TILE - 6, dy + 6, 2, 2);
    };

    const world = document.createElement("canvas");
    world.width = MAP_W * TILE;
    world.height = MAP_H * TILE;
    const wg = world.getContext("2d")!;

    const waterTiles: { x: number; y: number }[] = [];
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        drawGrass(wg, x, y);
        const tile = MAP[y][x];
        if (tile === "=") drawPath(wg, x, y);
        if (tile === ",") drawTallGrass(wg, x, y);
        if (tile === "f") drawFlowers(wg, x, y);
        if (tile === "~") waterTiles.push({ x, y });
      }
    }
    drawHouse(wg);
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const tile = MAP[y][x];
        const px = x * TILE;
        const py = y * TILE;
        if (tile === "#") wg.drawImage(sprites.tree, px, py);
        if (tile === "s") wg.drawImage(sprites.sign, px, py);
        if (tile === "g") wg.drawImage(sprites.signGithub, px, py);
        if (tile === "l") wg.drawImage(sprites.signLinkedin, px, py);
        if (tile === "c") wg.drawImage(sprites.chest, px, py);
        if (tile === "m") wg.drawImage(sprites.mailbox, px, py);
      }
    }

    // ---------- estado do jogador ----------
    const player = {
      tx: PLAYER_START.x,
      ty: PLAYER_START.y,
      px: PLAYER_START.x * TILE,
      py: PLAYER_START.y * TILE,
      dir: "down" as Direction,
      moving: false,
      targetX: PLAYER_START.x,
      targetY: PLAYER_START.y,
      walkTimer: 0,
    };

    const facingTile = () => {
      const delta: Record<Direction, [number, number]> = {
        down: [0, 1],
        up: [0, -1],
        left: [-1, 0],
        right: [1, 0],
      };
      const [dx, dy] = delta[player.dir];
      return { x: player.tx + dx, y: player.ty + dy };
    };

    interactRef.current = () => {
      const { x, y } = facingTile();
      const interaction = INTERACTIONS[`${x},${y}`];
      if (interaction) {
        // baú do currículo: link vem do import do PDF
        if (`${x},${y}` === "9,13") {
          setDialog({
            ...interaction,
            links: [
              {
                label: "Baixar Currículo",
                url: Curriculum,
                download: "Currículo do Wagner",
              },
            ],
          });
        } else {
          setDialog(interaction);
        }
      }
    };

    // ---------- loop ----------
    let raf = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += dt;

      const paused = !startedRef.current || dialogRef.current !== null;

      // movimento em grade, estilo Pokémon
      if (!paused && !player.moving) {
        const pressed = (Object.keys(keysRef.current) as Direction[]).find(
          (direction) => keysRef.current[direction]
        );
        if (pressed) {
          player.dir = pressed;
          const { x, y } = facingTile();
          if (WALKABLE(x, y)) {
            player.targetX = x;
            player.targetY = y;
            player.moving = true;
          }
        }
      }

      if (player.moving) {
        player.walkTimer += dt;
        const step = SPEED * dt;
        const gx = player.targetX * TILE;
        const gy = player.targetY * TILE;
        player.px += Math.sign(gx - player.px) * Math.min(step, Math.abs(gx - player.px));
        player.py += Math.sign(gy - player.py) * Math.min(step, Math.abs(gy - player.py));
        if (player.px === gx && player.py === gy) {
          player.tx = player.targetX;
          player.ty = player.targetY;
          player.moving = false;
        }
      } else {
        player.walkTimer = 0;
      }

      // ---------- desenho ----------
      ctx.drawImage(world, 0, 0);

      // água animada
      waterTiles.forEach(({ x, y }) => {
        const px = x * TILE;
        const py = y * TILE;
        ctx.fillStyle = "#3a7bd5";
        ctx.fillRect(px, py, TILE, TILE);
        ctx.fillStyle = "#5fa8e8";
        const phase = Math.floor(elapsed * 2 + (x + y)) % 2;
        ctx.fillRect(px + 2 + phase * 4, py + 4, 6, 1);
        ctx.fillRect(px + 6 - phase * 3, py + 11, 6, 1);
      });

      // jogador (frame de animação: parado, passo A, passo B)
      const frames = sprites.player[player.dir];
      const frameIndex = player.moving
        ? [1, 0, 2, 0][Math.floor(player.walkTimer / 0.12) % 4]
        : 0;
      ctx.drawImage(frames[frameIndex], Math.round(player.px), Math.round(player.py) - 2);

      // grama alta cobre os pés do jogador
      if (MAP[player.ty][player.tx] === ",") {
        drawTallGrass(ctx, player.tx, player.ty);
      }

      // balão "!" sobre o objeto interativo à frente
      if (!paused) {
        const { x, y } = facingTile();
        if (INTERACTIONS[`${x},${y}`]) {
          const bob = Math.floor(elapsed * 4) % 2;
          const bx = x * TILE + 4;
          const by = y * TILE - 10 + bob;
          ctx.fillStyle = "#1a1c2c";
          ctx.fillRect(bx - 1, by - 1, 10, 10);
          ctx.fillStyle = "#f8f8f8";
          ctx.fillRect(bx, by, 8, 8);
          ctx.fillStyle = "#1a1c2c";
          ctx.fillRect(bx + 3, by + 1, 2, 4);
          ctx.fillRect(bx + 3, by + 6, 2, 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ---------- teclado ----------
    const directionFromEvent = (event: KeyboardEvent) =>
      DIRECTION_KEYS[event.key] ?? DIRECTION_KEYS[event.key.toLowerCase()];

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = directionFromEvent(event);
      if (direction) {
        event.preventDefault();
        keysRef.current[direction] = true;
        return;
      }
      if (event.key === "Escape") {
        if (dialogRef.current) setDialog(null);
        else onExitRef.current();
        return;
      }
      if ([" ", "Enter", "e", "E"].includes(event.key) && !event.repeat) {
        event.preventDefault();
        if (!startedRef.current) {
          setStarted(true);
        } else if (dialogRef.current) {
          setDialog(null);
        } else {
          interactRef.current();
        }
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const direction = directionFromEvent(event);
      if (direction) keysRef.current[direction] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const pressDirection = (direction: Direction, pressed: boolean) => {
    keysRef.current[direction] = pressed;
  };

  return (
    <div className="game-mode">
      <div className="game-topbar">
        <span className="game-title">WAGNER QUEST</span>
        <button className="game-exit" onClick={onExit}>
          ✕ Sair
        </button>
      </div>

      <div className="game-screen">
        <canvas
          ref={canvasRef}
          width={MAP_W * TILE}
          height={MAP_H * TILE}
        />

        {!started && (
          <div className="game-start" onClick={() => setStarted(true)}>
            <h1>WAGNER QUEST</h1>
            <p>Um portfólio jogável</p>
            <span className="blink">PRESS START</span>
            <small>
              Setas / WASD para andar • E, Espaço ou Enter para interagir
            </small>
          </div>
        )}

        {dialog && (
          <div className="game-dialog">
            <strong>{dialog.title}</strong>
            <p>
              {dialogText.slice(0, typedCount)}
              {!typingDone && <span className="cursor">▌</span>}
            </p>
            {typingDone && (
              <div className="game-dialog-actions">
                {dialog.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    download={link.download}
                  >
                    {link.label} ▶
                  </a>
                ))}
                <button onClick={() => setDialog(null)}>Fechar ✕</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="game-hint">
        Setas/WASD: andar • E/Espaço: interagir • Esc: sair
      </div>

      <div className="game-touch">
        <div className="dpad">
          {(
            [
              ["up", "▲"],
              ["left", "◀"],
              ["right", "▶"],
              ["down", "▼"],
            ] as [Direction, string][]
          ).map(([direction, arrow]) => (
            <button
              key={direction}
              className={`dpad-${direction}`}
              onPointerDown={(e) => {
                e.preventDefault();
                pressDirection(direction, true);
              }}
              onPointerUp={() => pressDirection(direction, false)}
              onPointerLeave={() => pressDirection(direction, false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              {arrow}
            </button>
          ))}
        </div>
        <button
          className="btn-a"
          onPointerDown={(e) => {
            e.preventDefault();
            if (!started) setStarted(true);
            else if (dialog) setDialog(null);
            else interactRef.current();
          }}
        >
          A
        </button>
      </div>
    </div>
  );
}
