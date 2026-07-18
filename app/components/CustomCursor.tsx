"use client";
import { useEffect, useRef } from "react";

export function CustomCursor(){
  const dot=useRef<HTMLDivElement>(null); const halo=useRef<HTMLDivElement>(null);
  useEffect(()=>{let x=0,y=0,hx=0,hy=0,frame=0;const move=(event:PointerEvent)=>{x=event.clientX;y=event.clientY;dot.current?.style.setProperty("transform",`translate3d(${x}px,${y}px,0)`)};const down=()=>document.body.classList.add("cursor-click");const up=()=>document.body.classList.remove("cursor-click");const animate=()=>{hx+=(x-hx)*.16;hy+=(y-hy)*.16;halo.current?.style.setProperty("transform",`translate3d(${hx}px,${hy}px,0)`);frame=requestAnimationFrame(animate)};addEventListener("pointermove",move);addEventListener("pointerdown",down);addEventListener("pointerup",up);frame=requestAnimationFrame(animate);return()=>{removeEventListener("pointermove",move);removeEventListener("pointerdown",down);removeEventListener("pointerup",up);cancelAnimationFrame(frame)}},[]);
  return <div className="cursor-layer" aria-hidden><div ref={halo} className="cursor-halo"/><div ref={dot} className="cursor-dot">✦</div></div>
}
