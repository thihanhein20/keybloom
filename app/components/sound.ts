export function playKeySound() {
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const context = new AudioContextClass();
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
  noise.start(now); oscillator.start(now); oscillator.stop(now+.06); setTimeout(()=>context.close(),120);
}
