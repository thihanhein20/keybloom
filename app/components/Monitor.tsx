import { Html, RoundedBox } from "@react-three/drei";

export function Monitor({typed,active}:{typed:string;active:string}){
  return <group position={[0,.48,-1.35]} scale={.78}>
    <RoundedBox args={[5.7,3.65,.62]} radius={.42} smoothness={8} castShadow receiveShadow><meshStandardMaterial color="#f29a67" roughness={.36}/></RoundedBox>
    <RoundedBox args={[5.08,3.08,.08]} radius={.28} smoothness={7} position={[0,.02,.35]}><meshStandardMaterial color="#7c4f46" roughness={.5}/></RoundedBox>
    <RoundedBox args={[4.64,2.68,.07]} radius={.22} smoothness={6} position={[0,.02,.41]}><meshStandardMaterial color="#241f2a" roughness={.28} emissive="#171322" emissiveIntensity={.5}/></RoundedBox>
    <Html transform position={[0,.02,.46]} distanceFactor={2.85}><div className="screen"><div className="screen-top"><span>PEACH_OS</span><span>● ONLINE</span></div><div className="face">{active?<><i>•</i><b>ᴗ</b><i>•</i></>:<><i>˶</i><b>◡</b><i>˶</i></>}</div><div className="typed">{typed||"type something cozy"}<span className="caret"/></div><div className="screen-bottom">keyboard friend v1.0</div></div></Html>
    <RoundedBox args={[1.42,.62,.82]} radius={.2} smoothness={5} position={[0,-2.02,.08]} castShadow receiveShadow><meshStandardMaterial color="#f5b17f" roughness={.43}/></RoundedBox>
    <RoundedBox args={[3.25,.68,1.42]} radius={.28} smoothness={6} position={[0,-2.48,.12]} castShadow receiveShadow><meshStandardMaterial color="#f3c49d" roughness={.48}/></RoundedBox>
    <RoundedBox args={[2.92,.13,1.18]} radius={.16} smoothness={5} position={[0,-2.17,.12]} receiveShadow><meshStandardMaterial color="#ffd8b6" roughness={.52}/></RoundedBox>
    <RoundedBox args={[1.25,.07,.05]} radius={.025} smoothness={3} position={[-.34,-2.49,.845]}><meshStandardMaterial color="#744e42" roughness={.5}/></RoundedBox>
    <mesh position={[.62,-2.49,.85]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.04,20]}/><meshStandardMaterial color="#8fc9bc" emissive="#70ad9f" emissiveIntensity={.35}/></mesh>
    <mesh position={[.88,-2.49,.85]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.04,20]}/><meshStandardMaterial color="#ef936e" roughness={.42}/></mesh>
    <mesh position={[2.45,-1.42,.32]}><sphereGeometry args={[.06,20,20]}/><meshStandardMaterial color="#ffda78" emissive="#ffb347" emissiveIntensity={2}/></mesh>
  </group>
}
