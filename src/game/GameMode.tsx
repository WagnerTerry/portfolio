import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";

import Profile from "../assets/profile.png";
import { LINKS } from "./content";

import "./GameMode.scss";

type GameModeProps = {
  onExit: () => void;
};

export function GameMode({ onExit }: GameModeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  useEffect(() => {
    let game: Phaser.Game | null = null;
    let disposed = false;

    // Phaser é pesado: carrega sob demanda, só quando o modo game abre
    import("./phaser/createGame").then(({ createGame }) => {
      if (disposed || !containerRef.current) return;
      game = createGame(containerRef.current);
      game.events.on("game-loading", (visible: boolean) => setLoading(visible));
      if (import.meta.env.DEV) {
        (window as unknown as { __game?: Phaser.Game }).__game = game;
      }
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onExitRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKeyDown);
      game?.destroy(true);
    };
  }, []);

  return (
    <div className="game-mode">
      <div className="game-phaser" ref={containerRef} />

      {loading && (
        <div className="game-loading">
          <span>CARREGANDO...</span>
        </div>
      )}

      <div className="game-ui">
        <button
          className="pic-circ"
          onClick={() => setMenuOpen((open) => !open)}
          title="Menu"
        >
          <img src={Profile} alt="Foto do Wagner" />
        </button>
        {menuOpen && (
          <nav className="game-menu">
            <a href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={LINKS.curriculum} download="Currículo do Wagner">
              Baixar Currículo
            </a>
            <button onClick={onExit}>Sair do jogo</button>
          </nav>
        )}

        <button className="game-exit" onClick={onExit}>
          ✕ Sair
        </button>

        <div className="game-hint">
          Setas/WASD ou segure o clique para andar • entre nos prédios e pise
          nos tiles roxos • Esc: sair
        </div>
      </div>
    </div>
  );
}
