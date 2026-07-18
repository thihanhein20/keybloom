"use client";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { KEY_ROWS, type KeyDefinition } from "./keyboard-data";

function Keycap({item,x,z,pressed,onPress}:{item:KeyDefinition;x:number;z:number;pressed:boolean;onPress:()=>void}){
  const ref=useRef<THREE.Group>(null!); const width=(item.width||1)*.44-.045;
  const skirt=item.color==="#8fc9bc"?"#639d91":item.color?"#c96f58":"#c79576";
  useFrame((_,delta)=>{ref.current.position.y=THREE.MathUtils.damp(ref.current.position.y,pressed?.32:.47,22,delta)});
  return <group ref={ref} position={[x,.47,z]} onPointerDown={(event)=>{event.stopPropagation();onPress()}}>
    <RoundedBox args={[width*.92,.20,.35]} radius={.038} smoothness={3} position={[0,-.08,0]} castShadow receiveShadow><meshStandardMaterial color={skirt} roughness={.58}/></RoundedBox>
    <RoundedBox args={[width,.30,.39]} radius={.06} smoothness={4} position={[0,.07,0]} castShadow receiveShadow><meshStandardMaterial color={item.color||"#ffe2c5"} roughness={.48}/></RoundedBox>
    <Text position={[0,.225,0]} rotation={[-Math.PI/2,0,0]} fontSize={item.label.length>3?.072:.10} color="#744e42" anchorX="center" anchorY="middle">{item.label}</Text>
  </group>
}

export function Keyboard({pressed,onKey}:{pressed:Set<string>;onKey:(code:string,label:string)=>void}){
  const keys=useMemo(()=>KEY_ROWS.map((row,rowIndex)=>{const total=row.reduce((sum,key)=>sum+(key.width||1),0);let cursor=-total*.22;return row.map(key=>{const width=(key.width||1)*.44;const x=cursor+width/2;cursor+=width;return {key,x,z:rowIndex*.44+.08}})}),[]);
  return <group position={[-.28,-1.35,.85]} rotation={[-.16,0,0]} scale={1.02}>
    <RoundedBox args={[7.8,.42,2.9]} radius={.18} smoothness={5} position={[0,-.01,.95]} castShadow receiveShadow><meshStandardMaterial color="#f3c49d" roughness={.5}/></RoundedBox>
    <RoundedBox args={[7.52,.15,2.62]} radius={.11} smoothness={4} position={[0,.25,.95]} receiveShadow><meshStandardMaterial color="#d97958" roughness={.66}/></RoundedBox>
    {[[-3.69,.95],[3.69,.95]].map(([x,z])=><RoundedBox key={x} args={[.16,.20,2.48]} radius={.04} smoothness={3} position={[x,.36,z]} castShadow><meshStandardMaterial color="#ffd8b6" roughness={.5}/></RoundedBox>)}
    {[-.23,2.13].map(z=><RoundedBox key={z} args={[7.32,.20,.16]} radius={.04} smoothness={3} position={[0,.36,z]} castShadow><meshStandardMaterial color="#ffd8b6" roughness={.5}/></RoundedBox>)}
    {keys.flatMap((row,rowIndex)=>row.map(({key,x,z})=><Keycap key={`${rowIndex}-${key.code}`} item={key} x={x} z={z} pressed={pressed.has(key.code)} onPress={()=>onKey(key.code,key.label)}/>))}
  </group>
}
