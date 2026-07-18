"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPassage, type Difficulty, type GamePhase } from "./game-data";
import { playKeySound } from "./sound";

export function useTypingDesk(){
  const [pressed,setPressed]=useState<Set<string>>(new Set()); const [typed,setTyped]=useState(""); const [active,setActive]=useState("");
  const [difficulty,setDifficulty]=useState<Difficulty>("easy"); const [minutes,setMinutes]=useState(1); const [phase,setPhase]=useState<GamePhase>("setup");
  const [passage,setPassage]=useState(()=>createPassage("easy")); const [secondsLeft,setSecondsLeft]=useState(60); const [elapsed,setElapsed]=useState(0);
  const timers=useRef<Record<string,ReturnType<typeof setTimeout>>>({});
  const finish=useCallback(()=>setPhase("finished"),[]);
  const onKey=useCallback((code:string,label:string)=>{setPressed(value=>new Set(value).add(code));setActive(label);playKeySound();clearTimeout(timers.current[code]);timers.current[code]=setTimeout(()=>setPressed(value=>{const next=new Set(value);next.delete(code);return next}),110);if(phase==="running")setTyped(value=>{let next=value;if(label==="⌫")next=value.slice(0,-1);else if(label==="Enter")next=value+"\n";else if(label==="space")next=value+" ";else if(label.length===1)next=value+label;if(next.length>=passage.length)setTimeout(finish,0);return next.slice(0,passage.length)});setTimeout(()=>setActive(""),180)},[finish,passage.length,phase]);
  useEffect(()=>{const down=(event:KeyboardEvent)=>{if(event.repeat)return;event.preventDefault();onKey(event.code,event.key===" "?"space":event.key==="Backspace"?"⌫":event.key.length===1?event.key:event.key)};const up=(event:KeyboardEvent)=>setPressed(value=>{const next=new Set(value);next.delete(event.code);return next});addEventListener("keydown",down);addEventListener("keyup",up);return()=>{removeEventListener("keydown",down);removeEventListener("keyup",up)}},[onKey]);
  useEffect(()=>{if(phase!=="running")return;const started=Date.now()-elapsed*1000;const timer=setInterval(()=>{const spent=Math.floor((Date.now()-started)/1000);setElapsed(spent);setSecondsLeft(Math.max(0,minutes*60-spent));if(spent>=minutes*60)finish()},250);return()=>clearInterval(timer)},[elapsed,finish,minutes,phase]);
  const selectDifficulty=(value:Difficulty)=>{if(phase==="running")return;setDifficulty(value);setPassage(createPassage(value));setTyped("")};
  const selectMinutes=(value:number)=>{if(phase==="running")return;setMinutes(value);setSecondsLeft(value*60)};
  const start=()=>{setPassage(createPassage(difficulty));setTyped("");setElapsed(0);setSecondsLeft(minutes*60);setPhase("running")};
  const reset=()=>{setTyped("");setElapsed(0);setSecondsLeft(minutes*60);setPassage(createPassage(difficulty));setPhase("setup")};
  const correct=typed.split("").reduce((sum,char,index)=>sum+(char===passage[index]?1:0),0);
  const accuracy=typed.length?Math.round(correct/typed.length*100):100;
  const wpm=elapsed?Math.round((correct/5)/(elapsed/60)):0;
  return {pressed,typed,active,onKey,difficulty,minutes,phase,passage,secondsLeft,accuracy,wpm,correct,start,reset,selectDifficulty,selectMinutes};
}
