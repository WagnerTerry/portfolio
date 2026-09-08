// Estado de entrada compartilhado entre o HUD (React) e o loop do jogo (Three):
// teclas, direcional na tela e destino de um clique no chão.

import { Direction } from "./content";

export type InputState = {
  keys: Record<Direction, boolean>;
  held: Record<Direction, boolean>;
  /** destino de um clique/toque no chão */
  target: { x: number; z: number } | null;
  /** parado enquanto a tela inicial ou um card estiverem abertos */
  paused: boolean;
};

const none = (): Record<Direction, boolean> => ({ up: false, down: false, left: false, right: false });

export const createInput = (): InputState => ({ keys: none(), held: none(), target: null, paused: true });

export const KEYS: Record<string, Direction> = {
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
};

/** Liga o teclado ao estado de entrada; devolve a função que desliga. */
export function bindKeyboard(input: InputState): () => void {
  const onKeyDown = (event: KeyboardEvent) => {
    const direction = KEYS[event.key];
    if (!direction) return;
    event.preventDefault();
    input.keys[direction] = true;
  };
  const onKeyUp = (event: KeyboardEvent) => {
    const direction = KEYS[event.key];
    if (direction) input.keys[direction] = false;
  };
  const release = () => {
    input.keys = none();
    input.held = none();
  };
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", release);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", release);
  };
}
