"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type LampProps = { darkMode: boolean; onToggle: () => void };

export function Lamp({ darkMode, onToggle }: LampProps) {
  const pullChain = useRef<THREE.Group>(null!);
  const warmLight = useRef<THREE.PointLight>(null!);
  const pullAmount = useRef(0);

  useFrame(({ clock }, delta) => {
    pullAmount.current = THREE.MathUtils.damp(pullAmount.current, 0, 9, delta);
    pullChain.current.rotation.z = Math.sin(clock.elapsedTime * 11) * pullAmount.current * 0.13;
    pullChain.current.position.y = -pullAmount.current * 0.16;
    warmLight.current.intensity = THREE.MathUtils.damp(
      warmLight.current.intensity,
      darkMode ? 3.2 : 0.12,
      4,
      delta,
    );
  });

  const toggle = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    pullAmount.current = 1;
    onToggle();
  };

  const enamel = darkMode ? "#7b677f" : "#ec9a75";
  const trim = darkMode ? "#ead0d4" : "#fff0d6";

  return (
    <group position={[3.62, -1.71, -0.94]} rotation={[0, -0.16, 0]}>
      {/* A simple, unmistakable desk-lamp silhouette: base, post, arm, shade. */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.76, 0.84, 0.24, 40]} />
        <meshStandardMaterial color={trim} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.43, 32, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.04, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.18, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.34} />
      </mesh>
      <mesh position={[0, 1.67, 0]} castShadow>
        <sphereGeometry args={[0.18, 24, 18]} />
        <meshStandardMaterial color={trim} roughness={0.25} />
      </mesh>
      <mesh position={[0.24, 1.84, 0]} rotation={[0, 0, -0.76]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.58, 24]} />
        <meshStandardMaterial color={enamel} roughness={0.34} />
      </mesh>

      {/* Tapered frustum reads as a real lampshade from the camera angle. */}
      <group position={[0.48, 1.94, 0.08]} rotation={[0.16, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.27, 0.64, 0.52, 40]} />
          <meshStandardMaterial color={enamel} roughness={0.27} />
        </mesh>
        <mesh position={[0, -0.275, 0]}>
          <cylinderGeometry args={[0.54, 0.54, 0.045, 40]} />
          <meshStandardMaterial
            color="#fff4bd"
            emissive="#ffc260"
            emissiveIntensity={darkMode ? 3.4 : 0.45}
          />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <sphereGeometry args={[0.15, 24, 18]} />
          <meshStandardMaterial
            color="#fff6c8"
            emissive="#ffbd4a"
            emissiveIntensity={darkMode ? 4 : 0.55}
          />
        </mesh>
      </group>
      <pointLight
        ref={warmLight}
        position={[0.48, 1.55, 0.55]}
        color="#ffd17a"
        intensity={darkMode ? 3.2 : 0.12}
        distance={6.5}
        decay={2}
      />

      {/* The long front-facing chain and big bead are intentionally easy to find and pull. */}
      <group ref={pullChain} position={[0.48, 1.62, 0.58]}>
        <mesh position={[0, -0.63, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 1.26, 12]} />
          <meshStandardMaterial color={darkMode ? "#f7c8d3" : "#653e3d"} roughness={0.65} />
        </mesh>
        <mesh position={[0, -1.36, 0]} castShadow onPointerDown={toggle}>
          <sphereGeometry args={[0.2, 28, 20]} />
          <meshStandardMaterial
            color={darkMode ? "#ff9fbe" : "#e86d58"}
            emissive={darkMode ? "#ff477c" : "#000000"}
            emissiveIntensity={darkMode ? 1.25 : 0}
            roughness={0.28}
          />
        </mesh>
      </group>
    </group>
  );
}
