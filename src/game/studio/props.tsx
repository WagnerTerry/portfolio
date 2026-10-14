// Móveis e estações do estúdio, montados só com caixas, cilindros e esferas.
// As áreas ocupadas precisam bater com OBSTACLES em content.ts.

import { memo, useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import { ROOM, StationId } from "../content";
import { Block, Cylinder, Sphere } from "./Block";
import {
  browserTexture,
  githubSignTexture,
  linkedinSignTexture,
  posterTexture,
  screenTexture,
  terminalTexture,
  tvScreenTexture,
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

/** Guitarra elétrica vermelha num suporte de chão; `yaw` gira o conjunto para o lado da sala.
 *  Um pouco maior que o real para ler bem da câmera alta. */
function Guitar(props: { at: [number, number, number]; yaw?: number }) {
  const [x, y, z] = props.at;
  const body = "#d83a3a";
  const dark = "#2f3340";
  const wood = "#3a2416";
  const metal = "#cfd3dc";
  // cilindro deitado: vira um disco de frente para +z
  const disc: [number, number, number] = [Math.PI / 2, 0, 0];
  return (
    <group position={[x, y, z]} rotation={[0, props.yaw ?? 0, 0]} scale={1.2}>
      {/* suporte: base, haste, ganchos do corpo e descanso do braço */}
      <Cylinder radius={0.26} height={0.03} at={[0, 0, -0.1]} color={dark} />
      <Block size={[0.05, 0.88, 0.05]} at={[0, 0.03, -0.3]} color={dark} />
      {[-0.14, 0.14].map((gx) => (
        <Block key={gx} size={[0.05, 0.12, 0.05]} at={[gx, 0.03, 0.11]} color={dark} />
      ))}
      <Block size={[0.2, 0.04, 0.12]} at={[0, 0.88, -0.27]} color={dark} />

      {/* a guitarra, encostada para trás no suporte (a inclinação mostra a frente para a câmera) */}
      <group position={[0, 0.04, 0.06]} rotation={[-0.35, 0, 0]}>
        {/* corpo em "8" com chifre e escudo creme */}
        <Cylinder radius={0.2} height={0.06} at={[0, 0.19, 0]} rotation={disc} color={body} />
        <Cylinder radius={0.15} height={0.06} at={[0, 0.43, 0]} rotation={disc} color={body} />
        <Block size={[0.09, 0.2, 0.06]} at={[-0.14, 0.44, 0]} color={body} />
        <Cylinder radius={0.14} height={0.012} at={[0.02, 0.254, 0.036]} rotation={disc} color="#f4e6c8" />
        {/* captadores, ponte e botões */}
        {[0.3, 0.36, 0.42].map((py) => (
          <Block key={py} size={[0.1, 0.028, 0.014]} at={[0, py, 0.045]} color="#1f2129" castShadow={false} />
        ))}
        <Block size={[0.12, 0.03, 0.02]} at={[0, 0.13, 0.04]} color={metal} castShadow={false} />
        {[0.11, 0.18].map((py) => (
          <Cylinder key={py} radius={0.018} height={0.015} at={[0.13, py, 0.038]} rotation={disc} color={dark} />
        ))}
        {/* braço com trastes e cordas */}
        <Block size={[0.065, 0.62, 0.035]} at={[0, 0.5, 0.0175]} color={wood} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Block
            key={i}
            size={[0.07, 0.006, 0.037]}
            at={[0, 0.58 + i * 0.07, 0.0175]}
            color={metal}
            castShadow={false}
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Block
            key={i}
            size={[0.005, 0.98, 0.005]}
            at={[-0.0225 + i * 0.009, 0.15, 0.048]}
            color="#e6e6e6"
            castShadow={false}
            receiveShadow={false}
          />
        ))}
        {/* mão com as tarraxas */}
        <Block size={[0.11, 0.2, 0.025]} at={[0, 1.1, 0.008]} color={body} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Block
            key={i}
            size={[0.03, 0.012, 0.02]}
            at={[-0.065, 1.13 + i * 0.026, 0]}
            color={metal}
            castShadow={false}
          />
        ))}
      </group>
    </group>
  );
}

/** Cantinho gamer: rack baixo com TV, console no nicho e um pufe com o controle em cima. */
function GameCorner() {
  const screen = useMemo(() => tvScreenTexture(), []);
  const wood = "#6d4c2f";
  const woodLight = "#8a6240";
  const dark = "#2f3340";
  return (
    <group>
      {/* rack: rodapé, prateleira, tampo, laterais, fundo e duas portas; o nicho do meio fica aberto */}
      <Block size={[1.8, 0.05, 0.45]} at={[5, 0, 0.3]} color="#3a2416" />
      <Block size={[1.9, 0.06, 0.55]} at={[5, 0.05, 0.3]} color={wood} />
      <Block size={[1.9, 0.06, 0.55]} at={[5, 0.45, 0.3]} color={woodLight} />
      {[4.08, 5.92].map((x) => (
        <Block key={x} size={[0.06, 0.34, 0.55]} at={[x, 0.11, 0.3]} color={wood} />
      ))}
      <Block size={[1.9, 0.34, 0.04]} at={[5, 0.11, 0.045]} color={wood} />
      {[4.4, 5.6].map((x) => (
        <group key={x}>
          <Block size={[0.58, 0.34, 0.5]} at={[x, 0.11, 0.3]} color={woodLight} />
          <Block size={[0.03, 0.1, 0.02]} at={[x < 5 ? x + 0.22 : x - 0.22, 0.23, 0.55]} color="#cfd3dc" />
        </group>
      ))}
      {/* console branco com faixa escura e led azul */}
      <Block size={[0.42, 0.09, 0.3]} at={[5, 0.11, 0.33]} color="#f4f4f8" />
      <Block size={[0.44, 0.03, 0.32]} at={[5, 0.14, 0.33]} color="#1f2129" />
      <Block
        size={[0.28, 0.012, 0.012]}
        at={[5, 0.172, 0.484]}
        color="#2f80ff"
        emissive="#2f80ff"
        emissiveIntensity={1.4}
        castShadow={false}
      />
      {/* TV */}
      <Block size={[0.5, 0.08, 0.22]} at={[5, 0.51, 0.3]} color={dark} />
      <Block size={[1.25, 0.72, 0.05]} at={[5, 0.59, 0.27]} color="#1f2129" />
      <Picture texture={screen} size={[1.17, 0.64]} position={[5, 0.95, 0.3]} />
      {/* pufe */}
      <Cylinder radius={0.42} radiusTop={0.36} height={0.38} at={[5, 0, 1.9]} color="#f4a261" />
      <Cylinder radius={0.34} height={0.05} at={[5, 0.38, 1.9]} color="#f7b77f" />
      {/* controle: corpo, empunhaduras, analógicos, botões e direcional */}
      <group position={[5, 0.43, 1.85]} rotation={[0, -0.5, 0]}>
        <Block size={[0.2, 0.045, 0.1]} at={[0, 0, 0]} color={dark} />
        <Block size={[0.065, 0.045, 0.11]} at={[-0.09, 0, 0.05]} rotation={[0, 0.4, 0]} color={dark} />
        <Block size={[0.065, 0.045, 0.11]} at={[0.09, 0, 0.05]} rotation={[0, -0.4, 0]} color={dark} />
        <Sphere radius={0.015} at={[-0.03, 0.05, 0.015]} color="#1f2129" />
        <Sphere radius={0.015} at={[0.03, 0.05, 0.015]} color="#1f2129" />
        <Sphere radius={0.011} at={[0.07, 0.048, -0.035]} color="#39ff88" />
        <Sphere radius={0.011} at={[0.07, 0.048, 0.005]} color="#2b4fa3" />
        <Sphere radius={0.011} at={[0.05, 0.048, -0.015]} color="#d83a3a" />
        <Sphere radius={0.011} at={[0.09, 0.048, -0.015]} color="#ffd54f" />
        <Block size={[0.034, 0.008, 0.012]} at={[-0.07, 0.045, -0.02]} color="#1f2129" castShadow={false} />
        <Block size={[0.012, 0.008, 0.034]} at={[-0.07, 0.045, -0.02]} color="#1f2129" castShadow={false} />
      </group>
    </group>
  );
}

/** Mesa auxiliar: notebook com monitor externo, mouse, caneca e um banquinho guardado embaixo. */
function LaptopDesk() {
  const browser = useMemo(() => browserTexture(), []);
  const terminal = useMemo(() => terminalTexture(), []);
  const dark = "#2f3340";
  const silver = "#b8bcc6";
  return (
    <group>
      {/* tampo branco em pés "T" */}
      <Block size={[2.0, 0.06, 0.8]} at={[-2.9, 0.74, 4.3]} color="#f4f4f8" />
      {[-3.7, -2.1].map((x) => (
        <group key={x}>
          <Block size={[0.1, 0.04, 0.7]} at={[x, 0, 4.3]} color={dark} />
          <Block size={[0.08, 0.7, 0.08]} at={[x, 0.04, 4.3]} color={dark} />
        </group>
      ))}
      <Block size={[1.5, 0.05, 0.1]} at={[-2.9, 0.69, 4.3]} color={dark} />
      {/* monitor externo */}
      <Block size={[0.36, 0.03, 0.24]} at={[-3.35, 0.8, 4.12]} color={dark} />
      <Block size={[0.07, 0.3, 0.05]} at={[-3.35, 0.83, 4.08]} color={dark} />
      <Block size={[1.0, 0.58, 0.05]} at={[-3.35, 1.08, 4.1]} color={dark} />
      <Picture texture={browser} size={[0.93, 0.52]} position={[-3.35, 1.37, 4.13]} />
      {/* notebook aberto: base com teclado e trackpad, tampa inclinada com a tela */}
      <group position={[-2.35, 0.8, 4.4]} rotation={[0, 0.12, 0]}>
        <Block size={[0.5, 0.025, 0.34]} at={[0, 0, 0]} color={silver} />
        <Block size={[0.4, 0.004, 0.16]} at={[0, 0.025, -0.05]} color={dark} castShadow={false} />
        <Block size={[0.12, 0.004, 0.08]} at={[0, 0.025, 0.1]} color="#9ea3ad" castShadow={false} />
        <group position={[0, 0.025, -0.17]} rotation={[-0.3, 0, 0]}>
          <Block size={[0.5, 0.33, 0.02]} at={[0, 0, 0]} color={silver} />
          <Picture texture={terminal} size={[0.46, 0.28]} position={[0, 0.17, 0.011]} />
        </group>
      </group>
      {/* mouse e caneca */}
      <Block size={[0.07, 0.03, 0.11]} at={[-1.98, 0.8, 4.45]} color={dark} />
      <Cylinder radius={0.06} height={0.12} at={[-2.78, 0.8, 4.55]} color="#2e7d32" />
      {/* banquinho guardado embaixo da mesa */}
      <Cylinder radius={0.2} height={0.03} at={[-2.9, 0, 4.5]} color={dark} />
      <Block size={[0.05, 0.5, 0.05]} at={[-2.9, 0.03, 4.5]} color={dark} />
      <Cylinder radius={0.21} height={0.07} at={[-2.9, 0.53, 4.5]} color="#5d275d" />
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
      <Guitar at={[-6.4, 0, 1.1]} yaw={0.35} />
      <GameCorner />
      <LaptopDesk />
    </group>
  );
});
