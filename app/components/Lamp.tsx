"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type LampProps = {
  darkMode: boolean;
  onToggle: () => void;
};

export function Lamp({ darkMode, onToggle }: LampProps) {
  const pull = useRef<THREE.Group>(null!);
  const bulb = useRef<THREE.PointLight>(null!);
  const tug = useRef(0);

  useFrame(({ clock }, delta) => {
    tug.current = THREE.MathUtils.damp(tug.current, 0, 7, delta);
    pull.current.rotation.z = Math.sin(clock.elapsedTime * 10) * tug.current * 0.16;
    pull.current.position.y = -tug.current * 0.12;
    bulb.current.intensity = THREE.MathUtils.damp(
      bulb.current.intensity,
      darkMode ? 2.2 : 0.5,
      3.5,
      delta,
    );
  });

  const toggle = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    tug.current = 1;
    onToggle();
  };

  const body = darkMode ? "#5f5066" : "#db8364";
  const trim = darkMode ? "#a48aab" : "#f5bd96";

  return (
    <group position={[3.55, -1.7, -1.78]} rotation={[0, -0.18, 0]}>
      {/* low, weighted base keeps the lamp grounded on the desk */}
      <mesh castShadow receiveShadow position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.7, 0.78, 0.25, 40]} />
        <meshStandardMaterial color={trim} roughness={0.42} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.52, 32, 24]} />
        <meshStandardMaterial color={body} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.18, 24, 18]} />
        <meshStandardMaterial color={trim} roughness={0.38} />
      </mesh>

      {/* a softly bent retro arm */}
      <mesh castShadow position={[-0.24, 1.22, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.12, 0.14, 0.9, 24]} />
        <meshStandardMaterial color={body} roughness={0.38} />
      </mesh>
      <mesh castShadow position={[-0.5, 1.59, 0]}>
        <sphereGeometry args={[0.16, 24, 18]} />
        <meshStandardMaterial color={trim} roughness={0.38} />
      </mesh>
      <mesh castShadow position={[-0.72, 1.75, 0.03]} rotation={[0, 0, -0.68]}>
        <cylinderGeometry args={[0.12, 0.14, 0.62, 24]} />
        <meshStandardMaterial color={body} roughness={0.38} />
      </mesh>

      {/* angled shade, open on the bottom with a warm diffuser */}
      <group position={[-0.92, 1.96, 0.05]} rotation={[0.08, 0, -0.68]}>
        <mesh castShadow>
          <coneGeometry args={[0.47, 0.55, 32, 1, true]} />
          <meshStandardMaterial color={trim} side={THREE.DoubleSide} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.035, 32]} />
          <meshStandardMaterial color="#fff1b2" emissive="#ffcf72" emissiveIntensity={darkMode ? 2.2 : 0.65} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <torusGeometry args={[0.38, 0.038, 12, 32]} />
          <meshStandardMaterial color="#fff4de" roughness={0.28} />
        </mesh>
      </group>
      <pointLight ref={bulb} position={[-0.95, 1.7, 0.35]} color="#ffd789" intensity={darkMode ? 2.2 : 0.5} distance={5.3} decay={2} />

      {/* pull string: the small coral bead is the theme switch */}
      <group ref={pull} position={[-1.25, 1.48, 0.16]}>
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.017, 0.017, 0.96, 10]} />
          <meshStandardMaterial color={darkMode ? "#f5bfd0" : "#8d564d"} roughness={0.78} />
        </mesh>
        <mesh position={[0, -1.02, 0]} castShadow onPointerDown={toggle}>
          <sphereGeometry args={[0.14, 24, 18]} />
          <meshStandardMaterial color={darkMode ? "#ff9cc0" : "#ea755d"} emissive={darkMode ? "#ff4d88" : "#000000"} emissiveIntensity={darkMode ? 0.9 : 0} roughness={0.36} />
        </mesh>
      </group>
      <RoundedBox args={[0.28, 0.06, 0.15]} radius={0.03} smoothness={3} position={[0.22, 0.12, 0.63]}>
        <meshStandardMaterial color={darkMode ? "#8fc9bc" : "#fff0d9"} emissive={darkMode ? "#70c9ba" : "#000000"} emissiveIntensity={darkMode ? 0.75 : 0} />
      </RoundedBox>
    </group>
  );
}
