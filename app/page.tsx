"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DeskScene } from "./components/DeskScene";
import { Overlay } from "./components/Overlay";
import { useTypingDesk } from "./components/useTypingDesk";
import { CustomCursor } from "./components/CustomCursor";
import { ExperienceControls } from "./components/ExperienceControls";
import { useAmbientPlayer } from "./components/useAmbientPlayer";
import { useState } from "react";

export default function Home() {
  const desk = useTypingDesk();
  const music=useAmbientPlayer(); const [darkMode,setDarkMode]=useState(false);
  return (
    <main className={darkMode?"dark-mode":""}>
      <CustomCursor />
      <div className="canvas">
        <Canvas
          shadows
          dpr={[1, 1.4]}
          gl={{antialias:true,powerPreference:"high-performance"}}
          camera={{ position: [0, 8, 10.1], fov: 43 }}
        >
          <Suspense fallback={null}>
            <DeskScene {...desk} darkMode={darkMode} musicPlaying={music.playing} onMusic={music.toggle} onNextTrack={music.next}/>
          </Suspense>
        </Canvas>
      </div>
      <Overlay
        active={desk.active}
        phase={desk.phase}
        wpm={desk.wpm}
        accuracy={desk.accuracy}
      />
      <ExperienceControls darkMode={darkMode} musicPlaying={music.playing} trackName={music.trackName} onTheme={()=>setDarkMode(value=>!value)} onMusic={music.toggle}/>
    </main>
  );
}
