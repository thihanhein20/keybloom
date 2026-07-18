"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { playKeySound } from "./sound";

export function useTypingDesk(){
  const [pressed,setPressed]=useState<Set<string>>(new Set()); const [typed,setTyped]=useState(""); const [active,setActive]=useState("");
  const timers=useRef<Record<string,ReturnType<typeof setTimeout>>>({});
  const onKey=useCallback((code:string,label:string)=>{setPressed(value=>new Set(value).add(code));setActive(label);playKeySound();clearTimeout(timers.current[code]);timers.current[code]=setTimeout(()=>setPressed(value=>{const next=new Set(value);next.delete(code);return next}),110);if(label==="⌫")setTyped(value=>value.slice(0,-1));else if(label==="Enter")setTyped(value=>`${value} ↵ `);else if(label==="space")setTyped(value=>(value+" ").slice(-38));else if(label.length===1)setTyped(value=>(value+label.toLowerCase()).slice(-38));setTimeout(()=>setActive(""),180)},[]);
  useEffect(()=>{const down=(event:KeyboardEvent)=>{if(event.repeat)return;event.preventDefault();onKey(event.code,event.key===" "?"space":event.key==="Backspace"?"⌫":event.key.length===1?event.key:event.key)};const up=(event:KeyboardEvent)=>setPressed(value=>{const next=new Set(value);next.delete(event.code);return next});addEventListener("keydown",down);addEventListener("keyup",up);return()=>{removeEventListener("keydown",down);removeEventListener("keyup",up)}},[onKey]);
  return {pressed,typed,active,onKey};
}
