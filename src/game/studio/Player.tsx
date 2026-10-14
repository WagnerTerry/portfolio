// Personagem cartoon: cabeça grande com o rosto pintado em textura (óculos e sorriso), cabelo
// curto em 3D e corpo arredondado em cápsulas com a camiseta de violão pintada. Movimento em 4
// direções, colisão com os móveis, destino por clique e animação de caminhada. Também dá vida:
// pisca, olha para o mouse, faz gestos quando fica parado, leva um susto ao esbarrar e faz as
// poses das interações (digitar na bancada, tomar café, jogar no pufe, tocar guitarra).

import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { sfx } from "../audio";
import { ActionKind, PLAYER, StationId, STATIONS } from "../content";
import { InputState } from "../input";
import { getState, useGameState } from "../store";
import { Cylinder } from "./Block";
import { pointInRect, resolveMove } from "./collision";
import { Gamepad, GuitarBody } from "./props";
import { Puffs } from "./Puffs";
import { FaceKind, faceTexture, noteTexture, outfitTexture, SHIRT_COLOR, softDotTexture } from "./textures";

const C = {
  skin: "#d9a274",
  skinShade: "#bf8657",
  hair: "#4a2c1a",
  shirt: SHIRT_COLOR,
  pants: "#2c3e6b",
  shoes: "#eceff4",
};

/** altura do pivô em cada pose: sentado = altura do assento menos a do quadril (0.62 × 0.85) */
const POSE_Y: Record<ActionKind, number> = { type: 0.07, drink: 0, play: -0.1, guitar: 0 };

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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = THREE.MathUtils.lerp;
const ease = (k: number) => k * k * (3 - 2 * k);
const wrapAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));
const lerpAngle = (a: number, b: number, k: number) => a + wrapAngle(b - a) * k;
/** 0 → 1 → 0 com platô no meio: entrada e saída suaves dos gestos */
const window01 = (u: number) => (u < 0.25 ? ease(u / 0.25) : u > 0.75 ? ease((1 - u) / 0.25) : 1);

/** Interpola um ângulo pelo caminho mais curto. */
function dampAngle(current: number, target: number, lambda: number, dt: number) {
  const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + diff * (1 - Math.exp(-lambda * dt));
}

type Idle = { kind: "look" | "stretch" | "scratch"; t: number; dir: number };
type Spot = { x: number; z: number; yaw: number };
type Pose = { kind: ActionKind; phase: "go" | "do" | "back"; t: number; from: Spot; to: Spot & { y: number } };

type Limbs = {
  leg: number;
  armLx: number;
  armLz: number;
  armRx: number;
  armRz: number;
  headPitch: number;
  headYaw: number;
  bodyZ: number;
};
const NEUTRAL: Limbs = { leg: 0, armLx: 0, armLz: 0.08, armRx: 0, armRz: -0.08, headPitch: 0, headYaw: 0, bodyZ: 0 };

/** Rotações dos membros em cada pose; t = segundos dentro da pose. O modelo olha para +z. */
function poseLimbs(kind: ActionKind, t: number): Limbs {
  const r = { ...NEUTRAL };
  switch (kind) {
    case "type":
      r.leg = -1.1;
      r.armLx = -1.25 + Math.sin(t * 16) * 0.12;
      r.armRx = -1.25 - Math.sin(t * 16) * 0.12;
      r.armLz = 0.2;
      r.armRz = -0.2;
      r.headPitch = 0.05;
      break;
    case "drink": {
      // ciclo de 3 s: levanta a xícara, bebe, abaixa, espera
      const c = t % 3;
      const up = c < 0.5 ? ease(c / 0.5) : c < 1.6 ? 1 : c < 2.1 ? ease(1 - (c - 1.6) / 0.5) : 0;
      r.armRx = -2.35 * up;
      r.armRz = -0.35 * up;
      r.headPitch = -0.12 * up;
      break;
    }
    case "play":
      r.leg = -1.05;
      r.armLx = -1.05 + Math.sin(t * 14) * 0.04;
      r.armRx = -1.05 + Math.cos(t * 11) * 0.04;
      r.armLz = 0.42;
      r.armRz = -0.42;
      r.headPitch = 0.2;
      break;
    case "guitar":
      r.armLx = -0.7 + Math.sin(t * 12) * 0.25; // mão da palhetada
      r.armLz = 0.6;
      r.armRx = -0.8; // mão no braço da guitarra
      r.armRz = 0.95 + Math.sin(t * 3) * 0.05;
      r.headPitch = 0.15 + Math.sin(t * 6) * 0.08;
      r.headYaw = 0.25;
      r.bodyZ = Math.sin(t * 3) * 0.04;
      break;
  }
  return r;
}

export function Player({ input, positionRef, onStateChange }: PlayerProps) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const cup = useRef<THREE.Group>(null);
  const headMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const faces = useMemo(
    () => ({ open: faceTexture("open"), closed: faceTexture("closed"), wide: faceTexture("wide") }),
    []
  );
  const outfit = useMemo(() => outfitTexture(), []);
  const note = useMemo(() => noteTexture(), []);
  const dot = useMemo(() => softDotTexture(), []);
  const action = useGameState((s) => s.action);
  const { gl, camera, pointer } = useThree();
  const floorRay = useMemo(
    () => ({ ray: new THREE.Ray(), plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit: new THREE.Vector3() }),
    []
  );

  const sim = useRef({
    x: PLAYER.start.x,
    z: PLAYER.start.z,
    y: 0,
    yaw: 0,
    walk: 0,
    phase: 0,
    stepIndex: 0,
    walking: false,
    station: null as StationId | null,
    blinkAt: 2,
    blinkUntil: 0,
    /** ms (performance.now) até quando fica com cara de susto */
    bumpUntil: 0,
    keyAt: 0,
    sipCycle: -1,
    riffAt: 0,
    idleFor: 0,
    idleNext: 5,
    idle: null as Idle | null,
    headYaw: 0,
    headPitch: 0,
    /** s (performance.now/1000) do último movimento do mouse sobre o canvas */
    pointerAt: -10,
    pose: null as Pose | null,
    face: "open" as FaceKind,
  });

  useEffect(() => {
    const element = gl.domElement;
    const onMove = () => {
      sim.current.pointerAt = performance.now() / 1000;
    };
    element.addEventListener("pointermove", onMove);
    return () => element.removeEventListener("pointermove", onMove);
  }, [gl]);

  // gancho para testes manuais no console, só em desenvolvimento (forçar piscar, susto, gestos)
  useEffect(() => {
    if (import.meta.env.DEV) (window as unknown as { __studioSim?: unknown }).__studioSim = sim.current;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const now = state.clock.elapsedTime;
    const ms = performance.now();
    const s = sim.current;
    const game = getState();

    // ----- poses das interações: vai até o lugar, fica fazendo, volta -----
    if (game.action && !s.pose) {
      const station = STATIONS.find((st) => st.action === game.action);
      if (station?.pose) {
        s.pose = {
          kind: game.action,
          phase: "go",
          t: 0,
          from: { x: s.x, z: s.z, yaw: s.yaw },
          to: { ...station.pose, y: POSE_Y[game.action] },
        };
        s.idle = null;
        input.target = null;
        if (game.action === "guitar") {
          sfx.riff();
          s.riffAt = now;
        }
      }
    } else if (!game.action && s.pose && s.pose.phase !== "back") {
      s.pose.phase = "back";
      s.pose.t = 0;
    }

    let moving = false;
    let poseWeight = 0;
    let poseT = 0;
    if (s.pose) {
      const p = s.pose;
      p.t += dt;
      if (p.phase === "do") {
        poseWeight = 1;
        poseT = p.t;
        if (p.kind === "type" && now > s.keyAt) {
          sfx.key();
          s.keyAt = now + 0.07 + Math.random() * 0.13;
        }
        if (p.kind === "drink") {
          const cycle = Math.floor(p.t / 3);
          if (cycle !== s.sipCycle && p.t % 3 > 0.6) {
            s.sipCycle = cycle;
            sfx.sip();
          }
        }
        if (p.kind === "guitar" && now - s.riffAt > 2.6) {
          sfx.riff();
          s.riffAt = now;
        }
      } else {
        const k = ease(Math.min(p.t / 0.45, 1));
        const a = p.phase === "go" ? p.from : p.to;
        const b = p.phase === "go" ? p.to : p.from;
        const ay = p.phase === "go" ? 0 : p.to.y;
        const by = p.phase === "go" ? p.to.y : 0;
        s.x = lerp(a.x, b.x, k);
        s.z = lerp(a.z, b.z, k);
        s.y = lerp(ay, by, k);
        s.yaw = lerpAngle(a.yaw, b.yaw, k);
        poseWeight = p.phase === "go" ? k : 1 - k;
        if (k >= 1) {
          if (p.phase === "go") {
            p.phase = "do";
            p.t = 0;
          } else {
            s.pose = null;
            s.y = 0;
          }
        }
      }
    } else {
      // ----- movimento normal -----
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
      moving = dx !== 0 || dz !== 0;
      if (moving) {
        const length = Math.hypot(dx, dz);
        dx /= length;
        dz /= length;
        const step = PLAYER.speed * dt;
        const next = resolveMove(s.x, s.z, dx * step, dz * step);
        const blocked = Math.abs(next.x - s.x) < 1e-4 && Math.abs(next.z - s.z) < 1e-4;
        if (blocked) {
          // travou num móvel: desiste do destino clicado e faz cara de susto
          input.target = null;
          if (ms > s.bumpUntil + 900) {
            s.bumpUntil = ms + 700;
            sfx.bump();
          }
        }
        s.x = next.x;
        s.z = next.z;
        s.yaw = dampAngle(s.yaw, Math.atan2(dx, dz), 14, dt);
      }
    }

    // ----- gestos quando fica parado -----
    if (!moving && !s.pose) {
      s.idleFor += dt;
      if (!s.idle && s.idleFor > s.idleNext) {
        const kinds: Idle["kind"][] = ["look", "stretch", "scratch"];
        s.idle = { kind: kinds[Math.floor(Math.random() * kinds.length)], t: 0, dir: Math.random() < 0.5 ? -1 : 1 };
      }
    } else {
      s.idleFor = 0;
      s.idle = null;
    }
    let idleW = 0;
    if (s.idle) {
      s.idle.t += dt;
      const duration = s.idle.kind === "look" ? 2.4 : 1.9;
      if (s.idle.t >= duration) {
        s.idle = null;
        s.idleFor = 0;
        s.idleNext = 4 + Math.random() * 5;
      } else {
        idleW = window01(s.idle.t / duration);
      }
    }

    // ----- piscar e cara de susto -----
    if (now > s.blinkAt) {
      s.blinkUntil = now + 0.13;
      s.blinkAt = now + 2.5 + Math.random() * 3.5;
    }
    const face: FaceKind = ms < s.bumpUntil ? "wide" : now < s.blinkUntil ? "closed" : "open";
    if (face !== s.face && headMaterial.current) {
      s.face = face;
      headMaterial.current.map = faces[face];
    }

    // ----- cabeça: pose > gesto > mouse -----
    const limbs = s.pose ? poseLimbs(s.pose.kind, poseT) : NEUTRAL;
    let headYaw = 0;
    let headPitch = 0;
    if (s.pose) {
      headYaw = limbs.headYaw * poseWeight;
      headPitch = limbs.headPitch * poseWeight;
    } else if (s.idle?.kind === "look") {
      headYaw = s.idle.dir * 0.9 * idleW;
    } else if (!moving && ms / 1000 - s.pointerAt < 4) {
      const { ray, plane, hit } = floorRay;
      ray.origin.setFromMatrixPosition(camera.matrixWorld);
      ray.direction.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(ray.origin).normalize();
      if (ray.intersectPlane(plane, hit)) {
        const dx = hit.x - s.x;
        const dz = hit.z - s.z;
        const local = wrapAngle(Math.atan2(dx, dz) - s.yaw);
        if (Math.abs(local) < 1.6) {
          headYaw = clamp(local, -1.1, 1.1);
          headPitch = clamp(Math.atan2(1.4, Math.hypot(dx, dz)) - 0.3, -0.15, 0.55);
        }
      }
    }
    if (s.idle?.kind === "stretch") headPitch -= 0.25 * idleW;
    s.headYaw = THREE.MathUtils.damp(s.headYaw, headYaw, 8, dt);
    s.headPitch = THREE.MathUtils.damp(s.headPitch, headPitch, 8, dt);
    if (head.current) {
      const shake = ms < s.bumpUntil ? Math.sin((ms / 1000) * 40) * 0.08 : 0;
      head.current.rotation.set(s.headPitch, s.headYaw, shake + (s.idle?.kind === "scratch" ? 0.12 * idleW : 0));
    }

    // ----- animação: pernas/braços balançam ao andar, corpo respira parado, poses por cima -----
    s.walk = THREE.MathUtils.damp(s.walk, moving ? 1 : 0, 10, dt);
    if (moving) {
      s.phase += dt * 11;
      const stepIndex = Math.floor(s.phase / Math.PI);
      if (stepIndex !== s.stepIndex) {
        s.stepIndex = stepIndex;
        sfx.step();
      }
    }
    const swing = Math.sin(s.phase) * 0.75 * s.walk;
    const w = poseWeight;
    const mix = (base: number, target: number) => base * (1 - w) + target * w;
    const armLx = mix(-swing * 0.8, limbs.armLx);
    let armRx = mix(swing * 0.8, limbs.armRx);
    let armLz = mix(0.08, limbs.armLz);
    let armRz = mix(-0.08, limbs.armRz);
    if (s.idle?.kind === "stretch") {
      armLz += 2.7 * idleW;
      armRz -= 2.7 * idleW;
    } else if (s.idle?.kind === "scratch") {
      armRx += (-2.6 + Math.sin(s.idle.t * 14) * 0.1) * idleW;
      armRz -= 0.45 * idleW;
    }
    if (legL.current) legL.current.rotation.x = mix(swing, limbs.leg);
    if (legR.current) legR.current.rotation.x = mix(-swing, limbs.leg);
    if (armL.current) armL.current.rotation.set(armLx, 0, armLz);
    if (armR.current) armR.current.rotation.set(armRx, 0, armRz);
    if (body.current) {
      body.current.position.y = Math.abs(Math.cos(s.phase)) * 0.06 * s.walk;
      body.current.scale.y =
        1 + Math.sin(now * 2) * 0.012 * (1 - s.walk) + (s.idle?.kind === "stretch" ? 0.05 * idleW : 0);
      body.current.rotation.z = limbs.bodyZ * w;
    }
    // a xícara fica sempre em pé, compensando a rotação do braço
    if (cup.current) cup.current.rotation.set(-armRx, 0, -armRz);
    if (root.current) {
      root.current.position.set(s.x, s.y, s.z);
      root.current.rotation.y = s.yaw;
    }
    positionRef.current.set(s.x, 0, s.z);

    // estação ao alcance (congela enquanto pausado ou numa pose)
    const station =
      input.paused || s.pose ? s.station : STATIONS.find((st) => pointInRect(s.x, s.z, st.zone))?.id ?? null;
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

        {/* braços e mãos (o braço em +x é o esquerdo do personagem) */}
        <group ref={armL} position={[-0.3, 1.1, 0]} rotation={[0, 0, 0.08]}>
          <Capsule radius={0.085} length={0.3} center={[0, -0.24, 0]} color={C.shirt} />
          <Ball radius={0.09} center={[0, -0.5, 0]} color={C.skin} />
        </group>
        <group ref={armR} position={[0.3, 1.1, 0]} rotation={[0, 0, -0.08]}>
          <Capsule radius={0.085} length={0.3} center={[0, -0.24, 0]} color={C.shirt} />
          <Ball radius={0.09} center={[0, -0.5, 0]} color={C.skin} />
          {action === "drink" && (
            <group ref={cup} position={[0, -0.5, 0]}>
              <Cylinder radius={0.075} height={0.12} at={[0, -0.02, 0.07]} color="#f8f8f8" />
              <Cylinder radius={0.055} height={0.015} at={[0, 0.095, 0.07]} color="#5c3b1e" />
              <Puffs texture={dot} active position={[0, 0.13, 0.07]} count={4} size={0.12} rise={0.3} life={1.2} spread={0.03} opacity={0.35} />
            </group>
          )}
        </group>
        {action === "play" && (
          <group position={[0, 0.76, 0.34]} rotation={[-0.5, 0, 0]}>
            <Gamepad />
          </group>
        )}
        {action === "guitar" && (
          <>
            <group position={[-0.15, 0.42, 0.34]} rotation={[0.15, 0, -1.0]} scale={1.1}>
              <GuitarBody />
            </group>
            <Puffs
              texture={note}
              active
              position={[0.1, 1.0, 0.5]}
              count={5}
              size={0.3}
              rise={0.7}
              life={1.6}
              spread={0.25}
              colors={["#ffe74c", "#00f5ff", "#ff2fd6"]}
              opacity={0.95}
            />
          </>
        )}

        {/* pescoço e cabeça (a cabeça gira sozinha: olha para o mouse, acena, balança no susto) */}
        <mesh position={[0, 1.22, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.22, 16]} />
          <meshStandardMaterial color={C.skinShade} roughness={0.85} />
        </mesh>
        <group ref={head} position={[0, 1.62, 0]}>
          {/* rosto pintado: o centro do canvas fica voltado para +z */}
          <mesh rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.42, 40, 28]} />
            <meshStandardMaterial ref={headMaterial} map={faces.open} roughness={0.9} />
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
