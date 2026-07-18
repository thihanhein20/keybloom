import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import { Keyboard } from "./Keyboard";
import { Monitor } from "./Monitor";
import { Mouse } from "./Mouse";

type Props={pressed:Set<string>;typed:string;active:string;onKey:(code:string,label:string)=>void};
export function DeskScene({pressed,typed,active,onKey}:Props){
  return <><color attach="background" args={["#f7cfa7"]}/><fog attach="fog" args={["#f7cfa7",12,24]}/><ambientLight intensity={1.6}/><directionalLight position={[-5,8,6]} intensity={3.2} color="#fff1d8" castShadow shadow-mapSize={[2048,2048]}/><pointLight position={[5,1,3]} intensity={1.4} color="#ffd08c"/>
    <Float speed={1.1} rotationIntensity={.018} floatIntensity={.035}><group rotation={[0,.04,0]}><Monitor typed={typed} active={active}/><Keyboard pressed={pressed} onKey={onKey}/><Mouse/></group></Float>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.72,0]} receiveShadow><planeGeometry args={[40,40]}/><meshStandardMaterial color="#efb982" roughness={.83}/></mesh><ContactShadows position={[0,-1.69,0]} opacity={.38} scale={14} blur={2.4} far={5}/><Environment preset="apartment"/><OrbitControls makeDefault enablePan={false} enableRotate enableZoom={false} target={[0,-.72,.62]} minAzimuthAngle={-.16} maxAzimuthAngle={.16} minPolarAngle={.88} maxPolarAngle={1.06}/>
  </>
}
