// Modo game: o "Estúdio do Wagner" em 3D (Three.js via React Three Fiber). O personagem
// anda pela sala em 4 direções e usa a bancada (bio e currículo), o servidor (GitHub),
// o painel (LinkedIn) e a máquina de café (contato).

import { Component, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./game.css";
import { Card, CARDS, StationId, STATIONS } from "./content";
import { bindKeyboard, createInput } from "./input";
import { PlayerState } from "./studio/Player";
import { Scene } from "./studio/Scene";

type GameModeProps = {
  onExit: () => void;
};

const INTERACT_KEYS = [" ", "Enter", "e", "E"];

export function GameMode({ onExit }: GameModeProps) {
  const input = useMemo(() => createInput(), []);
  const [started, setStarted] = useState(false);
  const [cardId, setCardId] = useState<StationId | null>(null);
  const [station, setStation] = useState<StationId | null>(null);
  const paused = !started || cardId !== null;

  useEffect(() => {
    input.paused = paused;
  }, [input, paused]);

  // refs para o listener de teclado enxergar o estado atual sem re-registrar
  const startedRef = useRef(started);
  startedRef.current = started;
  const cardRef = useRef(cardId);
  cardRef.current = cardId;
  const stationRef = useRef(station);
  stationRef.current = station;
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const use = () => {
    if (stationRef.current) setCardId(stationRef.current);
  };

  useEffect(() => bindKeyboard(input), [input]);

  // gancho para testes manuais no console, só em desenvolvimento
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    (window as unknown as { __studio?: unknown }).__studio = { input, use, setCardId };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (cardRef.current) setCardId(null);
        else onExitRef.current();
        return;
      }
      if (!INTERACT_KEYS.includes(event.key) || event.repeat) return;
      event.preventDefault();
      if (!startedRef.current) setStarted(true);
      else if (cardRef.current) setCardId(null);
      else use();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onStateChange = useCallback((state: PlayerState) => setStation(state.station), []);

  const card = cardId ? CARDS[cardId] : null;
  const near = station ? STATIONS.find((s) => s.id === station) ?? null : null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-[#1a1c2c] font-sans text-base text-slate-800 select-none">
      <div className="absolute inset-0 touch-none">
        <SceneErrorBoundary>
          <Scene input={input} activeStation={station} onStateChange={onStateChange} />
        </SceneErrorBoundary>
      </div>

      {/* HUD */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 rounded-full bg-black/40 backdrop-blur px-4 py-2 text-white font-michroma text-[10px] sm:text-xs tracking-wide">
        Estúdio do Wagner
      </div>
      <button
        onClick={onExit}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 rounded-full bg-black/40 backdrop-blur px-4 py-2 text-white text-sm font-semibold cursor-pointer hover:bg-black/60"
      >
        ✕ Sair
      </button>

      {near && !paused && (
        <div className="door-prompt touch:hidden absolute bottom-14 inset-x-0 z-10 flex justify-center pointer-events-none">
          <span className="rounded-full bg-white/95 text-slate-800 font-semibold px-5 py-2 shadow-lg">
            ⏎ {near.prompt}
          </span>
        </div>
      )}

      <div className="touch:hidden absolute bottom-4 inset-x-0 z-10 px-4 text-center text-white/80 text-sm drop-shadow">
        Setas ou WASD para andar · clique no chão para caminhar até lá · Enter para usar · Esc para sair
      </div>

      <div className="hidden touch:flex absolute bottom-5 inset-x-5 z-10 items-end justify-between">
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          <div className="col-start-2 row-start-1">
            <PadButton onHold={(down) => (input.held.up = down)}>▲</PadButton>
          </div>
          <div className="col-start-1 row-start-2">
            <PadButton onHold={(down) => (input.held.left = down)}>◀</PadButton>
          </div>
          <div className="col-start-3 row-start-2">
            <PadButton onHold={(down) => (input.held.right = down)}>▶</PadButton>
          </div>
          <div className="col-start-2 row-start-3">
            <PadButton onHold={(down) => (input.held.down = down)}>▼</PadButton>
          </div>
        </div>
        <button
          disabled={!near}
          onPointerDown={(event) => {
            event.preventDefault();
            use();
          }}
          className="h-16 rounded-full px-7 bg-[#5d275d] text-white text-base font-semibold shadow-lg touch-none disabled:opacity-40 active:bg-[#7a3a7a]"
        >
          {near ? near.prompt : "Usar"}
        </button>
      </div>

      {!started && <StartCard onStart={() => setStarted(true)} />}
      {card && <PlaceCard card={card} onClose={() => setCardId(null)} />}
    </div>
  );
}

/** Se o WebGL falhar (driver, aceleração desligada), mostra o erro em vez de uma tela vazia. */
class SceneErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("Falha ao iniciar a cena 3D:", error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
        <div className="max-w-md">
          <p className="m-0 font-michroma text-sm">Não consegui iniciar a cena 3D</p>
          <p className="m-0 mt-3 text-white/80 text-sm leading-relaxed">
            O navegador não conseguiu criar o contexto WebGL. Verifique se a aceleração de hardware
            está ligada ou tente outro navegador.
          </p>
          <p className="m-0 mt-3 text-white/50 text-xs break-words">{this.state.error.message}</p>
        </div>
      </div>
    );
  }
}

function PadButton(props: { onHold: (down: boolean) => void; children: ReactNode }) {
  return (
    <button
      className="w-14 h-14 rounded-2xl bg-white/90 text-slate-800 text-xl font-bold shadow-lg touch-none active:bg-white active:scale-95"
      onPointerDown={(event) => {
        event.preventDefault();
        props.onHold(true);
      }}
      onPointerUp={() => props.onHold(false)}
      onPointerLeave={() => props.onHold(false)}
      onPointerCancel={() => props.onHold(false)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {props.children}
    </button>
  );
}

function Modal(props: { children: ReactNode; onBackdrop?: () => void }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      onClick={props.onBackdrop}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white/95 text-slate-800 shadow-2xl p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

function StartCard(props: { onStart: () => void }) {
  return (
    <Modal>
      <p className="m-0 font-michroma text-[10px] sm:text-xs tracking-[0.3em] text-[#5d275d]">MODO GAME</p>
      <h1 className="m-0 mt-2 font-michroma text-xl sm:text-2xl">Estúdio do Wagner</h1>
      <p className="m-0 mt-4 text-slate-600 leading-relaxed">
        Bem-vindo ao meu estúdio! Ande pela sala e chegue perto da bancada, do servidor, do painel e
        da máquina de café para ver o que cada um guarda.
      </p>
      <ul className="m-0 mt-4 p-0 list-none space-y-1 text-sm sm:text-base text-slate-600 leading-relaxed">
        <li className="touch:hidden">Setas ou WASD para andar, ou clique no chão e nos móveis</li>
        <li className="touch:hidden">Enter, Espaço ou E para usar · Esc para sair</li>
        <li className="hidden touch:list-item">Toque no chão ou segure o direcional para andar</li>
        <li className="hidden touch:list-item">Perto de um objeto, toque em Usar</li>
      </ul>
      <button
        onClick={props.onStart}
        className="mt-6 rounded-full bg-[#5d275d] hover:bg-[#7a3a7a] text-white font-semibold px-6 py-3 cursor-pointer"
      >
        Entrar no estúdio ▶
      </button>
    </Modal>
  );
}

function PlaceCard(props: { card: Card; onClose: () => void }) {
  return (
    <Modal onBackdrop={props.onClose}>
      <h2 className="m-0 font-michroma text-lg sm:text-xl">{props.card.title}</h2>
      {props.card.text.map((paragraph) => (
        <p key={paragraph} className="m-0 mt-3 text-slate-600 leading-relaxed">
          {paragraph}
        </p>
      ))}
      <div className="mt-6 flex flex-wrap gap-3">
        {props.card.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            download={link.download}
            className={`rounded-full px-5 py-3 text-white font-semibold no-underline ${link.color}`}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={props.onClose}
          className="rounded-full px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
        >
          Voltar
        </button>
      </div>
    </Modal>
  );
}
