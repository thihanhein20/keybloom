"use client";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Mouse(){
  const ref=useRef<THREE.Group>(null!); const [button,setButton]=useState<"left"|"right"|null>(null);
  useFrame((state,delta)=>{ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,4.18+state.pointer.x*.06,8,delta);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,2.02-state.pointer.y*.05,8,delta);ref.current.rotation.y=THREE.MathUtils.damp(ref.current.rotation.y,-.24+state.pointer.x*-.02,8,delta)});
  const release=()=>setButton(null);
  return <group ref={ref} position={[4.18,-1.31,2.02]} rotation={[-.14,-.24,-.025]} scale={.66} onPointerUp={release} onPointerLeave={release}>
    <RoundedBox args={[1.45,.18,1.6]} radius={.13} smoothness={5} position={[0,-.08,0]} castShadow receiveShadow><meshStandardMaterial color="#d97958" roughness={.58}/></RoundedBox>
    <RoundedBox args={[1.34,.40,1.48]} radius={.16} smoothness={6} position={[0,.13,.02]} castShadow receiveShadow><meshStandardMaterial color="#f3c49d" roughness={.5}/></RoundedBox>
    <RoundedBox args={[.61,.10,.68]} radius={.07} smoothness={4} position={[-.33,button==="left"?.32:.35,-.37]} onPointerDown={(e)=>{e.stopPropagation();setButton("left")}} castShadow><meshStandardMaterial color="#ffe2c5" roughness={.46}/></RoundedBox>
    <RoundedBox args={[.61,.10,.68]} radius={.07} smoothness={4} position={[.33,button==="right"?.32:.35,-.37]} onPointerDown={(e)=>{e.stopPropagation();setButton("right")}} castShadow><meshStandardMaterial color="#ffe2c5" roughness={.46}/></RoundedBox>
    <mesh position={[0,.42,-.30]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.075,.075,.22,20]}/><meshStandardMaterial color="#8fc9bc" roughness={.55}/></mesh>
    <mesh position={[-.18,.27,-.735]} castShadow><sphereGeometry args={[.035,16,16]}/><meshStandardMaterial color="#744e42"/></mesh>
    <mesh position={[.18,.27,-.735]} castShadow><sphereGeometry args={[.035,16,16]}/><meshStandardMaterial color="#744e42"/></mesh>
    <RoundedBox args={[2.0,.025,2.05]} radius={.12} smoothness={4} position={[0,-.2,.12]} receiveShadow><meshStandardMaterial color="#8fc9bc" roughness={.7}/></RoundedBox>
  </group>
}
