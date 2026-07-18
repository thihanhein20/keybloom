"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const TRACKS = [
  { name: "peach radio", notes: [220, 277.18, 329.63, 277.18, 246.94, 329.63] },
  { name: "moonlit keys", notes: [196, 246.94, 293.66, 392, 293.66, 246.94] },
];

export function useAmbientPlayer(){
  const [playing,setPlaying]=useState(false); const [track,setTrack]=useState(0);
  const context=useRef<AudioContext|null>(null); const timer=useRef<ReturnType<typeof setInterval>|null>(null); const step=useRef(0); const continueAfterChange=useRef(false);
  const stop=useCallback(()=>{if(timer.current)clearInterval(timer.current);timer.current=null;setPlaying(false)},[]);
  const playNote=useCallback((trackIndex:number)=>{const ctx=context.current;if(!ctx)return;const now=ctx.currentTime;const oscillator=ctx.createOscillator();const gain=ctx.createGain();const filter=ctx.createBiquadFilter();oscillator.type="sine";oscillator.frequency.value=TRACKS[trackIndex].notes[step.current++%TRACKS[trackIndex].notes.length];filter.type="lowpass";filter.frequency.value=900;gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.035,now+.08);gain.gain.exponentialRampToValueAtTime(.0001,now+1.2);oscillator.connect(filter).connect(gain).connect(ctx.destination);oscillator.start(now);oscillator.stop(now+1.25)},[]);
  const play=useCallback(async()=>{const AudioContextClass=window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;context.current??=new AudioContextClass();await context.current.resume();if(context.current.state!=="running")throw new Error("Audio is waiting for interaction");if(timer.current)return;playNote(track);timer.current=setInterval(()=>playNote(track),720);setPlaying(true)},[playNote,track]);
  const toggle=useCallback(()=>playing?stop():void play(),[play,playing,stop]);
  const next=useCallback(()=>{continueAfterChange.current=playing;stop();step.current=0;setTrack(value=>(value+1)%TRACKS.length)},[playing,stop]);
  useEffect(()=>{if(continueAfterChange.current){continueAfterChange.current=false;void play()}},[play,track]);
  useEffect(()=>{const arm=()=>{void play();removeEventListener("pointerdown",arm);removeEventListener("keydown",arm)};void play().catch(()=>{addEventListener("pointerdown",arm,{once:true});addEventListener("keydown",arm,{once:true})});return()=>{removeEventListener("pointerdown",arm);removeEventListener("keydown",arm);stop();void context.current?.close()}},[]);
  return {playing,trackName:TRACKS[track].name,toggle,next};
}
