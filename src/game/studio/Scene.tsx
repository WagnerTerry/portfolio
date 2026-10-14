// Cena 3D do estúdio: luzes, sala, móveis, marcadores, personagem e câmera.

import { useCallback, useRef } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import { CAMERA_OFFSET, PLAYER, StationId, STATIONS } from "../content";
import { InputState } from "../input";
import { CameraRig } from "./CameraRig";
import { Lights } from "./Lights";
import { Markers } from "./Markers";
import { Player, PlayerState } from "./Player";
import { Props } from "./props";
import { Room } from "./Room";

type SceneProps = {
  input: InputState;
  activeStation: StationId | null;
  onStateChange: (state: PlayerState) => void;
};

export function Scene({ input, activeStation, onStateChange }: SceneProps) {
  const positionRef = useRef(new THREE.Vector3(PLAYER.start.x, 0, PLAYER.start.z));

  const onFloorPointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (event.button !== 0 || input.paused) return;
      event.stopPropagation();
      input.target = { x: event.point.x, z: event.point.z };
    },
    [input]
  );

  const onStation = useCallback(
    (id: StationId) => {
      if (input.paused) return;
      const station = STATIONS.find((s) => s.id === id);
      if (station) input.target = { ...station.approach };
    },
    [input]
  );

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.5]}
      camera={{
        position: [
          PLAYER.start.x + CAMERA_OFFSET[0],
          CAMERA_OFFSET[1],
          PLAYER.start.z + CAMERA_OFFSET[2],
        ],
        fov: 42,
        near: 0.1,
        far: 80,
      }}
    >
      <color attach="background" args={["#1a1c2c"]} />
      <Lights />
      <Room onFloorPointerDown={onFloorPointerDown} />
      <Props onStation={onStation} />
      <Markers active={activeStation} />
      <Player input={input} positionRef={positionRef} onStateChange={onStateChange} />
      <CameraRig target={positionRef} />
    </Canvas>
  );
}
