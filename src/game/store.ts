// Estado compartilhado do modo game, fora do React: o Canvas do R3F é outra raiz React e o
// contexto não atravessa, então o HUD, os móveis e o loop do personagem leem daqui.

import { useSyncExternalStore } from "react";

import { BattleView } from "./battle";
import { ActionKind } from "./content";

export type GameState = {
  night: boolean;
  muted: boolean;
  /** animação de interação em andamento */
  action: ActionKind | null;
  /** minigame da TV aberto: estado da batalha */
  battleView: BattleView | null;
};

const initial = (): GameState => ({
  night: false,
  muted: false,
  action: null,
  battleView: null,
});

let state = initial();
const listeners = new Set<() => void>();

export const getState = () => state;

export function setState(patch: Partial<GameState>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

export function resetState(patch: Partial<GameState> = {}) {
  state = { ...initial(), ...patch };
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useGameState<T>(selector: (state: GameState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state));
}
