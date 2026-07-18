let sharedContext:AudioContext|null=null;
function getAudioContext(){const AudioContextClass=window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;sharedContext??=new AudioContextClass();if(sharedContext.state==="suspended")void sharedContext.resume();return sharedContext}
export function playKeySound() {
  const context=getAudioContext();
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const buffer = context.createBuffer(1, context.sampleRate * .025, context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index=0; index<samples.length; index++) samples[index]=(Math.random()*2-1)*Math.pow(1-index/samples.length,3);
  const noise=context.createBufferSource(); const filter=context.createBiquadFilter();
  noise.buffer=buffer; filter.type="bandpass"; filter.frequency.value=1450;
  oscillator.type="sine"; oscillator.frequency.setValueAtTime(105,now); oscillator.frequency.exponentialRampToValueAtTime(65,now+.045);
  gain.gain.setValueAtTime(.11,now); gain.gain.exponentialRampToValueAtTime(.001,now+.055);
  noise.connect(filter).connect(gain); oscillator.connect(gain).connect(context.destination);
  noise.start(now); oscillator.start(now); oscillator.stop(now+.06);
}

export function playMouseClick(side:"left"|"right"="left"){
  const context=getAudioContext();const now=context.currentTime;const oscillator=context.createOscillator();const gain=context.createGain();const filter=context.createBiquadFilter();oscillator.type="triangle";oscillator.frequency.setValueAtTime(side==="left"?185:165,now);oscillator.frequency.exponentialRampToValueAtTime(side==="left"?105:92,now+.045);filter.type="lowpass";filter.frequency.value=720;gain.gain.setValueAtTime(.055,now);gain.gain.exponentialRampToValueAtTime(.001,now+.055);oscillator.connect(filter).connect(gain).connect(context.destination);oscillator.start(now);oscillator.stop(now+.06)
}
