"use client";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Lamp({darkMode,onToggle}:{darkMode:boolean;onToggle:()=>void}){
  const cord=useRef<THREE.Group>(null!); const light=useRef<THREE.PointLight>(null!); const tug=useRef(0);
  useFrame((state,delta)=>{tug.current=THREE.MathUtils.damp(tug.current,0,8,delta);cord.current.position.y=-tug.current*.16;cord.current.rotation.z=Math.sin(state.clock.elapsedTime*7)*tug.current*.08;light.current.intensity=THREE.MathUtils.damp(light.current.intensity,darkMode?2.2:.55,3,delta)});
  const pull=(event:{stopPropagation:()=>void})=>{event.stopPropagation();tug.current=1;onToggle()};
  return <group position={[3.42,-1.08,-2.05]} rotation={[0,-.12,0]}>
    <mesh position={[0,.08,0]} castShadow receiveShadow><sphereGeometry args={[.72,32,24]}/><meshStandardMaterial color={darkMode?"#584656":"#e79571"} roughness={.45}/></mesh>
    <RoundedBox args={[1.42,.16,1.25]} radius={.12} smoothness={5} position={[0,-.18,0]} castShadow receiveShadow><meshStandardMaterial color={darkMode?"#47394c":"#f4c49d"} roughness={.55}/></RoundedBox>
    <mesh position={[0,.66,0]} castShadow><cylinderGeometry args={[.16,.22,.95,24]}/><meshStandardMaterial color={darkMode?"#765b70":"#d67859"} roughness={.42}/></mesh>
    <mesh position={[0,1.16,0]} castShadow><sphereGeometry args={[.27,24,20]}/><meshStandardMaterial color={darkMode?"#9c7893":"#f0a277"} roughness={.4}/></mesh>
    <mesh position={[-.35,1.63,0]} rotation={[0,0,.62]} castShadow><cylinderGeometry args={[.12,.16,1.05,24]}/><meshStandardMaterial color={darkMode?"#806780":"#dc825f"} roughness={.42}/></mesh>
    <group position={[-.73,2.05,.02]} rotation={[0,0,-.58]}>
      <mesh castShadow><coneGeometry args={[.6,.7,32,1,true]}/><meshStandardMaterial color={darkMode?"#7d6680":"#f4b28a"} roughness={.38} side={THREE.DoubleSide}/></mesh>
      <mesh position={[0,-.355,0]}><cylinderGeometry args={[.43,.43,.045,32]}/><meshStandardMaterial color="#fff1ac" emissive="#ffd971" emissiveIntensity={darkMode?2.5:.8}/></mesh>
      <mesh position={[0,.03,0]}><torusGeometry args={[.47,.055,12,32]}/><meshStandardMaterial color={darkMode?"#c6a6ba":"#fff0d8"} roughness={.32}/></mesh>
    </group>
    <pointLight ref={light} position={[-.73,1.67,.22]} color="#ffd88a" intensity={darkMode?2.2:.55} distance={5.5} decay={2}/>
    <group ref={cord} position={[-1.05,1.25,.06]}>
      <mesh position={[0,-.47,0]}><cylinderGeometry args={[.018,.018,.94,10]}/><meshStandardMaterial color={darkMode?"#d9b1b5":"#9e6255"} roughness={.7}/></mesh>
      <mesh position={[0,-.98,0]} onPointerDown={pull} castShadow><sphereGeometry args={[.13,20,16]}/><meshStandardMaterial color={darkMode?"#ffb3ca":"#de6e58"} emissive={darkMode?"#ff527f":"#000000"} emissiveIntensity={darkMode?1.1:0}/></mesh>
      <Text position={[.2,-.98,.02]} fontSize={.11} color={darkMode?"#f8d9ce":"#75463d"} anchorX="left" anchorY="middle">pull</Text>
    </group>
  </group>
}
