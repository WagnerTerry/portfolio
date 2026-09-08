// Câmera alta e inclinada que segue o personagem com suavização.

import { MutableRefObject, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { CAMERA_OFFSET } from "../content";

export function CameraRig({ target }: { target: MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(target.current.x, 0.9, target.current.z));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = target.current;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, t.x + CAMERA_OFFSET[0], 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, t.y + CAMERA_OFFSET[1], 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, t.z + CAMERA_OFFSET[2], 4, dt);
    look.current.x = THREE.MathUtils.damp(look.current.x, t.x, 4, dt);
    look.current.z = THREE.MathUtils.damp(look.current.z, t.z, 4, dt);
    camera.lookAt(look.current);
  });

  return null;
}
