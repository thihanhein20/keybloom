import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { Keyboard } from "./Keyboard";
import { Monitor } from "./Monitor";
import { Mouse } from "./Mouse";
import type { Difficulty, GamePhase } from "./game-data";

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
  rgbColor: string;
  musicPlaying: boolean;
  onMusic: () => void;
  onNextTrack: () => void;
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
  rgbColor,
  musicPlaying,
  onMusic,
  onNextTrack,
  ...game
}: Props) {
  return (
    <>
      <color attach="background" args={[darkMode?"#171421":"#f3c69d"]} />
      <fog attach="fog" args={[darkMode?"#171421":"#f3c69d", 12, 24]} />
      <ambientLight intensity={darkMode?.42:.9} color={darkMode?"#8577b8":"#fff0db"}/>
      <directionalLight
        position={[-5, 8, 6]}
        intensity={darkMode?1.25:2.05}
        color={darkMode?"#9c8cce":"#fff1d8"}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[4,1,2]} intensity={darkMode?.5:.42} color={darkMode?rgbColor:"#ef9b68"}/>
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
          <Keyboard pressed={pressed} onKey={onKey} darkMode={darkMode} rgbColor={rgbColor}/>
          <Mouse darkMode={darkMode}/>
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
