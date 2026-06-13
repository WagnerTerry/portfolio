import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";

import { Interaction } from "./world";

type GameModeProps = {
  onExit: () => void;
};

type Direction = "down" | "up" | "left" | "right";

export function GameMode({ onExit }: GameModeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [started, setStarted] = useState(false);
  const [dialog, setDialog] = useState<Interaction | null>(null);
  const [typedCount, setTypedCount] = useState(0);

  const startedRef = useRef(false);
  startedRef.current = started;
  const dialogRef = useRef<Interaction | null>(null);
  dialogRef.current = dialog;
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const dialogText = dialog ? dialog.lines.join("\n") : "";
  const typingDone = typedCount >= dialogText.length;

  // O jogo fica pausado enquanto a tela de start ou um diálogo estiverem abertos
  const syncPaused = () => {
    gameRef.current?.registry.set(
      "dialogOpen",
      !startedRef.current || dialogRef.current !== null
    );
  };

  const closeDialog = () => {
    setDialog(null);
    dialogRef.current = null;
    syncPaused();
  };

  const start = () => {
    setStarted(true);
    startedRef.current = true;
    syncPaused();
  };

  // efeito máquina de escrever do diálogo
  useEffect(() => {
    setTypedCount(0);
    if (!dialog) return;
    const total = dialog.lines.join("\n").length;
    const interval = setInterval(() => {
      setTypedCount((count) => {
        if (count >= total) {
          clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, 18);
    return () => clearInterval(interval);
  }, [dialog]);

  useEffect(() => {
    let disposed = false;

    // Phaser é pesado: carrega sob demanda, só quando o modo game abre
    import("./phaser/createGame").then(({ createGame }) => {
      if (disposed || !containerRef.current) return;
      const game = createGame(containerRef.current);
      gameRef.current = game;
      game.registry.set("dialogOpen", true); // pausado até o PRESS START
      game.events.on("dialog", (interaction: Interaction) => {
        setDialog(interaction);
        dialogRef.current = interaction;
        syncPaused();
      });
      if (import.meta.env.DEV) {
        (window as unknown as { __game?: Phaser.Game }).__game = game;
      }
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (dialogRef.current) closeDialog();
        else onExitRef.current();
        return;
      }
      if (!startedRef.current && [" ", "Enter", "e", "E"].includes(event.key)) {
        start();
        return;
      }
      // fecha o diálogo com as mesmas teclas de interação
      if (dialogRef.current && [" ", "Enter", "e", "E"].includes(event.key) && !event.repeat) {
        event.preventDefault();
        closeDialog();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKeyDown);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pressDirection = (direction: Direction, pressed: boolean) => {
    gameRef.current?.events.emit("vkey", direction, pressed);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-3 bg-game-dark font-press-start">
      <div
        className="relative aspect-[4/3] border-[6px] border-game-purple outline outline-[4px] outline-black shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-black overflow-hidden"
        style={{ width: 'min(92vw, calc(76vh * 4 / 3))' }}
      >
        <div className="game-phaser absolute inset-0" ref={containerRef} />

        {!started && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center bg-[rgba(26,28,44,0.92)] text-white cursor-pointer p-4 z-10"
            onClick={start}
          >
            <h1 className="text-[clamp(18px,4vw,32px)] text-game-yellow [text-shadow:3px_3px_0_#d83a3a] m-0">
              WAGNER QUEST
            </h1>
            <p className="text-[clamp(8px,1.6vw,12px)] m-0">Um portfólio jogável</p>
            <span className="text-[clamp(10px,2vw,16px)] animate-game-blink">PRESS START</span>
            <small className="text-[clamp(7px,1.2vw,9px)] text-game-cyan leading-[1.8]">
              Setas/WASD para andar • E, Espaço ou Enter para interagir •
              Entre nas portas para visitar GitHub e LinkedIn
            </small>
          </div>
        )}

        {dialog && (
          <div className="absolute left-[3%] right-[3%] bottom-[3%] bg-[#f8f8f8] border-[4px] border-game-dark shadow-[0_0_0_3px_#f8f8f8,4px_6px_0_3px_rgba(0,0,0,0.5)] px-4 py-3 text-game-dark z-10">
            <strong className="block text-[clamp(9px,1.6vw,13px)] text-game-red mb-2">
              {dialog.title}
            </strong>
            <p className="m-0 text-[clamp(8px,1.4vw,11px)] leading-[1.9] whitespace-pre-line min-h-[3em]">
              {dialogText.slice(0, typedCount)}
              {!typingDone && <span className="animate-game-cursor">▌</span>}
            </p>
            {typingDone && (
              <div className="flex flex-wrap gap-[10px] mt-[10px]">
                {dialog.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    download={link.download}
                    className="font-inherit text-[clamp(8px,1.3vw,10px)] no-underline text-white bg-game-blue border-[3px] border-game-dark shadow-[2px_2px_0_#1a1c2c] px-[10px] py-[8px] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    {link.label} ▶
                  </a>
                ))}
                <button
                  onClick={closeDialog}
                  className="font-inherit text-[clamp(8px,1.3vw,10px)] text-white bg-game-brown border-[3px] border-game-dark shadow-[2px_2px_0_#1a1c2c] px-[10px] py-[8px] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Fechar ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        className="absolute top-4 right-4 font-inherit text-[10px] text-white bg-game-red border-[3px] border-black shadow-[3px_3px_0_#000] px-[14px] py-[10px] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#000]"
        onClick={onExit}
      >
        ✕ Sair
      </button>

      <div className="text-game-cyan text-[9px] text-center touch:hidden">
        Setas/WASD: andar • E/Espaço: interagir • Esc: sair
      </div>

      <div className="hidden touch:flex touch:items-center touch:justify-between touch:w-[min(92vw,520px)] touch:select-none">
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(3, 48px)', gridTemplateRows: 'repeat(3, 48px)' }}
        >
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
              className={`font-inherit text-[14px] text-white bg-game-purple border-[3px] border-black shadow-[3px_3px_0_#000] cursor-pointer touch-none active:bg-game-purple-light ${
                direction === 'up' ? '[grid-area:1/2]' :
                direction === 'left' ? '[grid-area:2/1]' :
                direction === 'right' ? '[grid-area:2/3]' :
                '[grid-area:3/2]'
              }`}
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
          className="w-16 h-16 rounded-full font-inherit text-[18px] text-white bg-game-red border-[3px] border-black shadow-[3px_3px_0_#000] cursor-pointer touch-none active:bg-game-purple-light"
          onPointerDown={(e) => {
            e.preventDefault();
            if (!startedRef.current) start();
            else if (dialogRef.current) closeDialog();
            else gameRef.current?.events.emit("vinteract");
          }}
        >
          A
        </button>
      </div>
    </div>
  );
}
