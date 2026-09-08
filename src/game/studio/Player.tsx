// Personagem em blocos (topete, óculos, barba, paletó e gravata) com movimento em
// 4 direções, colisão com os móveis, destino por clique e animação de caminhada.

import { MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PLAYER, StationId, STATIONS } from "../content";
import { InputState } from "../input";
import { pointInRect, resolveMove } from "./collision";

const C = {
  skin: "#d49a6c",
  skinShade: "#b57b50",
  hair: "#5a3520",
  beard: "#3a2416",
  jacket: "#3558a8",
  jacketDark: "#264080",
  shirt: "#f4f4f8",
  tie: "#d83a3a",
  pants: "#3f4353",
  shoes: "#1f2129",
  frame: "#2f3340",
  lens: "#dbeefa",
  eye: "#1a1c2c",
};

/** Caixa centrada em `center` (o personagem é montado com o pivô de cada membro no grupo). */
function Cube(props: {
  size: [number, number, number];
  center: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={props.center} rotation={props.rotation} castShadow receiveShadow>
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={props.color} roughness={0.85} />
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
      {/* pernas */}
      <group ref={legL} position={[-0.16, 0.78, 0]}>
        <Cube size={[0.24, 0.7, 0.26]} center={[0, -0.35, 0]} color={C.pants} />
        <Cube size={[0.26, 0.12, 0.36]} center={[0, -0.72, 0.05]} color={C.shoes} />
      </group>
      <group ref={legR} position={[0.16, 0.78, 0]}>
        <Cube size={[0.24, 0.7, 0.26]} center={[0, -0.35, 0]} color={C.pants} />
        <Cube size={[0.26, 0.12, 0.36]} center={[0, -0.72, 0.05]} color={C.shoes} />
      </group>

      <group ref={body}>
        {/* tronco, camisa e gravata */}
        <Cube size={[0.66, 0.72, 0.38]} center={[0, 1.14, 0]} color={C.jacket} />
        <Cube size={[0.22, 0.36, 0.02]} center={[0, 1.32, 0.2]} color={C.shirt} />
        <Cube size={[0.07, 0.34, 0.025]} center={[0, 1.22, 0.205]} color={C.tie} />
        <Cube size={[0.1, 0.4, 0.015]} center={[-0.16, 1.3, 0.2]} color={C.jacketDark} />
        <Cube size={[0.1, 0.4, 0.015]} center={[0.16, 1.3, 0.2]} color={C.jacketDark} />

        {/* braços */}
        <group ref={armL} position={[-0.43, 1.44, 0]}>
          <Cube size={[0.18, 0.66, 0.2]} center={[0, -0.33, 0]} color={C.jacket} />
          <Cube size={[0.16, 0.14, 0.18]} center={[0, -0.72, 0]} color={C.skin} />
        </group>
        <group ref={armR} position={[0.43, 1.44, 0]}>
          <Cube size={[0.18, 0.66, 0.2]} center={[0, -0.33, 0]} color={C.jacket} />
          <Cube size={[0.16, 0.14, 0.18]} center={[0, -0.72, 0]} color={C.skin} />
        </group>

        {/* pescoço e cabeça */}
        <Cube size={[0.18, 0.14, 0.18]} center={[0, 1.55, 0]} color={C.skinShade} />
        <group position={[0, 1.62, 0]}>
          <Cube size={[0.56, 0.56, 0.56]} center={[0, 0.28, 0]} color={C.skin} />
          <Cube size={[0.06, 0.12, 0.1]} center={[-0.3, 0.28, 0]} color={C.skinShade} />
          <Cube size={[0.06, 0.12, 0.1]} center={[0.3, 0.28, 0]} color={C.skinShade} />
          {/* cabelo: tampa, nuca, laterais curtas e topete */}
          <Cube size={[0.6, 0.2, 0.6]} center={[0, 0.55, -0.02]} color={C.hair} />
          <Cube size={[0.6, 0.36, 0.16]} center={[0, 0.34, -0.26]} color={C.hair} />
          <Cube size={[0.06, 0.26, 0.42]} center={[-0.29, 0.4, -0.08]} color={C.hair} />
          <Cube size={[0.06, 0.26, 0.42]} center={[0.29, 0.4, -0.08]} color={C.hair} />
          <Cube size={[0.34, 0.16, 0.3]} center={[0.05, 0.7, 0.14]} color={C.hair} rotation={[0.35, 0, 0.12]} />
          {/* sobrancelhas, óculos e olhos */}
          <Cube size={[0.16, 0.03, 0.02]} center={[-0.13, 0.41, 0.29]} color={C.hair} />
          <Cube size={[0.16, 0.03, 0.02]} center={[0.13, 0.41, 0.29]} color={C.hair} />
          <Cube size={[0.2, 0.14, 0.03]} center={[-0.13, 0.3, 0.29]} color={C.frame} />
          <Cube size={[0.2, 0.14, 0.03]} center={[0.13, 0.3, 0.29]} color={C.frame} />
          <Cube size={[0.15, 0.09, 0.032]} center={[-0.13, 0.3, 0.292]} color={C.lens} />
          <Cube size={[0.15, 0.09, 0.032]} center={[0.13, 0.3, 0.292]} color={C.lens} />
          <Cube size={[0.05, 0.06, 0.02]} center={[-0.12, 0.3, 0.305]} color={C.eye} />
          <Cube size={[0.05, 0.06, 0.02]} center={[0.12, 0.3, 0.305]} color={C.eye} />
          <Cube size={[0.08, 0.03, 0.03]} center={[0, 0.32, 0.29]} color={C.frame} />
          <Cube size={[0.02, 0.02, 0.3]} center={[-0.29, 0.31, 0.14]} color={C.frame} />
          <Cube size={[0.02, 0.02, 0.3]} center={[0.29, 0.31, 0.14]} color={C.frame} />
          {/* nariz, bigode e barba */}
          <Cube size={[0.07, 0.08, 0.06]} center={[0, 0.23, 0.3]} color={C.skinShade} />
          <Cube size={[0.24, 0.05, 0.03]} center={[0, 0.17, 0.29]} color={C.beard} />
          <Cube size={[0.56, 0.16, 0.12]} center={[0, 0.08, 0.24]} color={C.beard} />
          <Cube size={[0.06, 0.22, 0.32]} center={[-0.27, 0.16, 0.12]} color={C.beard} />
          <Cube size={[0.06, 0.22, 0.32]} center={[0.27, 0.16, 0.12]} color={C.beard} />
          <Cube size={[0.1, 0.03, 0.01]} center={[0, 0.12, 0.305]} color="#c9836e" />
        </group>
      </group>
    </group>
  );
}
