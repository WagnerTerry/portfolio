// Partículas simples em sprites (sempre de frente para a câmera): vapor do café e notas da guitarra.
// Nascem na origem do grupo, sobem balançando e somem; com `active` falso param de nascer.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PuffsProps = {
  texture: THREE.Texture;
  active: boolean;
  position?: [number, number, number];
  count?: number;
  size?: number;
  /** metros por segundo */
  rise?: number;
  /** segundos de vida de cada partícula */
  life?: number;
  /** balanço lateral e espalhamento do nascimento */
  spread?: number;
  colors?: string[];
  opacity?: number;
};

export function Puffs({
  texture,
  active,
  position = [0, 0, 0],
  count = 6,
  size = 0.2,
  rise = 0.5,
  life = 1.4,
  spread = 0.1,
  colors = ["#ffffff"],
  opacity = 0.7,
}: PuffsProps) {
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ t: (i / count) * life, seed: Math.random() * 10, x: 0, z: 0, alive: false })),
    [count, life]
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    particles.forEach((p, i) => {
      const sprite = sprites.current[i];
      if (!sprite) return;
      p.t += dt;
      if (p.t >= life) {
        if (active) {
          p.t = 0;
          p.x = (Math.random() - 0.5) * spread * 2;
          p.z = (Math.random() - 0.5) * spread * 2;
          p.seed = Math.random() * 10;
          p.alive = true;
        } else {
          p.alive = false;
        }
      }
      sprite.visible = p.alive;
      if (!p.alive) return;
      const u = p.t / life;
      sprite.position.set(p.x + Math.sin(p.t * 3 + p.seed) * spread, rise * p.t, p.z);
      const scale = size * (0.6 + 0.6 * u);
      sprite.scale.set(scale, scale, 1);
      (sprite.material as THREE.SpriteMaterial).opacity = opacity * (1 - u) * Math.min(1, u * 6);
    });
  });

  return (
    <group position={position}>
      {particles.map((_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          visible={false}
        >
          <spriteMaterial map={texture} color={colors[i % colors.length]} transparent depthWrite={false} opacity={0} toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}
