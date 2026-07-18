"use client";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { KEY_ROWS, type KeyDefinition } from "./keyboard-data";

function Keycap({
  item,
  x,
  z,
  pressed,
  onPress,
  darkMode,
}: {
  item: KeyDefinition;
  x: number;
  z: number;
  pressed: boolean;
  onPress: () => void;
  darkMode: boolean;
}) {
  const ref = useRef<THREE.Group>(null!);
  const glowMaterial=useRef<THREE.MeshStandardMaterial>(null!); const legend=useRef<any>(null!);
  const width = (item.width || 1) * 0.44 - 0.045;
  const skirt =
    item.color === "#8fc9bc" ? "#639d91" : item.color ? "#c96f58" : "#c79576";
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      pressed ? 0.32 : 0.47,
      22,
      delta,
    );
    if(darkMode&&glowMaterial.current){const hue=(state.clock.elapsedTime*.055+x*.065+z*.11+(Math.sin(x*17+z*13)+1)*.04)%1;const color=new THREE.Color().setHSL(hue,.92,.62);glowMaterial.current.color.copy(color);glowMaterial.current.emissive.copy(color);glowMaterial.current.emissiveIntensity=pressed?3.2:1.55;if(legend.current)legend.current.color=color}
  });
  return (
    <group
      ref={ref}
      position={[x, 0.47, z]}
      onPointerDown={(event) => {
        event.stopPropagation();
        onPress();
      }}
    >
      <RoundedBox
        args={[width * 0.92, 0.2, 0.35]}
        radius={0.038}
        smoothness={3}
        position={[0, -0.08, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={darkMode?"#322c38":skirt} roughness={0.58} />
      </RoundedBox>
      <RoundedBox
        args={[width, 0.3, 0.39]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.07, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={darkMode?"#5d5563":item.color || "#ffe2c5"}
          emissive="#000000"
          emissiveIntensity={0}
          roughness={darkMode?.6:.48}
        />
      </RoundedBox>
      <RoundedBox args={[width*.9,.035,.34]} radius={.025} smoothness={3} position={[0,-.2,0]}>
        <meshStandardMaterial ref={glowMaterial} color={darkMode?"#ff4f9a":"#000000"} emissive={darkMode?"#ff4f9a":"#000000"} emissiveIntensity={darkMode?1.55:0} transparent opacity={darkMode?.92:0}/>
      </RoundedBox>
      <Text
        ref={legend}
        position={[0, 0.225, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={item.label.length > 3 ? 0.072 : 0.1}
        color={darkMode?"#fff4e8":"#744e42"}
        anchorX="center"
        anchorY="middle"
      >
        {item.label}
      </Text>
    </group>
  );
}

export function Keyboard({
  pressed,
  onKey,
  darkMode,
}: {
  pressed: Set<string>;
  onKey: (code: string, label: string) => void;
  darkMode: boolean;
}) {
  const keys = useMemo(
    () =>
      KEY_ROWS.map((row, rowIndex) => {
        const total = row.reduce((sum, key) => sum + (key.width || 1), 0);
        let cursor = -total * 0.22;
        return row.map((key) => {
          const width = (key.width || 1) * 0.44;
          const x = cursor + width / 2;
          cursor += width;
          return { key, x, z: rowIndex * 0.44 + 0.08 };
        });
      }),
    [],
  );
  return (
    <group position={[-0.28, -1.58, 0.85]} rotation={[0, 0, 0]} scale={0.88}>
      <RoundedBox
        args={[7.26, 0.42, 2.56]}
        radius={0.18}
        smoothness={5}
        position={[0, -0.01, 0.96]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={darkMode?"#443b4a":"#f3c49d"} roughness={0.55} />
      </RoundedBox>
      <RoundedBox
        args={[7.04, 0.15, 2.36]}
        radius={0.11}
        smoothness={4}
        position={[0, 0.25, 0.96]}
        receiveShadow
      >
        <meshStandardMaterial color={darkMode?"#514354":"#d97958"} roughness={0.66} />
      </RoundedBox>
      {[-3.43, 3.43].map((x) => (
        <RoundedBox
          key={x}
          args={[0.14, 0.2, 2.22]}
          radius={0.04}
          smoothness={3}
          position={[x, 0.36, 0.96]}
          castShadow
        >
          <meshStandardMaterial color={darkMode?"#6b586d":"#ffd8b6"} roughness={0.5} />
        </RoundedBox>
      ))}
      {[-0.15, 2.07].map((z) => (
        <RoundedBox
          key={z}
          args={[6.94, 0.2, 0.14]}
          radius={0.04}
          smoothness={3}
          position={[0, 0.36, z]}
          castShadow
        >
          <meshStandardMaterial color={darkMode?"#6b586d":"#ffd8b6"} roughness={0.5} />
        </RoundedBox>
      ))}
      {keys.flatMap((row, rowIndex) =>
        row.map(({ key, x, z }) => (
          <Keycap
            key={`${rowIndex}-${key.code}`}
            item={key}
            x={x}
            z={z}
            pressed={pressed.has(key.code)}
            onPress={() => onKey(key.code, key.label)}
            darkMode={darkMode}
          />
        )),
      )}
      <RoundedBox args={[6.72,.035,.055]} radius={.018} smoothness={3} position={[0,.38,2.075]}><meshStandardMaterial color={darkMode?"#8fc9bc":"#ffd8b6"} emissive={darkMode?"#70bdae":"#000000"} emissiveIntensity={darkMode?.75:0} transparent opacity={darkMode?.82:0}/></RoundedBox>
    </group>
  );
}
