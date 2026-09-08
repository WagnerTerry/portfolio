// Bloco low-poly: caixa apoiada pela base (`at` = [x, chão, z]) com material fosco.

type BlockProps = {
  size: [number, number, number];
  /** centro da base: x, altura da base, z */
  at: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  transparent?: boolean;
  opacity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export function Block({
  size,
  at,
  color,
  rotation,
  emissive,
  emissiveIntensity = 0.6,
  roughness = 0.85,
  transparent,
  opacity,
  castShadow = true,
  receiveShadow = true,
}: BlockProps) {
  return (
    <mesh
      position={[at[0], at[1] + size[1] / 2, at[2]]}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
        transparent={transparent}
        opacity={opacity}
      />
    </mesh>
  );
}

type CylinderProps = {
  radius: number;
  height: number;
  at: [number, number, number];
  color: string;
  radiusTop?: number;
  segments?: number;
  emissive?: string;
};

export function Cylinder({ radius, height, at, color, radiusTop, segments = 24, emissive }: CylinderProps) {
  return (
    <mesh position={[at[0], at[1] + height / 2, at[2]]} castShadow receiveShadow>
      <cylinderGeometry args={[radiusTop ?? radius, radius, height, segments]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? 0.7 : 0}
      />
    </mesh>
  );
}

type SphereProps = { radius: number; at: [number, number, number]; color: string };

export function Sphere({ radius, at, color }: SphereProps) {
  return (
    <mesh position={at} castShadow receiveShadow>
      <sphereGeometry args={[radius, 20, 14]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
  );
}
