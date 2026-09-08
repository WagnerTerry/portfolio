// Personagem cartoon: cabeça grande com o rosto pintado em textura (óculos e
// sorriso), cabelo curto em 3D e corpo arredondado em cápsulas com a camiseta
// de violão pintada. Movimento em 4 direções, colisão com os móveis, destino por clique e
// animação de caminhada.

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PLAYER, StationId, STATIONS } from "../content";
import { InputState } from "../input";
import { pointInRect, resolveMove } from "./collision";
import { faceTexture, outfitTexture, SHIRT_COLOR } from "./textures";

const C = {
  skin: "#d9a274",
  skinShade: "#bf8657",
  hair: "#4a2c1a",
  shirt: SHIRT_COLOR,
  pants: "#2c3e6b",
  shoes: "#eceff4",
};

/** Cápsula centrada em `center`, com sombreamento facetado (low-poly). */
function Capsule(props: {
  radius: number;
  length: number;
  center: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={props.center} rotation={props.rotation} castShadow receiveShadow>
      <capsuleGeometry args={[props.radius, props.length, 6, 14]} />
      <meshStandardMaterial color={props.color} roughness={0.85} flatShading />
    </mesh>
  );
}

function Ball(props: {
  radius: number;
  center: [number, number, number];
  color: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  flat?: boolean;
}) {
  return (
    <mesh position={props.center} scale={props.scale} rotation={props.rotation} castShadow receiveShadow>
      <sphereGeometry args={[props.radius, 20, 14]} />
      <meshStandardMaterial color={props.color} roughness={0.85} flatShading={props.flat} />
    </mesh>
  );
}

export type PlayerState = { walking: boolean; station: StationId | null };

type PlayerProps = {
  input: InputState;
  /** posição atual, lida pela câmera */
  positionRef: MutableRefObject<THREE.Vector3>;
  onStateChange: (state: PlayerState) => void;
};

/** Interpola um ângulo pelo caminho mais curto. */
function dampAngle(current: number, target: number, lambda: number, dt: number) {
  const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + diff * (1 - Math.exp(-lambda * dt));
}

export function Player({ input, positionRef, onStateChange }: PlayerProps) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const face = useMemo(() => faceTexture(), []);
  const outfit = useMemo(() => outfitTexture(), []);

  const sim = useRef({
    x: PLAYER.start.x,
    z: PLAYER.start.z,
    yaw: 0,
    walk: 0,
    phase: 0,
    walking: false,
    station: null as StationId | null,
  });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = sim.current;

    let dx = 0;
    let dz = 0;
    if (!input.paused) {
      const pressed = (d: keyof InputState["keys"]) => input.keys[d] || input.held[d];
      dx = (pressed("right") ? 1 : 0) - (pressed("left") ? 1 : 0);
      dz = (pressed("down") ? 1 : 0) - (pressed("up") ? 1 : 0);
      if (dx !== 0 || dz !== 0) {
        input.target = null;
      } else if (input.target) {
        const tx = input.target.x - s.x;
        const tz = input.target.z - s.z;
        const distance = Math.hypot(tx, tz);
        if (distance < 0.08) input.target = null;
        else {
          dx = tx / distance;
          dz = tz / distance;
        }
      }
    }

    const moving = dx !== 0 || dz !== 0;
    if (moving) {
      const length = Math.hypot(dx, dz);
      dx /= length;
      dz /= length;
      const step = PLAYER.speed * dt;
      const next = resolveMove(s.x, s.z, dx * step, dz * step);
      // travou num móvel a caminho do destino clicado: desiste
      if (input.target && Math.abs(next.x - s.x) < 1e-4 && Math.abs(next.z - s.z) < 1e-4) {
        input.target = null;
      }
      s.x = next.x;
      s.z = next.z;
      s.yaw = dampAngle(s.yaw, Math.atan2(dx, dz), 14, dt);
    }

    // animação: pernas/braços balançam ao andar, corpo respira parado
    s.walk = THREE.MathUtils.damp(s.walk, moving ? 1 : 0, 10, dt);
    if (moving) s.phase += dt * 11;
    const swing = Math.sin(s.phase) * 0.75 * s.walk;
    if (legL.current) legL.current.rotation.x = swing;
    if (legR.current) legR.current.rotation.x = -swing;
    if (armL.current) armL.current.rotation.x = -swing * 0.8;
    if (armR.current) armR.current.rotation.x = swing * 0.8;
    if (body.current) {
      body.current.position.y = Math.abs(Math.cos(s.phase)) * 0.06 * s.walk;
      body.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.012 * (1 - s.walk);
    }
    if (root.current) {
      root.current.position.set(s.x, 0, s.z);
      root.current.rotation.y = s.yaw;
    }
    positionRef.current.set(s.x, 0, s.z);

    // estação ao alcance
    const station = input.paused
      ? s.station
      : STATIONS.find((st) => pointInRect(s.x, s.z, st.zone))?.id ?? null;
    if (moving !== s.walking || station !== s.station) {
      s.walking = moving;
      s.station = station;
      onStateChange({ walking: moving, station });
    }
  });

  // o modelo olha para +z; o pivô de cada membro fica na junta (quadril/ombro)
  return (
    <group ref={root} position={[PLAYER.start.x, 0, PLAYER.start.z]} scale={0.85}>
      {/* pernas e sapatos */}
      <group ref={legL} position={[-0.13, 0.62, 0]}>
        <Capsule radius={0.1} length={0.25} center={[0, -0.25, 0]} color={C.pants} />
        <Ball radius={0.13} center={[0, -0.55, 0.04]} scale={[1, 0.5, 1.4]} color={C.shoes} flat />
      </group>
      <group ref={legR} position={[0.13, 0.62, 0]}>
        <Capsule radius={0.1} length={0.25} center={[0, -0.25, 0]} color={C.pants} />
        <Ball radius={0.13} center={[0, -0.55, 0.04]} scale={[1, 0.5, 1.4]} color={C.shoes} flat />
      </group>

      <group ref={body}>
        {/* tronco: cilindro com a roupa pintada, ombros e barra arredondados */}
        <mesh position={[0, 0.87, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.27, 0.27, 0.5, 32, 1, true]} />
          <meshStandardMaterial map={outfit} roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={C.shirt} roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color={C.shirt} roughness={0.85} flatShading />
        </mesh>

        {/* braços e mãos */}
        <group ref={armL} position={[-0.3, 1.1, 0]} rotation={[0, 0, 0.08]}>
          <Capsule radius={0.085} length={0.3} center={[0, -0.24, 0]} color={C.shirt} />
          <Ball radius={0.09} center={[0, -0.5, 0]} color={C.skin} />
        </group>
        <group ref={armR} position={[0.3, 1.1, 0]} rotation={[0, 0, -0.08]}>
          <Capsule radius={0.085} length={0.3} center={[0, -0.24, 0]} color={C.shirt} />
          <Ball radius={0.09} center={[0, -0.5, 0]} color={C.skin} />
        </group>

        {/* pescoço e cabeça */}
        <mesh position={[0, 1.22, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.22, 16]} />
          <meshStandardMaterial color={C.skinShade} roughness={0.85} />
        </mesh>
        <group position={[0, 1.62, 0]}>
          {/* rosto pintado: o centro do canvas fica voltado para +z */}
          <mesh rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.42, 40, 28]} />
            <meshStandardMaterial map={face} roughness={0.9} />
          </mesh>
          <Ball radius={0.07} center={[-0.41, -0.04, 0]} color={C.skin} />
          <Ball radius={0.07} center={[0.41, -0.04, 0]} color={C.skin} />
          {/* cabelo curto e arrumado: calota justa com linha de franja limpa e leve volume no topo */}
          <mesh position={[0, 0.01, -0.01]} rotation={[-0.42, 0, 0]} castShadow>
            <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, 1.55]} />
            <meshStandardMaterial color={C.hair} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.03, 0.05]} rotation={[-0.25, 0, 0]} castShadow>
            <sphereGeometry args={[0.455, 32, 16, 0, Math.PI * 2, 0, 0.95]} />
            <meshStandardMaterial color={C.hair} roughness={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
