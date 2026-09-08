// Móveis e estações do estúdio, montados só com caixas, cilindros e esferas.
// As áreas ocupadas precisam bater com OBSTACLES em content.ts.

import { memo, useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import { ROOM, StationId } from "../content";
import { Block, Cylinder, Sphere } from "./Block";
import {
  githubSignTexture,
  linkedinSignTexture,
  posterTexture,
  screenTexture,
  whiteboardTexture,
} from "./textures";

const BACK = -ROOM.depth / 2; // face interna da parede do fundo

function Picture(props: {
  texture: THREE.Texture;
  size: [number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={props.position} rotation={props.rotation}>
      <planeGeometry args={props.size} />
      <meshBasicMaterial map={props.texture} toneMapped={false} />
    </mesh>
  );
}

function Desk() {
  const screen = useMemo(() => screenTexture(), []);
  return (
    <group>
      <Block size={[3.6, 0.1, 1.4]} at={[-2, 0.72, -5.2]} color="#8a5a30" />
      {[-3.7, -0.3].map((x) =>
        [-5.8, -4.6].map((z) => (
          <Block key={`${x}-${z}`} size={[0.1, 0.72, 0.1]} at={[x, 0, z]} color="#5c3b1e" />
        ))
      )}
      {/* monitor */}
      <Block size={[0.4, 0.3, 0.25]} at={[-2, 0.82, -5.45]} color="#2f3340" />
      <Block size={[1.6, 1.0, 0.08]} at={[-2, 1.1, -5.45]} color="#2f3340" />
      <Picture texture={screen} size={[1.48, 0.88]} position={[-2, 1.6, -5.4]} />
      {/* teclado, mouse, caneca e currículo */}
      <Block size={[0.9, 0.05, 0.32]} at={[-2, 0.82, -4.85]} color="#3f4353" />
      <Block size={[0.12, 0.05, 0.18]} at={[-1.3, 0.82, -4.85]} color="#3f4353" />
      <Cylinder radius={0.08} height={0.14} at={[-0.9, 0.82, -5.0]} color="#ffd54f" />
      <Block size={[0.32, 0.03, 0.42]} at={[-3.2, 0.82, -4.9]} color="#f4f4f8" />
      {/* cadeira */}
      <Cylinder radius={0.3} height={0.05} at={[-2, 0, -4.3]} color="#2f3340" />
      <Block size={[0.1, 0.45, 0.1]} at={[-2, 0.05, -4.3]} color="#2f3340" />
      <Block size={[0.64, 0.1, 0.62]} at={[-2, 0.5, -4.3]} color="#5d275d" />
      <Block size={[0.64, 0.7, 0.1]} at={[-2, 0.6, -4.0]} color="#5d275d" />
    </group>
  );
}

function ServerRack() {
  const sign = useMemo(() => githubSignTexture(), []);
  return (
    <group>
      <Block size={[1.4, 2.2, 1.3]} at={[5.1, 0, -5.3]} color="#2b2f36" />
      {[0.25, 0.65, 1.05, 1.45, 1.85].map((y) => (
        <group key={y}>
          <Block size={[1.2, 0.28, 0.04]} at={[5.1, y, -4.64]} color="#3b4048" castShadow={false} />
          <Block
            size={[0.08, 0.08, 0.03]}
            at={[4.65, y + 0.1, -4.61]}
            color="#39ff88"
            emissive="#39ff88"
            emissiveIntensity={1.2}
            castShadow={false}
          />
          <Block
            size={[0.08, 0.08, 0.03]}
            at={[4.8, y + 0.1, -4.61]}
            color="#ffe74c"
            emissive="#ffe74c"
            emissiveIntensity={1}
            castShadow={false}
          />
        </group>
      ))}
      <Picture texture={sign} size={[1.8, 0.9]} position={[5.1, 2.95, BACK + 0.02]} />
    </group>
  );
}

/** Banner de pé (tipo roll-up) voltado para a câmera, junto à parede esquerda. */
function LinkedInBoard() {
  const sign = useMemo(() => linkedinSignTexture(), []);
  return (
    <group position={[-5.5, 0, -0.45]}>
      <Block size={[1.5, 0.08, 0.5]} at={[0, 0, 0]} color="#2f3340" />
      <Block size={[0.06, 2.1, 0.06]} at={[-0.7, 0.08, 0]} color="#2f3340" />
      <Block size={[0.06, 2.1, 0.06]} at={[0.7, 0.08, 0]} color="#2f3340" />
      <Block size={[1.5, 0.06, 0.12]} at={[0, 2.18, 0]} color="#2f3340" />
      <Block size={[1.4, 1.96, 0.04]} at={[0, 0.16, 0]} color="#084d92" castShadow={false} />
      <Picture texture={sign} size={[1.32, 0.85]} position={[0, 1.55, 0.025]} />
    </group>
  );
}

function CoffeeStation() {
  return (
    <group>
      <Block size={[1.2, 0.9, 1.8]} at={[-6.35, 0, 3.5]} color="#8a5a30" />
      <Block size={[1.3, 0.06, 1.9]} at={[-6.35, 0.9, 3.5]} color="#c8945a" />
      {/* máquina de café */}
      <Block size={[0.55, 0.65, 0.5]} at={[-6.4, 0.96, 3.1]} color="#2f3340" />
      <Block size={[0.3, 0.06, 0.24]} at={[-6.15, 0.96, 3.1]} color="#1f2129" />
      <Block
        size={[0.04, 0.08, 0.08]}
        at={[-6.1, 1.4, 3.0]}
        color="#d83a3a"
        emissive="#d83a3a"
        emissiveIntensity={1}
        castShadow={false}
      />
      <Cylinder radius={0.07} height={0.1} at={[-6.15, 1.02, 3.1]} color="#f8f8f8" />
      {/* xícaras e pote de café */}
      <Cylinder radius={0.07} height={0.1} at={[-6.2, 0.96, 3.95]} color="#f8f8f8" />
      <Cylinder radius={0.07} height={0.1} at={[-6.45, 0.96, 4.15]} color="#ffd54f" />
      <Cylinder radius={0.12} height={0.28} at={[-6.55, 0.96, 3.8]} color="#5c3b1e" />
    </group>
  );
}

const BOOKS: [string, number][] = [
  ["#d83a3a", 0.12],
  ["#2b4fa3", 0.16],
  ["#ffd54f", 0.1],
  ["#2e7d32", 0.14],
  ["#5d275d", 0.12],
  ["#f4a261", 0.1],
  ["#00b4d8", 0.16],
  ["#f8f8f8", 0.1],
];

function Bookshelf() {
  const shelves = [0.04, 0.68, 1.32];
  return (
    <group>
      <Block size={[2.4, 2.0, 0.06]} at={[2.2, 0, -5.92]} color="#6d4c2f" />
      <Block size={[0.06, 2.0, 0.8]} at={[1.03, 0, -5.55]} color="#6d4c2f" />
      <Block size={[0.06, 2.0, 0.8]} at={[3.37, 0, -5.55]} color="#6d4c2f" />
      <Block size={[2.4, 0.06, 0.8]} at={[2.2, 1.94, -5.55]} color="#6d4c2f" />
      {shelves.map((y, row) => (
        <group key={y}>
          <Block size={[2.28, 0.05, 0.76]} at={[2.2, y, -5.55]} color="#8a6240" />
          {BOOKS.slice(row, row + 6).reduce<{ x: number; nodes: JSX.Element[] }>(
            (acc, [color, width], i) => {
              acc.nodes.push(
                <Block
                  key={`${row}-${i}`}
                  size={[width, 0.42 + ((i + row) % 3) * 0.05, 0.5]}
                  at={[acc.x + width / 2, y + 0.05, -5.6]}
                  color={color}
                />
              );
              acc.x += width + 0.03;
              return acc;
            },
            { x: 1.2 + row * 0.15, nodes: [] }
          ).nodes}
        </group>
      ))}
    </group>
  );
}

function Plant(props: { at: [number, number, number] }) {
  const [x, y, z] = props.at;
  return (
    <group>
      <Cylinder radius={0.3} radiusTop={0.38} height={0.55} at={[x, y, z]} color="#b5651d" />
      <Cylinder radius={0.34} height={0.04} at={[x, y + 0.55, z]} color="#3a2416" />
      <Cylinder radius={0.06} height={0.5} at={[x, y + 0.55, z]} color="#5c3b1e" />
      <Sphere radius={0.55} at={[x, y + 1.3, z]} color="#2e7d32" />
      <Sphere radius={0.4} at={[x - 0.35, y + 1.1, z + 0.2]} color="#3f9a3f" />
      <Sphere radius={0.38} at={[x + 0.35, y + 1.2, z - 0.15]} color="#4caf50" />
    </group>
  );
}

/** Quadro branco na parede do fundo, à esquerda da janela. */
function Whiteboard() {
  const board = useMemo(() => whiteboardTexture(), []);
  return (
    <group>
      <Block size={[2.2, 1.4, 0.06]} at={[-5.4, 1.2, BACK + 0.03]} color="#c9c9c9" castShadow={false} />
      <Picture texture={board} size={[2.05, 1.28]} position={[-5.4, 1.9, BACK + 0.1]} />
    </group>
  );
}

function Poster() {
  const poster = useMemo(() => posterTexture(), []);
  return <Picture texture={poster} size={[0.9, 1.2]} position={[0.3, 2.3, BACK + 0.02]} />;
}

function FloorLamp(props: { at: [number, number, number] }) {
  const [x, y, z] = props.at;
  return (
    <group>
      <Cylinder radius={0.28} height={0.05} at={[x, y, z]} color="#2f3340" />
      <Cylinder radius={0.04} height={1.9} at={[x, y + 0.05, z]} color="#2f3340" />
      <Cylinder radius={0.34} radiusTop={0.2} height={0.42} at={[x, y + 1.85, z]} color="#ffd54f" emissive="#ffe58a" />
    </group>
  );
}

type PropsProps = { onStation: (id: StationId) => void };

/** Todos os móveis. Clicar numa estação manda o personagem até ela. */
export const Props = memo(function Props({ onStation }: PropsProps) {
  const station = (id: StationId) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onStation(id);
  };
  return (
    <group>
      <group onPointerDown={station("desk")}>
        <Desk />
      </group>
      <group onPointerDown={station("github")}>
        <ServerRack />
      </group>
      <group onPointerDown={station("linkedin")}>
        <LinkedInBoard />
      </group>
      <group onPointerDown={station("coffee")}>
        <CoffeeStation />
      </group>
      <Bookshelf />
      <Whiteboard />
      <Poster />
      <Plant at={[6.2, 0, 3.5]} />
      <FloorLamp at={[6.3, 0, -1.0]} />
    </group>
  );
});
