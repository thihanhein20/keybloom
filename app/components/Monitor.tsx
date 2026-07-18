import { Html, RoundedBox } from "@react-three/drei";
import type { Difficulty, GamePhase } from "./game-data";

type Props={typed:string;active:string;passage:string;difficulty:Difficulty;minutes:number;phase:GamePhase;secondsLeft:number;accuracy:number;onDifficulty:(value:Difficulty)=>void;onMinutes:(value:number)=>void;onStart:()=>void;onReset:()=>void};
export function Monitor({typed,active,passage,difficulty,minutes,phase,secondsLeft,accuracy,onDifficulty,onMinutes,onStart,onReset}:Props){
  const clock=`${String(Math.floor(secondsLeft/60)).padStart(2,"0")}:${String(secondsLeft%60).padStart(2,"0")}`;
  const windowStart=Math.max(0,typed.length-34); const practice=passage.slice(windowStart,windowStart+92);
  return <group position={[0,.48,-1.35]} scale={.78}>
    <RoundedBox args={[5.7,3.65,.62]} radius={.42} smoothness={8} castShadow receiveShadow><meshStandardMaterial color="#f29a67" roughness={.36}/></RoundedBox>
    <RoundedBox args={[5.08,3.08,.08]} radius={.28} smoothness={7} position={[0,.02,.35]}><meshStandardMaterial color="#7c4f46" roughness={.5}/></RoundedBox>
    <RoundedBox args={[4.64,2.68,.07]} radius={.22} smoothness={6} position={[0,.02,.41]}><meshStandardMaterial color="#241f2a" roughness={.28} emissive="#171322" emissiveIntensity={.5}/></RoundedBox>
    <Html transform position={[0,.02,.46]} distanceFactor={2.85}><div className="screen">{phase==="setup"?<><div className="screen-top"><span>KEYBLOOM TRAINING</span><span>● READY</span></div><div className="setup-title">choose your rhythm</div><div className="level-picker">{(["easy","medium","hard"] as Difficulty[]).map(level=><button key={level} className={difficulty===level?"selected":""} onClick={()=>onDifficulty(level)}>{level}</button>)}</div><div className="time-picker"><button onClick={()=>onMinutes(Math.max(1,minutes-1))}>−</button><b>{minutes}:00</b><button onClick={()=>onMinutes(Math.min(5,minutes+1))}>+</button></div><button className="start-button" onClick={onStart}>start practice</button><div className="screen-bottom">1–5 minutes · everything stays local</div></>:<><div className="screen-top"><span>{difficulty.toUpperCase()} MODE</span><span>{clock}</span></div><div className="practice-line">{practice.split("").map((char,index)=>{const absolute=windowStart+index;const state=absolute<typed.length?(typed[absolute]===char?"correct":"wrong"):absolute===typed.length?"current":"";return <span className={state} key={`${absolute}-${index}`}>{char}</span>})}</div><div className="game-meta"><span>{accuracy}% accurate</span><span>{typed.length}/{passage.length}</span></div>{phase==="finished"&&<div className="finished-card"><b>nice rhythm!</b><button onClick={onReset}>play again</button></div>}<div className="screen-bottom">{active?`key: ${active}`:"keep a gentle, steady pace"}</div></>}</div></Html>
    <RoundedBox args={[1.42,.62,.82]} radius={.2} smoothness={5} position={[0,-2.02,.08]} castShadow receiveShadow><meshStandardMaterial color="#f5b17f" roughness={.43}/></RoundedBox>
    <RoundedBox args={[3.25,.68,1.42]} radius={.28} smoothness={6} position={[0,-2.48,.12]} castShadow receiveShadow><meshStandardMaterial color="#f3c49d" roughness={.48}/></RoundedBox>
    <RoundedBox args={[2.92,.13,1.18]} radius={.16} smoothness={5} position={[0,-2.17,.12]} receiveShadow><meshStandardMaterial color="#ffd8b6" roughness={.52}/></RoundedBox>
    <RoundedBox args={[1.25,.07,.05]} radius={.025} smoothness={3} position={[-.34,-2.49,.845]}><meshStandardMaterial color="#744e42" roughness={.5}/></RoundedBox>
    <mesh position={[.62,-2.49,.85]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.04,20]}/><meshStandardMaterial color="#8fc9bc" emissive="#70ad9f" emissiveIntensity={.35}/></mesh>
    <mesh position={[.88,-2.49,.85]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.04,20]}/><meshStandardMaterial color="#ef936e" roughness={.42}/></mesh>
    <mesh position={[2.45,-1.42,.32]}><sphereGeometry args={[.06,20,20]}/><meshStandardMaterial color="#ffda78" emissive="#ffb347" emissiveIntensity={2}/></mesh>
  </group>
}
