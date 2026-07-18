import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import { Keyboard } from "./Keyboard";
import { Monitor } from "./Monitor";
import { Mouse } from "./Mouse";
import type { Difficulty, GamePhase } from "./game-data";

type Props={pressed:Set<string>;typed:string;active:string;passage:string;difficulty:Difficulty;minutes:number;phase:GamePhase;secondsLeft:number;accuracy:number;onKey:(code:string,label:string)=>void;selectDifficulty:(value:Difficulty)=>void;selectMinutes:(value:number)=>void;start:()=>void;reset:()=>void};
export function DeskScene({pressed,typed,active,onKey,selectDifficulty,selectMinutes,start,reset,...game}:Props){
  return <><color attach="background" args={["#f7cfa7"]}/><fog attach="fog" args={["#f7cfa7",12,24]}/><ambientLight intensity={1.6}/><directionalLight position={[-5,8,6]} intensity={3.2} color="#fff1d8" castShadow shadow-mapSize={[2048,2048]}/><pointLight position={[5,1,3]} intensity={1.4} color="#ffd08c"/>
    <Float speed={1.1} rotationIntensity={.008} floatIntensity={0}><group position={[0,0,.72]} rotation={[0,.04,0]}><Monitor typed={typed} active={active} {...game} onDifficulty={selectDifficulty} onMinutes={selectMinutes} onStart={start} onReset={reset}/><Keyboard pressed={pressed} onKey={onKey}/><Mouse/></group></Float>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.72,0]} receiveShadow><planeGeometry args={[40,40]}/><meshStandardMaterial color="#efb982" roughness={.83}/></mesh><ContactShadows position={[0,-1.695,.7]} opacity={.5} scale={13} blur={1.75} far={3}/><Environment preset="apartment"/><OrbitControls makeDefault enablePan={false} enableRotate enableZoom={false} target={[0,-.78,1.25]} minAzimuthAngle={-.16} maxAzimuthAngle={.16} minPolarAngle={.88} maxPolarAngle={1.06}/>
  </>
}
