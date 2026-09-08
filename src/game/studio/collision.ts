// Colisão simples no chão: o personagem é um círculo, móveis e paredes são retângulos.

import { OBSTACLES, PLAYER, Rect, ROOM } from "../content";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const BOUNDS = {
  minX: -ROOM.width / 2 + 0.45,
  maxX: ROOM.width / 2 - 0.4,
  minZ: -ROOM.depth / 2 + 0.5,
  maxZ: ROOM.depth / 2 - 0.4,
};

export function pointInRect(x: number, z: number, rect: Rect): boolean {
  return x >= rect.x1 && x <= rect.x2 && z >= rect.z1 && z <= rect.z2;
}

function circleHitsRect(x: number, z: number, radius: number, rect: Rect): boolean {
  const nx = clamp(x, rect.x1, rect.x2);
  const nz = clamp(z, rect.z1, rect.z2);
  return (nx - x) ** 2 + (nz - z) ** 2 < radius * radius;
}

function blocked(x: number, z: number): boolean {
  if (x < BOUNDS.minX || x > BOUNDS.maxX || z < BOUNDS.minZ || z > BOUNDS.maxZ) return true;
  return OBSTACLES.some((rect) => circleHitsRect(x, z, PLAYER.radius, rect));
}

/** Aplica o deslocamento eixo a eixo, deslizando ao longo dos obstáculos. */
export function resolveMove(x: number, z: number, dx: number, dz: number): { x: number; z: number } {
  let nx = x + dx;
  if (blocked(nx, z)) nx = x;
  let nz = z + dz;
  if (blocked(nx, nz)) nz = z;
  return { x: nx, z: nz };
}
