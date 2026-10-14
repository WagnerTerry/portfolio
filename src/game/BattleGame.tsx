// Minigame da TV: a batalha contra o Slime Rei em tela cheia, desenhada com o mesmo drawBattle da
// TV do cantinho gamer (que espelha o jogo), com um "controle" de quatro botões embaixo.
// Setas ou W/S escolhem, Enter/Espaço/E confirmam, Esc levanta do pufe (GameMode cuida do Esc).

import { useCallback, useEffect, useRef } from "react";

import { sfx } from "./audio";
import { BattleView, COMMANDS, Command, enemyAct, heroAct, initialBattle } from "./battle";
import { getState, setState, useGameState } from "./store";
import { drawBattle } from "./studio/textures";

const FX_SECONDS = 0.8;
const ENEMY_DELAY_MS = 600;

const update = (view: BattleView) => setState({ battleView: view });
const hasEnded = (view: BattleView) => view.phase === "won" || view.phase === "lost" || view.phase === "fled";

export function BattleGame({ onClose }: { onClose: () => void }) {
  const view = useGameState((s) => s.battleView);
  const canvas = useRef<HTMLCanvasElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const act = useCallback((command: Command) => {
    const current = getState().battleView;
    if (!current || current.phase !== "hero" || current.fx.kind) return;
    const next = heroAct(current, command);
    if (next.fx.kind === "slash") sfx.hit();
    else if (next.fx.kind === "magic") sfx.magic();
    else if (next.fx.kind === "heal") sfx.heal();
    else sfx.back();
    update(next);
    if (next.phase === "won") sfx.fanfare();
  }, []);

  const confirm = useCallback(() => {
    const current = getState().battleView;
    if (!current) return;
    if (hasEnded(current)) {
      if (current.cursor === 0) {
        update(initialBattle());
        sfx.blip();
      } else {
        onCloseRef.current();
      }
      return;
    }
    act(COMMANDS[current.cursor]);
  }, [act]);

  const move = useCallback((direction: number) => {
    const current = getState().battleView;
    if (!current) return;
    const total = hasEnded(current) ? 2 : COMMANDS.length;
    update({ ...current, cursor: (current.cursor + direction + total) % total });
    sfx.key();
  }, []);

  // efeitos avançam no tempo e a tela redesenha a cada quadro
  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      const current = getState().battleView;
      if (current) {
        if (current.fx.kind) {
          const t = Math.min(1, current.fx.t + dt / FX_SECONDS);
          update({ ...current, fx: t >= 1 ? { kind: null, t: 0, value: 0 } : { ...current.fx, t } });
        }
        const ctx = canvas.current?.getContext("2d");
        const latest = getState().battleView;
        if (ctx && latest) drawBattle(ctx, 1024, 576, latest);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  // o inimigo age um pouco depois do efeito do herói terminar
  const phase = view?.phase;
  const fxKind = view?.fx.kind ?? null;
  useEffect(() => {
    if (phase !== "enemy" || fxKind) return;
    const timer = window.setTimeout(() => {
      const current = getState().battleView;
      if (!current || current.phase !== "enemy") return;
      const next = enemyAct(current);
      if (next.fx.kind === "enemy") sfx.hurt();
      else sfx.heal();
      update(next);
      if (next.phase === "lost") sfx.lose();
    }, ENEMY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase, fxKind]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "w", "W"].includes(event.key)) {
        event.preventDefault();
        move(-1);
      } else if (["ArrowDown", "s", "S"].includes(event.key)) {
        event.preventDefault();
        move(1);
      } else if ([" ", "Enter", "e", "E"].includes(event.key)) {
        if (event.repeat) return;
        event.preventDefault();
        confirm();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, confirm]);

  if (!view) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border-4 border-[#2f3340] bg-[#0b0d16] p-2 shadow-2xl">
          <canvas ref={canvas} width={1024} height={576} className="block w-full h-auto rounded-lg" />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-white/70 text-xs sm:text-sm">
            Minigame na TV · ↑↓ escolhe · Enter confirma · Esc levanta do pufe
          </p>
          <div className="flex gap-2">
            <PadKey label="▲" onPress={() => move(-1)} />
            <PadKey label="▼" onPress={() => move(1)} />
            <PadKey label="A" onPress={confirm} accent />
            <PadKey label="B" onPress={() => onCloseRef.current()} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PadKey(props: { label: string; onPress: () => void; accent?: boolean }) {
  return (
    <button
      onPointerDown={(event) => {
        event.preventDefault();
        props.onPress();
      }}
      className={`w-12 h-12 rounded-full font-semibold text-white shadow-lg touch-none active:scale-95 ${
        props.accent ? "bg-[#d83a3a]" : "bg-[#2f3340]"
      }`}
    >
      {props.label}
    </button>
  );
}
