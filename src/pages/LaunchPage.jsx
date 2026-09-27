import React, { useEffect, useMemo, useState } from "react";
import { PartyPopper, Play, Sparkles } from "lucide-react";
import churchLogo from "../assets/logo.png";
import "../styles/LaunchPage.css";

export default function LaunchPage() {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(5);

  const confetti = useMemo(
    () =>
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 12) * 0.07}s`,
        duration: `${2.5 + (index % 7) * 0.22}s`,
        rotate: `${(index * 53) % 360}deg`,
      })),
    []
  );

  const balloons = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: `${4 + ((index * 17) % 92)}%`,
        delay: `${(index % 8) * 0.16}s`,
        duration: `${4.4 + (index % 5) * 0.35}s`,
        emoji: ["🎈", "🎉", "✨", "🎊"][index % 4],
      })),
    []
  );

  useEffect(() => {
    if (phase !== "countdown") return undefined;

    const timer = window.setTimeout(() => {
      if (count > 1) {
        setCount((current) => current - 1);
      } else {
        setPhase("live");
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "live") return undefined;

    const redirect = window.setTimeout(() => {
      window.location.replace("/");
    }, 1500);

    return () => window.clearTimeout(redirect);
  }, [phase]);

  const startLaunch = () => {
    setCount(5);
    setPhase("countdown");
  };

  return (
    <main className={`jtc-launch-page ${phase}`}>
      <div className="jtc-launch-glow jtc-launch-glow-one" />
      <div className="jtc-launch-glow jtc-launch-glow-two" />

      {phase === "live" && (
        <div className="jtc-celebration-layer" aria-hidden="true">
          {confetti.map((piece) => (
            <span
              key={`confetti-${piece.id}`}
              className={`jtc-confetti piece-${piece.id % 6}`}
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
                transform: `rotate(${piece.rotate})`,
              }}
            />
          ))}

          {balloons.map((balloon) => (
            <span
              key={`balloon-${balloon.id}`}
              className="jtc-balloon"
              style={{
                left: balloon.left,
                animationDelay: balloon.delay,
                animationDuration: balloon.duration,
              }}
            >
              {balloon.emoji}
            </span>
          ))}
        </div>
      )}

      <section className="jtc-launch-card">
        <img src={churchLogo} alt="Jubilee Tamil Church" className="jtc-launch-logo" />

        {phase === "ready" && (
          <>
            <span className="jtc-launch-kicker"><Sparkles size={16} /> JUBILEE TAMIL CHURCH</span>
            <h1>Ready To Go Live?</h1>
            <p>
              Press the button when the priest is ready. The launch will count down from 5 to 1 and then open the church website automatically.
            </p>
            <button type="button" className="jtc-go-live-btn" onClick={startLaunch}>
              <Play fill="currentColor" size={21} /> GO LIVE
            </button>
            <small>Best viewed in full screen on the priest&apos;s phone.</small>
          </>
        )}

        {phase === "countdown" && (
          <div className="jtc-countdown-wrap" aria-live="assertive">
            <span className="jtc-launch-kicker">GET READY</span>
            <div key={count} className="jtc-countdown-number">{count}</div>
            <p>Jubilee Tamil Church is going live…</p>
          </div>
        )}

        {phase === "live" && (
          <div className="jtc-live-wrap" aria-live="assertive">
            <PartyPopper size={50} />
            <span className="jtc-live-pill">WE ARE LIVE</span>
            <h1>Jubilee Tamil Church</h1>
            <p>Opening the church website…</p>
            <div className="jtc-live-cross">✝</div>
          </div>
        )}
      </section>
    </main>
  );
}
