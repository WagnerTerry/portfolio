// Losangos flutuantes sobre as estações; o da estação ao alcance cresce e brilha mais.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { StationId, STATIONS } from "../content";

export function Markers({ active }: { active: StationId | null }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const station = STATIONS[i];
      const on = station.id === active;
      mesh.position.y = station.marker[1] + Math.sin(t * 2.2 + i) * 0.12;
      mesh.rotation.y = t * 1.3;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, on ? 1.5 : 1, 8, 1 / 60));
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = on ? 1.8 : 0.7;
    });
  });

  return (
    <>
      {STATIONS.map((station, i) => (
        <mesh
          key={station.id}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={station.marker}
        >
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#ffd54f" emissive="#ffd54f" emissiveIntensity={0.7} roughness={0.4} />
        </mesh>
      ))}
    </>
  );
}
