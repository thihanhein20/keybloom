"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DeskScene } from "./components/DeskScene";
import { Overlay } from "./components/Overlay";
import { useTypingDesk } from "./components/useTypingDesk";

export default function Home(){
  const desk=useTypingDesk();
  return <main><div className="canvas"><Canvas shadows dpr={[1,1.75]} camera={{position:[0,5.55,10.1],fov:43}}><Suspense fallback={null}><DeskScene pressed={desk.pressed} typed={desk.typed} active={desk.active} onKey={desk.onKey}/></Suspense></Canvas></div><Overlay active={desk.active}/></main>
}
