"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type KeyDef = { label: string; code: string; width?: number; color?: string };
const rows: KeyDef[][] = [
  ["Esc","1","2","3","4","5","6","7","8","9","0","-","=","⌫"].map((label,i)=>({label,code:i===0?"Escape":i===13?"Backspace":`Digit${label}`.replace("Digit-","Minus").replace("Digit=","Equal"),width:i===13?1.55:1,color:i===0?"#8fc9bc":undefined})),
  [{label:"Tab",code:"Tab",width:1.35},..."QWERTYUIOP".split("").map(label=>({label,code:`Key${label}`})),{label:"[",code:"BracketLeft"},{label:"]",code:"BracketRight"},{label:"\\",code:"Backslash",width:1.35}],
  [{label:"Caps",code:"CapsLock",width:1.65},..."ASDFGHJKL".split("").map(label=>({label,code:`Key${label}`})),{label:";",code:"Semicolon"},{label:"'",code:"Quote"},{label:"Enter",code:"Enter",width:1.75,color:"#ef936e"}],
  [{label:"Shift",code:"ShiftLeft",width:2.05},..."ZXCVBNM".split("").map(label=>({label,code:`Key${label}`})),{label:",",code:"Comma"},{label:".",code:"Period"},{label:"/",code:"Slash"},{label:"Shift",code:"ShiftRight",width:2.2}],
  [{label:"Ctrl",code:"ControlLeft",width:1.25},{label:"⌘",code:"MetaLeft",width:1.2},{label:"Alt",code:"AltLeft",width:1.2},{label:"space",code:"Space",width:6.15,color:"#f2a276"},{label:"Alt",code:"AltRight",width:1.2},{label:"←",code:"ArrowLeft"},{label:"↑",code:"ArrowUp"},{label:"↓",code:"ArrowDown"},{label:"→",code:"ArrowRight"}],
];

function playClick() {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * .025, ctx.sampleRate); const data = buffer.getChannelData(0);
  for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,3);
  const noise=ctx.createBufferSource(); noise.buffer=buffer; const filter=ctx.createBiquadFilter(); filter.type="bandpass"; filter.frequency.value=1450;
  osc.type="sine"; osc.frequency.setValueAtTime(105,now); osc.frequency.exponentialRampToValueAtTime(65,now+.045);
  gain.gain.setValueAtTime(.11,now); gain.gain.exponentialRampToValueAtTime(.001,now+.055);
  noise.connect(filter).connect(gain); osc.connect(gain).connect(ctx.destination); noise.start(now); osc.start(now); osc.stop(now+.06); setTimeout(()=>ctx.close(),120);
}

function Keycap({ item, x, z, pressed, onPress }: { item:KeyDef;x:number;z:number;pressed:boolean;onPress:()=>void }) {
  const ref=useRef<THREE.Group>(null!);
  useFrame((_,d)=>{ const target=pressed ? .32 : .47; ref.current.position.y=THREE.MathUtils.damp(ref.current.position.y,target,22,d); });
  const width=(item.width||1)*.44-.045;
  const skirtColor=item.color==="#8fc9bc"?"#639d91":item.color?"#c96f58":"#c79576";
  return <group ref={ref} position={[x,.47,z]} onPointerDown={(e)=>{e.stopPropagation();onPress();}}>
    <RoundedBox args={[width*.92,.20,.35]} radius={.038} smoothness={3} position={[0,-.08,0]} castShadow receiveShadow>
      <meshStandardMaterial color={skirtColor} roughness={.58}/>
    </RoundedBox>
    <RoundedBox args={[width,.30,.39]} radius={.06} smoothness={4} position={[0,.07,0]} castShadow receiveShadow>
      <meshStandardMaterial color={item.color||"#ffe2c5"} roughness={.48}/>
    </RoundedBox>
    <Text position={[0,.225,0]} rotation={[-Math.PI/2,0,0]} fontSize={item.label.length>3?.072:.10} color="#744e42" anchorX="center" anchorY="middle">{item.label}</Text>
  </group>;
}

function Keyboard({ pressed, hit }: {pressed:Set<string>;hit:(code:string,label:string)=>void}) {
  const keyData=useMemo(()=>rows.map((row,ri)=>{const total=row.reduce((a,k)=>a+(k.width||1),0);let cursor=-total*.22;return row.map(k=>{const width=(k.width||1)*.44;const x=cursor+width/2;cursor+=width;return {k,x,z:ri*.44+.08};});}),[]);
  return <group position={[0,-1.35,.85]} rotation={[-.16,0,0]} scale={1.06}>
    <RoundedBox args={[7.75,.34,2.82]} radius={.22} smoothness={5} position={[0,.02,.95]} castShadow receiveShadow><meshStandardMaterial color="#df7d54" roughness={.42}/></RoundedBox>
    <RoundedBox args={[7.48,.11,2.56]} radius={.13} smoothness={4} position={[0,.23,.95]} receiveShadow><meshStandardMaterial color="#b85f47" roughness={.62}/></RoundedBox>
    <RoundedBox args={[.13,.17,2.42]} radius={.045} smoothness={3} position={[-3.66,.34,.95]} castShadow><meshStandardMaterial color="#ed936b" roughness={.44}/></RoundedBox>
    <RoundedBox args={[.13,.17,2.42]} radius={.045} smoothness={3} position={[3.66,.34,.95]} castShadow><meshStandardMaterial color="#ed936b" roughness={.44}/></RoundedBox>
    <RoundedBox args={[7.25,.17,.13]} radius={.045} smoothness={3} position={[0,.34,-.2]} castShadow><meshStandardMaterial color="#ed936b" roughness={.44}/></RoundedBox>
    <RoundedBox args={[7.25,.17,.13]} radius={.045} smoothness={3} position={[0,.34,2.1]} castShadow><meshStandardMaterial color="#ed936b" roughness={.44}/></RoundedBox>
    {keyData.flatMap((row,ri)=>row.map(({k,x,z})=><Keycap key={`${ri}-${k.code}`} item={k} x={x} z={z} pressed={pressed.has(k.code)} onPress={()=>hit(k.code,k.label)}/>))}
  </group>;
}

function Mouse(){
  const ref=useRef<THREE.Group>(null!);const [down,setDown]=useState(false);
  useFrame((state,d)=>{ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,4.35+state.pointer.x*.16,8,d);ref.current.position.z=THREE.MathUtils.damp(ref.current.position.z,1.1-state.pointer.y*.12,8,d);ref.current.rotation.z=THREE.MathUtils.damp(ref.current.rotation.z,state.pointer.x*-.035,8,d)});
  return <group ref={ref} position={[4.35,-1.38,1.1]} rotation={[-.08,0,-.03]} onPointerDown={(e)=>{e.stopPropagation();setDown(true)}} onPointerUp={()=>setDown(false)} onPointerLeave={()=>setDown(false)}>
    <RoundedBox args={[1.05,.34,1.5]} radius={.28} smoothness={7} castShadow receiveShadow><meshStandardMaterial color="#ffe2c5" roughness={.4}/></RoundedBox>
    <RoundedBox args={[.46,.08,.68]} radius={.12} smoothness={4} position={[-.25,down?.185:.22,-.33]} castShadow><meshStandardMaterial color="#f2a276" roughness={.45}/></RoundedBox>
    <RoundedBox args={[.46,.08,.68]} radius={.12} smoothness={4} position={[.25,.22,-.33]} castShadow><meshStandardMaterial color="#f6bd91" roughness={.45}/></RoundedBox>
    <mesh position={[0,.29,-.08]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.07,.07,.2,20]}/><meshStandardMaterial color="#8fc9bc" roughness={.55}/></mesh>
    <mesh position={[0,.18,.38]}><sphereGeometry args={[.055,16,16]}/><meshStandardMaterial color="#ef936e" emissive="#ef936e" emissiveIntensity={1.2}/></mesh>
  </group>
}

function Monitor({ typed, active }: {typed:string;active:string}) {
  return <group position={[0,.98,-1.35]} scale={.78}>
    <RoundedBox args={[5.7,3.65,.62]} radius={.42} smoothness={8} castShadow receiveShadow><meshStandardMaterial color="#f29a67" roughness={.36}/></RoundedBox>
    <RoundedBox args={[5.08,3.08,.08]} radius={.28} smoothness={7} position={[0,.02,.35]}><meshStandardMaterial color="#7c4f46" roughness={.5}/></RoundedBox>
    <RoundedBox args={[4.64,2.68,.07]} radius={.22} smoothness={6} position={[0,.02,.41]}><meshStandardMaterial color="#241f2a" roughness={.28} emissive="#171322" emissiveIntensity={.5}/></RoundedBox>
    <Html transform position={[0,.02,.46]} distanceFactor={2.85}>
      <div className="screen">
        <div className="screen-top"><span>PEACH_OS</span><span>● ONLINE</span></div>
        <div className="face">{active?<><i>•</i><b>ᴗ</b><i>•</i></>:<><i>˶</i><b>◡</b><i>˶</i></>}</div>
        <div className="typed">{typed || "type something cozy"}<span className="caret"/></div>
        <div className="screen-bottom">keyboard friend v1.0</div>
      </div>
    </Html>
    <mesh position={[0,-2.15,.15]} castShadow><cylinderGeometry args={[.62,.78,.85,32]}/><meshStandardMaterial color="#df7d54" roughness={.45}/></mesh>
    <RoundedBox args={[2.5,.22,1.2]} radius={.18} smoothness={4} position={[0,-2.6,.15]} castShadow><meshStandardMaterial color="#d76f50" roughness={.48}/></RoundedBox>
    <mesh position={[2.45,-1.42,.32]}><sphereGeometry args={[.06,20,20]}/><meshStandardMaterial color="#ffda78" emissive="#ffb347" emissiveIntensity={2}/></mesh>
  </group>;
}

function DeskScene({ pressed,typed,active,hit }:{pressed:Set<string>;typed:string;active:string;hit:(c:string,l:string)=>void}) {
  return <>
    <color attach="background" args={["#f7cfa7"]}/><fog attach="fog" args={["#f7cfa7",12,24]}/>
    <ambientLight intensity={1.6}/><directionalLight position={[-5,8,6]} intensity={3.2} color="#fff1d8" castShadow shadow-mapSize={[2048,2048]}/><pointLight position={[5,1,3]} intensity={1.4} color="#ffd08c"/>
    <Float speed={1.1} rotationIntensity={.018} floatIntensity={.035}><group rotation={[0,.04,0]}><Monitor typed={typed} active={active}/><Keyboard pressed={pressed} hit={hit}/><Mouse/></group></Float>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.72,0]} receiveShadow><planeGeometry args={[40,40]}/><meshStandardMaterial color="#efb982" roughness={.83}/></mesh>
    <ContactShadows position={[0,-1.69,0]} opacity={.38} scale={14} blur={2.4} far={5}/><Environment preset="apartment"/>
    <OrbitControls makeDefault enablePan={false} enableRotate enableZoom={false} target={[0,-.72,.62]} minAzimuthAngle={-.16} maxAzimuthAngle={.16} minPolarAngle={.88} maxPolarAngle={1.06}/>
  </>;
}

export default function Home(){
  const [pressed,setPressed]=useState<Set<string>>(new Set()); const [typed,setTyped]=useState(""); const [active,setActive]=useState(""); const timers=useRef<Record<string,ReturnType<typeof setTimeout>>>({});
  const hit=useCallback((code:string,label:string)=>{
    setPressed(p=>new Set(p).add(code)); setActive(label); playClick(); clearTimeout(timers.current[code]); timers.current[code]=setTimeout(()=>setPressed(p=>{const n=new Set(p);n.delete(code);return n}),110);
    if(label==="⌫") setTyped(t=>t.slice(0,-1)); else if(label==="Enter") setTyped(t=>`${t} ↵ `); else if(label==="space") setTyped(t=>(t+" ").slice(-38)); else if(label.length===1) setTyped(t=>(t+label.toLowerCase()).slice(-38));
    setTimeout(()=>setActive(""),180);
  },[]);
  useEffect(()=>{const down=(e:KeyboardEvent)=>{if(e.repeat)return;e.preventDefault();hit(e.code,e.key===" "?"space":e.key==="Backspace"?"⌫":e.key.length===1?e.key:e.key)};const up=(e:KeyboardEvent)=>setPressed(p=>{const n=new Set(p);n.delete(e.code);return n});addEventListener("keydown",down);addEventListener("keyup",up);return()=>{removeEventListener("keydown",down);removeEventListener("keyup",up)}},[hit]);
  return <main><header><a href="#" className="brand"><span>⌁</span> keybloom</a><p>a tiny place for big thoughts</p><div className="status"><i/> ready to type</div></header><div className="canvas"><Canvas shadows dpr={[1,1.75]} camera={{position:[0,5.55,10.1],fov:38}}><Suspense fallback={null}><DeskScene pressed={pressed} typed={typed} active={active} hit={hit}/></Suspense></Canvas></div><div className="intro"><p>INTERACTIVE TYPING DESK / 001</p><h1>Make a little<br/><em>click-clack.</em></h1><span>Keep your eyes on the keys.<br/>The screen follows every keystroke.</span></div><aside><b>{active||"—"}</b><span>last key</span></aside><div className="hint"><i>⌨</i><span>Start typing<br/><b>every key is alive</b></span></div></main>
}
