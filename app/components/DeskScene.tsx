import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { Keyboard } from "./Keyboard";
import { Monitor } from "./Monitor";
import { Mouse } from "./Mouse";
import { Lamp } from "./Lamp";
import type { Difficulty, GamePhase } from "./game-data";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function AnimatedAtmosphere({darkMode}:{darkMode:boolean}){
  const ambient=useRef<THREE.AmbientLight>(null!);const sun=useRef<THREE.DirectionalLight>(null!);const accent=useRef<THREE.PointLight>(null!);const {scene}=useThree();
  const initialDark=useRef(darkMode).current;const initialBackground=initialDark?"#171421":"#f3c69d";
  const palette=useMemo(()=>({day:{background:new THREE.Color("#f3c69d"),ambient:new THREE.Color("#fff0db"),sun:new THREE.Color("#fff1d8"),accent:new THREE.Color("#ef9b68")},night:{background:new THREE.Color("#171421"),ambient:new THREE.Color("#9b8cc8"),sun:new THREE.Color("#b5a3df"),accent:new THREE.Color("#9178c8")}}),[]);
  useFrame((_,delta)=>{const target=darkMode?palette.night:palette.day;const speed=1-Math.exp(-delta*2.5);const background=scene.background as THREE.Color;background?.lerp(target.background,speed);if(scene.fog instanceof THREE.Fog)scene.fog.color.lerp(target.background,speed);ambient.current.color.lerp(target.ambient,speed);sun.current.color.lerp(target.sun,speed);accent.current.color.lerp(target.accent,speed);ambient.current.intensity=THREE.MathUtils.damp(ambient.current.intensity,darkMode?.62:.9,3,delta);sun.current.intensity=THREE.MathUtils.damp(sun.current.intensity,darkMode?1.4:2.05,3,delta);accent.current.intensity=THREE.MathUtils.damp(accent.current.intensity,darkMode?.62:.42,3,delta)});
  return <><color attach="background" args={[initialBackground]}/><fog attach="fog" args={[initialBackground,12,24]}/><ambientLight ref={ambient} intensity={initialDark?.62:.9} color={initialDark?"#9b8cc8":"#fff0db"}/><directionalLight ref={sun} position={[-5,8,6]} intensity={initialDark?1.4:2.05} color={initialDark?"#b5a3df":"#fff1d8"} castShadow shadow-mapSize={[1024,1024]}/><pointLight ref={accent} position={[4,1,2]} intensity={initialDark?.62:.42} color={initialDark?"#9178c8":"#ef9b68"}/></>
}

type Props = {
  pressed: Set<string>;
  typed: string;
  active: string;
  passage: string;
  difficulty: Difficulty;
  minutes: number;
  phase: GamePhase;
  secondsLeft: number;
  accuracy: number;
  streak: number;
  darkMode: boolean;
  musicPlaying: boolean;
  onMusic: () => void;
  onNextTrack: () => void;
  onToggleTheme: () => void;
  onKey: (code: string, label: string) => void;
  selectDifficulty: (value: Difficulty) => void;
  selectMinutes: (value: number) => void;
  start: () => void;
  reset: () => void;
};
export function DeskScene({
  pressed,
  typed,
  active,
  onKey,
  selectDifficulty,
  selectMinutes,
  start,
  reset,
  darkMode,
  musicPlaying,
  onMusic,
  onNextTrack,
  onToggleTheme,
  ...game
}: Props) {
  return (
    <>
      <AnimatedAtmosphere darkMode={darkMode}/>
      <Float speed={1.1} rotationIntensity={0.008} floatIntensity={0}>
        <group position={[0, 0, 4]} rotation={[0, 0.04, 0]}>
          <Monitor
            typed={typed}
            active={active}
            {...game}
            onDifficulty={selectDifficulty}
            onMinutes={selectMinutes}
            onStart={start}
            onReset={reset}
            musicPlaying={musicPlaying}
            onMusic={onMusic}
            onNextTrack={onNextTrack}
          />
          <Keyboard pressed={pressed} onKey={onKey} darkMode={darkMode}/>
          <Mouse darkMode={darkMode}/>
          <Lamp darkMode={darkMode} onToggle={onToggleTheme}/>
        </group>
      </Float>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.72, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={darkMode?"#211b2b":"#dfaa78"} roughness={0.9} />
      </mesh>
      <ContactShadows
        position={[0, -1.695, 4.7]}
        opacity={darkMode?.65:.48}
        scale={13}
        blur={1.75}
        far={3}
        frames={1}
      />
      {!darkMode && (
        <Environment preset="apartment" environmentIntensity={0.45} />
      )}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom={false}
        target={[0, -0.78, 1.25]}
        minAzimuthAngle={-0.16}
        maxAzimuthAngle={0.16}
        minPolarAngle={1.0}
        maxPolarAngle={1.2}
      />
    </>
  );
}
