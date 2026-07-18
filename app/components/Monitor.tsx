import { Html, RoundedBox, Text } from "@react-three/drei";
import type { Difficulty, GamePhase } from "./game-data";

type Props = {
  typed: string;
  active: string;
  passage: string;
  difficulty: Difficulty;
  minutes: number;
  phase: GamePhase;
  secondsLeft: number;
  accuracy: number;
  streak: number;
  onDifficulty: (value: Difficulty) => void;
  onMinutes: (value: number) => void;
  onStart: () => void;
  onReset: () => void;
  musicPlaying: boolean;
  onMusic: () => void;
  onNextTrack: () => void;
};
export function Monitor({
  typed,
  active,
  passage,
  difficulty,
  minutes,
  phase,
  secondsLeft,
  accuracy,
  streak,
  onDifficulty,
  onMinutes,
  onStart,
  onReset,
  musicPlaying,
  onMusic,
  onNextTrack,
}: Props) {
  const clock = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const windowStart = Math.max(0, typed.length - 34);
  const practice = passage.slice(windowStart, windowStart + 92);
  return (
    <group position={[0, 0.88, -1.35]} scale={0.99}>
      <RoundedBox
        args={[5.7, 3.65, 0.62]}
        radius={0.42}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f29a67" roughness={0.36} />
      </RoundedBox>
      <RoundedBox
        args={[5.08, 3.08, 0.08]}
        radius={0.28}
        smoothness={7}
        position={[0, 0.02, 0.35]}
      >
        <meshStandardMaterial color="#7c4f46" roughness={0.5} />
      </RoundedBox>
      <RoundedBox
        args={[4.64, 2.68, 0.07]}
        radius={0.22}
        smoothness={6}
        position={[0, 0.02, 0.41]}
      >
        <meshStandardMaterial
          color="#241f2a"
          roughness={0.28}
          emissive="#171322"
          emissiveIntensity={0.5}
        />
      </RoundedBox>
      <Html
        transform
        position={[0, 0.02, 0.46]}
        distanceFactor={2.85}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="screen"
          onPointerDown={(event) => event.stopPropagation()}
        >
          {phase === "setup" ? (
            <>
              <div className="screen-top">
                <span>KEYBLOOM TRAINING</span>
                <span>● READY</span>
              </div>
              <div className="setup-kicker">NEW SESSION / LOCAL MODE</div>
              <div className="setup-title">Find your flow.</div>
              <div className="level-picker" aria-label="Difficulty">
                {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
                  <button
                    type="button"
                    key={level}
                    className={difficulty === level ? "selected" : ""}
                    onClick={() => onDifficulty(level)}
                  >
                    <small>{level === "easy" ? "01" : level === "medium" ? "02" : "03"}</small>
                    <span>{level}</span>
                  </button>
                ))}
              </div>
              <div className="time-picker">
                <span>duration</span>
                <input aria-label="Practice duration" type="range" min="1" max="5" step="1" value={minutes} onChange={event => onMinutes(Number(event.target.value))}/>
                <b>{minutes}<small> min</small></b>
              </div>
              <button type="button" className="start-button" onClick={onStart}>
                <span>begin session</span><i>↗</i>
              </button>
              <div className="screen-bottom">
                keys 1–3 choose · arrows set time · enter begins
              </div>
            </>
          ) : (
            <>
              <div className="screen-top">
                <span>{difficulty.toUpperCase()} MODE</span>
                <span>{clock}</span>
              </div>
              <div className="practice-line">
                {practice.split("").map((char, index) => {
                  const absolute = windowStart + index;
                  const state =
                    absolute < typed.length
                      ? typed[absolute] === char
                        ? "correct"
                        : "wrong"
                      : absolute === typed.length
                        ? "current"
                        : "";
                  return char==="\n"?<span className="line-break" key={`${absolute}-${index}`}/>:<span className={state} key={`${absolute}-${index}`}>{char}</span>;
                })}
              </div>
              <div className="game-meta">
                <span>{accuracy}% accurate</span>
                <span className={streak>12?"flow-hot":""}>✦ flow {streak}</span>
                <span>
                  {typed.length}/{passage.length}
                </span>
              </div>
              {phase === "finished" && (
                <div className="finished-card">
                  <b>nice rhythm!</b>
                  <button type="button" onClick={onReset}>
                    play again
                  </button>
                </div>
              )}
              <div className="screen-bottom">
                {active ? `key: ${active}` : "keep a gentle, steady pace"}
              </div>
            </>
          )}
        </div>
      </Html>
      <RoundedBox
        args={[1.42, 0.62, 0.82]}
        radius={0.2}
        smoothness={5}
        position={[0, -2.02, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f5b17f" roughness={0.43} />
      </RoundedBox>
      <RoundedBox
        args={[3.25, 0.68, 1.42]}
        radius={0.28}
        smoothness={6}
        position={[0, -2.48, 0.12]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#f3c49d" roughness={0.48} />
      </RoundedBox>
      <RoundedBox
        args={[2.92, 0.13, 1.18]}
        radius={0.16}
        smoothness={5}
        position={[0, -2.17, 0.12]}
        receiveShadow
      >
        <meshStandardMaterial color="#ffd8b6" roughness={0.52} />
      </RoundedBox>
      <RoundedBox
        args={[1.25, 0.07, 0.05]}
        radius={0.025}
        smoothness={3}
        position={[-0.34, -2.49, 0.845]}
      >
        <meshStandardMaterial color="#744e42" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[.3,.12,.2]} radius={.05} smoothness={4} position={[.58,-2.43,.82]} onPointerDown={event=>{event.stopPropagation();onMusic()}} castShadow><meshStandardMaterial color={musicPlaying?"#8fc9bc":"#ddb28e"} emissive={musicPlaying?"#70ad9f":"#000000"} emissiveIntensity={musicPlaying?.55:0} roughness={.4}/></RoundedBox>
      <Text position={[.58,-2.42,.93]} rotation={[-Math.PI/2,0,0]} fontSize={.1} color="#382b32" anchorX="center" anchorY="middle">{musicPlaying?"Ⅱ":"▶"}</Text>
      <RoundedBox args={[.3,.12,.2]} radius={.05} smoothness={4} position={[.98,-2.43,.82]} onPointerDown={event=>{event.stopPropagation();onNextTrack()}} castShadow><meshStandardMaterial color="#ef936e" roughness={.4}/></RoundedBox>
      <Text position={[.98,-2.42,.93]} rotation={[-Math.PI/2,0,0]} fontSize={.1} color="#382b32" anchorX="center" anchorY="middle">»</Text>
      <mesh position={[2.45, -1.42, 0.32]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshStandardMaterial
          color="#ffda78"
          emissive="#ffb347"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}
