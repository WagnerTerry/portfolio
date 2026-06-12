import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";

import { Interaction } from "./world";

import "./GameMode.scss";

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
    <div className="game-mode">
      <div className="game-stage">
        <div className="game-phaser" ref={containerRef} />

        {!started && (
          <div className="game-start" onClick={start}>
            <h1>WAGNER QUEST</h1>
            <p>Um portfólio jogável</p>
            <span className="blink">PRESS START</span>
            <small>
              Setas/WASD para andar • E, Espaço ou Enter para interagir •
              Entre nas portas para visitar GitHub e LinkedIn
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
                <button onClick={closeDialog}>Fechar ✕</button>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="game-exit" onClick={onExit}>
        ✕ Sair
      </button>

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
