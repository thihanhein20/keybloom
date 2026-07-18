"use client";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Mouse(){
  const ref=useRef<THREE.Group>(null!); const [button,setButton]=useState<"left"|"right"|null>(null);
  useFrame((state,delta)=>{ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,4.1+state.pointer.x*.10,8,delta);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,3.9-state.pointer.y*.08,8,delta);ref.current.rotation.y=THREE.MathUtils.damp(ref.current.rotation.y,Math.PI/2-.08+state.pointer.x*-.025,8,delta)});
  const release=()=>setButton(null);
  return <group ref={ref} position={[4.1,-1.08,3.9]} rotation={[0,Math.PI/2-.08,0]} scale={.9} onPointerUp={release} onPointerLeave={release}>
    <RoundedBox args={[1.28,.30,1.72]} radius={.34} smoothness={10} castShadow receiveShadow><meshStandardMaterial color="#f2a276" roughness={.44}/></RoundedBox>
    <RoundedBox args={[1.08,.08,1.48]} radius={.29} smoothness={9} position={[0,.175,.08]} castShadow receiveShadow><meshStandardMaterial color="#f6bd91" roughness={.48}/></RoundedBox>
    <RoundedBox args={[.50,.09,.64]} radius={.15} smoothness={6} position={[-.275,button==="left"?.205:.235,-.43]} onPointerDown={(e)=>{e.stopPropagation();setButton("left")}} castShadow><meshStandardMaterial color="#ffd0b3" roughness={.42}/></RoundedBox>
    <RoundedBox args={[.50,.09,.64]} radius={.15} smoothness={6} position={[.275,button==="right"?.205:.235,-.43]} onPointerDown={(e)=>{e.stopPropagation();setButton("right")}} castShadow><meshStandardMaterial color="#ffd0b3" roughness={.42}/></RoundedBox>
    <mesh position={[0,.285,-.40]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.07,.07,.24,20]}/><meshStandardMaterial color="#8fc9bc" roughness={.55}/></mesh>
    <mesh position={[0,.225,.34]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.12,.145,32]}/><meshStandardMaterial color="#ef936e"/></mesh>
  </group>
}
