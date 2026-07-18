"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { n: "01", title: "Drift", note: "A sea that remembers the moon", className: "amber" },
  { n: "02", title: "Bloom", note: "Where gravity learns to flower", className: "violet" },
  { n: "03", title: "Echo", note: "The architecture of a vanished song", className: "cyan" },
];

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let w = 0, h = 0;
    const stars = Array.from({ length: 180 }, (_, i) => ({
      x: Math.random(), y: Math.random(), z: Math.random(), r: Math.random() * 1.4 + .2, s: .00008 + Math.random() * .0002, i
    }));
    const resize = () => { w = canvas.width = innerWidth * devicePixelRatio; h = canvas.height = innerHeight * devicePixelRatio; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of stars) {
        p.y -= p.s; if (p.y < 0) p.y = 1;
        const pulse = .35 + .65 * Math.sin(Date.now() * .001 + p.i);
        ctx.fillStyle = `rgba(230,239,255,${pulse * (.25 + p.z * .65)})`;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r * devicePixelRatio * (.5 + p.z), 0, 7); ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize", resize); draw();
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

function Orrery({ entered }: { entered: boolean }) {
  return (
    <div className={`orrery ${entered ? "awakened" : ""}`} aria-hidden="true">
      <div className="halo halo-a" />
      <div className="halo halo-b" />
      <div className="halo halo-c" />
      <div className="orbit orbit-a"><i /></div>
      <div className="orbit orbit-b"><i /></div>
      <div className="orbit orbit-c"><i /></div>
      <div className="core"><div className="core-inner" /></div>
      <div className="flare" />
    </div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [sound, setSound] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--mx", `${(e.clientX / innerWidth - .5) * 2}`);
      document.documentElement.style.setProperty("--my", `${(e.clientY / innerHeight - .5) * 2}`);
    };
    const scroll = () => setProgress(scrollY / Math.max(1, document.body.scrollHeight - innerHeight));
    addEventListener("pointermove", move); addEventListener("scroll", scroll, { passive: true });
    return () => { removeEventListener("pointermove", move); removeEventListener("scroll", scroll); };
  }, []);

  const enter = () => { setEntered(true); setTimeout(() => document.querySelector("#chapters")?.scrollIntoView({ behavior: "smooth" }), 850); };

  return (
    <main className={entered ? "entered" : ""}>
      <Starfield />
      <div className="grain" />
      <div className="cursor" style={{ transform: `translate(${cursor.x}px,${cursor.y}px)` }} />
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <nav>
        <a href="#top" className="sigil" aria-label="Astra Noctis home"><span>✦</span> AN</a>
        <span className="nav-title">Astra Noctis / An interactive reverie</span>
        <button className="sound" onClick={() => setSound(!sound)} aria-label="Toggle ambient sound">
          <span className={sound ? "playing bars" : "bars"}><i/><i/><i/><i/></span>{sound ? "Sound on" : "Sound off"}
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="coordinates">34° 12′ 08″ N<br/>118° 14′ 37″ W</div>
        <div className="hero-copy">
          <p className="eyebrow"><span /> An archive beyond time</p>
          <h1><span>ASTRA</span><em>NOCTIS</em></h1>
          <p className="lede">A dream in three dimensions.<br/>Best experienced slowly.</p>
          <button className="enter" onClick={enter}><span>Enter the dream</span><i>↗</i></button>
        </div>
        <Orrery entered={entered} />
        <div className="scroll-mark"><span>Scroll to descend</span><i /></div>
        <div className="edition">VOL. I<br/><b>MMXXVI</b></div>
      </section>

      <section className="manifesto" id="chapters">
        <p className="chapter-no">/ 00 — PROLOGUE</p>
        <h2>Somewhere between<br/><em>memory</em> and <em>starlight,</em><br/>a world is waiting.</h2>
        <p className="manifesto-copy">This is not a place you visit.<br/>It is a place that visits you.</p>
        <div className="eclipse"><i/><span/></div>
      </section>

      <section className="chapters">
        <header><span>/ THE THREE MOVEMENTS</span><span>Choose a fragment</span></header>
        <div className="chapter-grid">
          {chapters.map((c) => (
            <article className={`chapter ${c.className}`} key={c.n} tabIndex={0}>
              <div className="portal"><div className="portal-world"><i/><b/></div><span className="ring-label">ASTRA · NOCTIS · {c.title.toUpperCase()} ·</span></div>
              <div className="chapter-info"><span>{c.n}</span><h3>{c.title}</h3><p>{c.note}</p><button aria-label={`Explore ${c.title}`}>↗</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="finale">
        <div className="final-orbit"><i/><i/><i/></div>
        <p>THE DREAM CONTINUES</p>
        <h2>Look closer.<br/><em>Nothing is still.</em></h2>
        <a href="#top">Return to the beginning <span>↑</span></a>
        <footer><span>ASTRA NOCTIS © 2026</span><span>Made for the space between worlds</span><span>✦</span></footer>
      </section>
    </main>
  );
}
