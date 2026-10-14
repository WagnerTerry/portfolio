// A sala: piso de tábuas sobre uma base de diorama, duas paredes, janela (com vista de dia ou de
// noite) e tapete.

import { useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";

import { ROOM } from "../content";
import { useGameState } from "../store";
import { Block } from "./Block";
import { windowTexture } from "./textures";

const W = ROOM.width;
const D = ROOM.depth;
const H = ROOM.wallHeight;

export function Room(props: { onFloorPointerDown: (event: ThreeEvent<PointerEvent>) => void }) {
  const night = useGameState((s) => s.night);
  const day = useMemo(() => windowTexture(false), []);
  const dusk = useMemo(() => windowTexture(true), []);
  const planks = [];
  for (let z = -D / 2 + 1; z < D / 2; z += 1) planks.push(z);

  return (
    <group>
      {/* piso */}
      <mesh position={[0, -0.05, 0]} receiveShadow onPointerDown={props.onFloorPointerDown}>
        <boxGeometry args={[W, 0.1, D]} />
        <meshStandardMaterial color="#d9c7a5" roughness={0.9} />
      </mesh>
      {planks.map((z) => (
        <Block key={z} size={[W, 0.006, 0.05]} at={[0, 0, z]} color="#c6b08b" castShadow={false} />
      ))}

      {/* base do diorama */}
      <Block size={[W + 1.2, 0.9, D + 1.2]} at={[0, -1.0, 0]} color="#2a2118" />

      {/* paredes */}
      <Block size={[W + 0.3, H, 0.3]} at={[-0.15, 0, -D / 2 - 0.15]} color="#efe6d6" />
      <Block size={[0.3, H, D]} at={[-W / 2 - 0.15, 0, 0]} color="#e6dccb" />
      <Block size={[W, 0.18, 0.06]} at={[0, 0, -D / 2 + 0.03]} color="#c9b48f" castShadow={false} />
      <Block size={[0.06, 0.18, D]} at={[-W / 2 + 0.03, 0, 0]} color="#c9b48f" castShadow={false} />

      {/* janela acima da bancada: a vista muda com o modo noite */}
      <Block size={[2.8, 1.6, 0.1]} at={[-2, 1.9, -D / 2 + 0.02]} color="#ffffff" castShadow={false} />
      <mesh position={[-2, 2.7, -D / 2 + 0.085]}>
        <planeGeometry args={[2.5, 1.3]} />
        <meshBasicMaterial map={night ? dusk : day} toneMapped={false} />
      </mesh>
      <Block size={[0.08, 1.3, 0.1]} at={[-2, 2.05, -D / 2 + 0.07]} color="#ffffff" castShadow={false} />
      <Block size={[2.5, 0.08, 0.1]} at={[-2, 2.66, -D / 2 + 0.07]} color="#ffffff" castShadow={false} />

      {/* tapete */}
      <Block size={[5.2, 0.03, 3.8]} at={[0.8, 0.001, 0.2]} color="#5d275d" castShadow={false} />
      <Block size={[4.5, 0.032, 3.1]} at={[0.8, 0.002, 0.2]} color="#7a3a7a" castShadow={false} />
    </group>
  );
}
