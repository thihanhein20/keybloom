"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type LampProps = { darkMode: boolean; onToggle: () => void };

export function Lamp({ darkMode, onToggle }: LampProps) {
  const chain = useRef<THREE.Group>(null!);
  const glow = useRef<THREE.PointLight>(null!);
  const tug = useRef(0);

  useFrame(({ clock }, delta) => {
    tug.current = THREE.MathUtils.damp(tug.current, 0, 8, delta);
    chain.current.rotation.z = Math.sin(clock.elapsedTime * 12) * tug.current * 0.18;
    chain.current.position.y = -tug.current * 0.15;
    glow.current.intensity = THREE.MathUtils.damp(glow.current.intensity, darkMode ? 3 : 0.2, 4, delta);
  });

  const pullChain = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    tug.current = 1;
    onToggle();
  };

  const enamel = darkMode ? "#84718e" : "#ed9b77";
  const metal = darkMode ? "#d8b4bf" : "#fff0d3";

  return (
    <group position={[3.6, -1.71, -1.05]} rotation={[0, -0.18, 0]}>
      {/* Classic, recognisable lamp base */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.82, 0.24, 40]} />
        <meshStandardMaterial color={metal} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.29, 0]} castShadow>
        <sphereGeometry args={[0.48, 32, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.15, 1.38, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.76, 0]} castShadow>
        <sphereGeometry args={[0.19, 24, 18]} />
        <meshStandardMaterial color={metal} roughness={0.28} />
      </mesh>

      {/* Short arm and a deliberately oversized, downward-facing lampshade */}
      <mesh position={[0.28, 1.98, 0.03]} rotation={[0, 0, -0.72]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.66, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.34} />
      </mesh>
      <mesh position={[0.53, 2.14, 0.05]} castShadow>
        <sphereGeometry args={[0.14, 24, 18]} />
        <meshStandardMaterial color={metal} roughness={0.28} />
      </mesh>
      <group position={[0.58, 2.0, 0.06]}>
        <mesh castShadow>
          <coneGeometry args={[0.64, 0.68, 40]} />
          <meshStandardMaterial color={enamel} roughness={0.28} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.055, 40]} />
          <meshStandardMaterial color="#fff4bb" emissive="#ffc15c" emissiveIntensity={darkMode ? 3.2 : 0.5} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <torusGeometry args={[0.53, 0.045, 12, 40]} />
          <meshStandardMaterial color={metal} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.41, 0]}>
          <sphereGeometry args={[0.15, 24, 18]} />
          <meshStandardMaterial color="#fff4bd" emissive="#ffbe54" emissiveIntensity={darkMode ? 3.8 : 0.7} />
        </mesh>
      </group>
      <pointLight ref={glow} position={[0.58, 1.58, 0.35]} color="#ffd17a" intensity={darkMode ? 3 : 0.2} distance={6.5} decay={2} />

      {/* A long, visible pull chain: grab the coral bead to switch the room */}
      <group ref={chain} position={[0.58, 1.7, 0.3]}>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.1, 12]} />
          <meshStandardMaterial color={darkMode ? "#f7c5d1" : "#774b46"} roughness={0.65} />
        </mesh>
        <mesh position={[0, -1.18, 0]} castShadow onPointerDown={pullChain}>
          <sphereGeometry args={[0.17, 28, 20]} />
          <meshStandardMaterial color={darkMode ? "#ff9dbe" : "#e76c58"} emissive={darkMode ? "#ff477d" : "#000000"} emissiveIntensity={darkMode ? 1.2 : 0} roughness={0.3} />
        </mesh>
      </group>
      <RoundedBox args={[0.25, 0.05, 0.14]} radius={0.025} smoothness={3} position={[0.37, 0.13, 0.65]}>
        <meshStandardMaterial color={darkMode ? "#8fc9bc" : "#fff5e1"} emissive={darkMode ? "#69c0ac" : "#000000"} emissiveIntensity={darkMode ? 0.9 : 0} />
      </RoundedBox>
    </group>
  );
}
