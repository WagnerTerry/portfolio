// Luzes da sala com transição suave entre dia e noite: de dia, sol pela janela e luz ambiente;
// de noite, a luminária vira a fonte principal (com sombras) e as telas, o led do console e o
// letreiro neon ganham luzes pontuais coloridas.

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { getState } from "../store";

export function Lights() {
  const ambient = useRef<THREE.AmbientLight>(null);
  const hemisphere = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const lamp = useRef<THREE.PointLight>(null);
  const tv = useRef<THREE.PointLight>(null);
  const neon = useRef<THREE.PointLight>(null);
  const monitor = useRef<THREE.PointLight>(null);
  const { scene } = useThree();
  const colors = useMemo(
    () => ({
      dayBackground: new THREE.Color("#1a1c2c"),
      nightBackground: new THREE.Color("#07081a"),
      sunDay: new THREE.Color("#ffffff"),
      sunNight: new THREE.Color("#7f8fff"),
    }),
    []
  );
  const mix = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    mix.current = THREE.MathUtils.damp(mix.current, getState().night ? 1 : 0, 3, dt);
    const m = mix.current;
    const lerp = THREE.MathUtils.lerp;
    if (ambient.current) ambient.current.intensity = lerp(0.5, 0.13, m);
    if (hemisphere.current) hemisphere.current.intensity = lerp(0.55, 0.16, m);
    if (sun.current) {
      sun.current.intensity = lerp(1.8, 0.12, m);
      sun.current.color.lerpColors(colors.sunDay, colors.sunNight, m);
    }
    if (lamp.current) {
      lamp.current.intensity = m * 55;
      lamp.current.castShadow = m > 0.05;
    }
    if (tv.current) tv.current.intensity = m * 6;
    if (neon.current) neon.current.intensity = m * 10;
    if (monitor.current) monitor.current.intensity = m * 4;
    if (scene.background instanceof THREE.Color) {
      scene.background.lerpColors(colors.dayBackground, colors.nightBackground, m);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.5} />
      <hemisphereLight ref={hemisphere} args={["#dfe9ff", "#8a6a4a", 0.55]} />
      <directionalLight
        ref={sun}
        position={[6, 12, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
      />
      <pointLight
        ref={lamp}
        position={[6.3, 2.0, -1.0]}
        color="#ffd9a0"
        intensity={0}
        distance={12}
        decay={2}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.002}
      />
      <pointLight ref={tv} position={[5, 1.1, 1.0]} color="#6fa8ff" intensity={0} distance={5} decay={2} />
      <pointLight ref={neon} position={[2.2, 2.8, -5.4]} color="#00f5ff" intensity={0} distance={7} decay={2} />
      <pointLight ref={monitor} position={[-2, 1.6, -4.6]} color="#9adcf8" intensity={0} distance={5} decay={2} />
    </>
  );
}
