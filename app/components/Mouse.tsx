"use client";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Mouse(){
  const ref=useRef<THREE.Group>(null!); const [button,setButton]=useState<"left"|"right"|null>(null);
  useFrame((state,delta)=>{ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,4.35+state.pointer.x*.16,8,delta);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,1.1-state.pointer.y*.12,8,delta);ref.current.rotation.z=THREE.MathUtils.damp(ref.current.rotation.z,state.pointer.x*-.035,8,delta)});
  const release=()=>setButton(null);
  return <group ref={ref} position={[4.35,-1.38,1.1]} rotation={[-.08,0,-.03]} onPointerUp={release} onPointerLeave={release}>
    <RoundedBox args={[1.18,.34,1.65]} radius={.32} smoothness={8} castShadow receiveShadow><meshStandardMaterial color="#f2a276" roughness={.42}/></RoundedBox>
    <RoundedBox args={[.92,.08,.82]} radius={.25} smoothness={7} position={[0,.21,.3]} castShadow><meshStandardMaterial color="#ffe2c5" roughness={.46}/></RoundedBox>
    <RoundedBox args={[.52,.13,.72]} radius={.16} smoothness={5} position={[-.285,button==="left"?.19:.24,-.38]} onPointerDown={(e)=>{e.stopPropagation();setButton("left")}} castShadow><meshStandardMaterial color="#ffd6ba" roughness={.4}/></RoundedBox>
    <RoundedBox args={[.52,.13,.72]} radius={.16} smoothness={5} position={[.285,button==="right"?.19:.24,-.38]} onPointerDown={(e)=>{e.stopPropagation();setButton("right")}} castShadow><meshStandardMaterial color="#ffd6ba" roughness={.4}/></RoundedBox>
    <RoundedBox args={[.18,.12,.52]} radius={.08} smoothness={4} position={[0,.30,-.28]} castShadow><meshStandardMaterial color="#b85f47" roughness={.5}/></RoundedBox>
    <mesh position={[0,.385,-.3]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.07,.07,.24,20]}/><meshStandardMaterial color="#8fc9bc" roughness={.55}/></mesh>
  </group>
}
