"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DeskScene } from "./components/DeskScene";
import { Overlay } from "./components/Overlay";
import { useTypingDesk } from "./components/useTypingDesk";
import { CustomCursor } from "./components/CustomCursor";

export default function Home() {
  const desk = useTypingDesk();
  return (
    <main>
      <CustomCursor />
      <div className="canvas">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 8, 10.1], fov: 43 }}
        >
          <Suspense fallback={null}>
            <DeskScene {...desk} />
          </Suspense>
        </Canvas>
      </div>
      <Overlay
        active={desk.active}
        phase={desk.phase}
        wpm={desk.wpm}
        accuracy={desk.accuracy}
      />
    </main>
  );
}
