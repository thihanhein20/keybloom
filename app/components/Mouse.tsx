"use client";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Mouse({darkMode}:{darkMode:boolean}){
  const ref=useRef<THREE.Group>(null!);const left=useRef<THREE.Group>(null!);const right=useRef<THREE.Group>(null!); const [button,setButton]=useState<"left"|"right"|null>(null);
  useFrame((state,delta)=>{ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,4.55+state.pointer.x*.06,8,delta);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,1.36-state.pointer.y*.05,8,delta);ref.current.rotation.y=THREE.MathUtils.damp(ref.current.rotation.y,.30+state.pointer.x*-.02,8,delta);left.current.position.y=THREE.MathUtils.damp(left.current.position.y,button==="left"?-.075:0,24,delta);right.current.position.y=THREE.MathUtils.damp(right.current.position.y,button==="right"?-.075:0,24,delta);left.current.rotation.x=THREE.MathUtils.damp(left.current.rotation.x,button==="left"?.045:0,22,delta);right.current.rotation.x=THREE.MathUtils.damp(right.current.rotation.x,button==="right"?.045:0,22,delta)});
  useEffect(()=>{const down=(event:PointerEvent)=>setButton(event.button===2?"right":"left");const up=()=>setButton(null);addEventListener("pointerdown",down);addEventListener("pointerup",up);addEventListener("pointercancel",up);return()=>{removeEventListener("pointerdown",down);removeEventListener("pointerup",up);removeEventListener("pointercancel",up)}},[]);
  const release=()=>setButton(null);
  return <group ref={ref} position={[4.55,-1.57,1.36]} rotation={[-.14,.30,.025]} scale={.66} onPointerUp={release} onPointerLeave={release}>
    <RoundedBox args={[1.45,.18,1.6]} radius={.13} smoothness={5} position={[0,-.08,0]} castShadow receiveShadow><meshStandardMaterial color={darkMode?"#604f65":"#a95f4c"} roughness={.66}/></RoundedBox>
    <RoundedBox args={[1.34,.40,1.48]} radius={.16} smoothness={6} position={[0,.13,.02]} castShadow receiveShadow><meshStandardMaterial color={darkMode?"#8a7188":"#d89d7c"} roughness={.58} metalness={.04}/></RoundedBox>
    <group ref={left} position={[0,0,0]}><RoundedBox args={[.61,.10,.68]} radius={.07} smoothness={4} position={[-.33,.35,-.37]} onPointerDown={(e)=>{e.stopPropagation();setButton("left")}} castShadow><meshStandardMaterial color={darkMode?"#b190aa":"#edc3a5"} emissive={button==="left"&&darkMode?"#ef8fba":"#000000"} emissiveIntensity={button==="left"?.35:0} roughness={.5}/></RoundedBox></group>
    <group ref={right} position={[0,0,0]}><RoundedBox args={[.61,.10,.68]} radius={.07} smoothness={4} position={[.33,.35,-.37]} onPointerDown={(e)=>{e.stopPropagation();setButton("right")}} castShadow><meshStandardMaterial color={darkMode?"#b190aa":"#edc3a5"} emissive={button==="right"&&darkMode?"#ef8fba":"#000000"} emissiveIntensity={button==="right"?.35:0} roughness={.5}/></RoundedBox></group>
    <mesh position={[0,.42,-.30]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.075,.075,.22,20]}/><meshStandardMaterial color="#8fc9bc" emissive={darkMode?"#70c9ba":"#000000"} emissiveIntensity={darkMode?.8:0} roughness={.55}/></mesh>
    <mesh position={[-.18,.27,-.735]} castShadow><sphereGeometry args={[.035,16,16]}/><meshStandardMaterial color={darkMode?"#ffc6a8":"#744e42"} emissive={darkMode?"#ef8f74":"#000000"} emissiveIntensity={darkMode?.65:0}/></mesh>
    <mesh position={[.18,.27,-.735]} castShadow><sphereGeometry args={[.035,16,16]}/><meshStandardMaterial color={darkMode?"#ffc6a8":"#744e42"} emissive={darkMode?"#ef8f74":"#000000"} emissiveIntensity={darkMode?.65:0}/></mesh>
    <RoundedBox args={[2.0,.025,2.05]} radius={.12} smoothness={4} position={[0,-.2,.12]} receiveShadow><meshStandardMaterial color={darkMode?"#293b3c":"#73aa9e"} roughness={.78}/></RoundedBox>
    <RoundedBox args={[1.38,.025,1.48]} radius={.12} smoothness={4} position={[0,-.155,.02]}><meshStandardMaterial color={darkMode?"#8fc9bc":"#000000"} emissive={darkMode?"#70c9ba":"#000000"} emissiveIntensity={darkMode?1.1:0} transparent opacity={darkMode?.75:0}/></RoundedBox>
  </group>
}
