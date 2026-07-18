import { Html, RoundedBox } from "@react-three/drei";

export function Monitor({typed,active}:{typed:string;active:string}){
  return <group position={[0,.98,-1.35]} scale={.78}>
    <RoundedBox args={[5.7,3.65,.62]} radius={.42} smoothness={8} castShadow receiveShadow><meshStandardMaterial color="#f29a67" roughness={.36}/></RoundedBox>
    <RoundedBox args={[5.08,3.08,.08]} radius={.28} smoothness={7} position={[0,.02,.35]}><meshStandardMaterial color="#7c4f46" roughness={.5}/></RoundedBox>
    <RoundedBox args={[4.64,2.68,.07]} radius={.22} smoothness={6} position={[0,.02,.41]}><meshStandardMaterial color="#241f2a" roughness={.28} emissive="#171322" emissiveIntensity={.5}/></RoundedBox>
    <Html transform position={[0,.02,.46]} distanceFactor={2.85}><div className="screen"><div className="screen-top"><span>PEACH_OS</span><span>● ONLINE</span></div><div className="face">{active?<><i>•</i><b>ᴗ</b><i>•</i></>:<><i>˶</i><b>◡</b><i>˶</i></>}</div><div className="typed">{typed||"type something cozy"}<span className="caret"/></div><div className="screen-bottom">keyboard friend v1.0</div></div></Html>
    <mesh position={[0,-2.15,.15]} castShadow><cylinderGeometry args={[.62,.78,.85,32]}/><meshStandardMaterial color="#df7d54" roughness={.45}/></mesh>
    <RoundedBox args={[2.5,.22,1.2]} radius={.18} smoothness={4} position={[0,-2.6,.15]} castShadow><meshStandardMaterial color="#d76f50" roughness={.48}/></RoundedBox>
    <mesh position={[2.45,-1.42,.32]}><sphereGeometry args={[.06,20,20]}/><meshStandardMaterial color="#ffda78" emissive="#ffb347" emissiveIntensity={2}/></mesh>
  </group>
}
