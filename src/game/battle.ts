// Minigame da TV: batalha por turnos contra o Slime Rei. Aqui ficam só as regras e o estado;
// o desenho está em studio/textures.ts (drawBattle) e a tela com os controles em BattleGame.tsx.

export const HERO_MAX_HP = 120;
export const HERO_MAX_MP = 45;
export const SLIME_MAX_HP = 150;
export const MAGIC_COST = 15;
export const POTION_HEAL = 50;

export const COMMANDS = ["Atacar", "Magia", "Item", "Fugir"] as const;
export type Command = (typeof COMMANDS)[number];

export type FxKind = "slash" | "magic" | "heal" | "enemy" | null;
export type Phase = "hero" | "enemy" | "won" | "lost" | "fled";

export type BattleView = {
  heroHp: number;
  heroMp: number;
  slimeHp: number;
  potions: number;
  message: string;
  /** comando selecionado (ou opção da tela final) */
  cursor: number;
  phase: Phase;
  /** efeito em andamento, seu progresso (0..1) e o número mostrado */
  fx: { kind: FxKind; t: number; value: number };
};

const NO_FX = { kind: null, t: 0, value: 0 } as const;
const rnd = (n: number) => Math.floor(Math.random() * n);

export function initialBattle(): BattleView {
  return {
    heroHp: HERO_MAX_HP,
    heroMp: HERO_MAX_MP,
    slimeHp: SLIME_MAX_HP,
    potions: 2,
    message: "Um Slime Rei apareceu!",
    cursor: 0,
    phase: "hero",
    fx: { ...NO_FX },
  };
}

/** Turno do herói. Devolve o novo estado com o efeito a animar; o inimigo age depois. */
export function heroAct(view: BattleView, command: Command): BattleView {
  if (view.phase !== "hero" || view.fx.kind) return view;
  const next: BattleView = { ...view, fx: { ...NO_FX } };
  switch (command) {
    case "Atacar": {
      const critical = Math.random() < 0.15;
      const damage = (22 + rnd(14)) * (critical ? 2 : 1);
      next.slimeHp = Math.max(0, view.slimeHp - damage);
      next.message = critical ? `Golpe crítico! ${damage} de dano` : `Wagner ataca com a espada! ${damage} de dano`;
      next.fx = { kind: "slash", t: 0, value: damage };
      break;
    }
    case "Magia": {
      if (view.heroMp < MAGIC_COST) return { ...view, message: "MP insuficiente para o Raio!" };
      const damage = 40 + rnd(16);
      next.heroMp = view.heroMp - MAGIC_COST;
      next.slimeHp = Math.max(0, view.slimeHp - damage);
      next.message = `Wagner lança Raio! ${damage} de dano`;
      next.fx = { kind: "magic", t: 0, value: damage };
      break;
    }
    case "Item": {
      if (view.potions === 0) return { ...view, message: "Acabaram as poções!" };
      const healed = Math.min(POTION_HEAL, HERO_MAX_HP - view.heroHp);
      next.heroHp = view.heroHp + healed;
      next.potions = view.potions - 1;
      next.message = healed > 0 ? `Poção! +${healed} HP` : "HP já está cheio... mas a poção era gostosa.";
      next.fx = { kind: "heal", t: 0, value: healed };
      break;
    }
    case "Fugir":
      return { ...next, phase: "fled", message: "Você fugiu. O Slime Rei dá risada." };
  }
  if (next.slimeHp <= 0) {
    next.phase = "won";
    next.message = "Slime Rei derrotado! +100 XP";
  } else {
    next.phase = "enemy";
  }
  return next;
}

/** Turno do Slime Rei: pula em cima do herói ou se regenera. */
export function enemyAct(view: BattleView): BattleView {
  if (view.phase !== "enemy") return view;
  const next: BattleView = { ...view, phase: "hero", fx: { ...NO_FX } };
  if (Math.random() < 0.2 && view.slimeHp < SLIME_MAX_HP) {
    const healed = Math.min(20, SLIME_MAX_HP - view.slimeHp);
    next.slimeHp = view.slimeHp + healed;
    next.message = `Slime Rei se regenera! +${healed} HP`;
    next.fx = { kind: "heal", t: 0, value: -healed };
    return next;
  }
  const damage = 14 + rnd(12);
  next.heroHp = Math.max(0, view.heroHp - damage);
  next.message = `Slime Rei pula em cima de você! ${damage} de dano`;
  next.fx = { kind: "enemy", t: 0, value: damage };
  if (next.heroHp <= 0) {
    next.phase = "lost";
    next.message = "Você caiu... Fim de jogo";
  }
  return next;
}
