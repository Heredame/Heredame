import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

// How long each step stays "the newest one" before the next lights up.
const STEP_INTERVAL = 620;

function ComoFunciona() {
  const { t } = useLanguage();
  const steps = t.comoFunciona.steps;
  const trackRef = useRef(null);

  // How many steps have lit up so far (0 → steps.length). They light one at a
  // time, in order, the first time the track scrolls into view, and stay lit.
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === "undefined") return 0;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return prefersReducedMotion || typeof IntersectionObserver === "undefined" ? steps.length : 0;
  });

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    let intervalId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let count = 1;
        setRevealed(count);
        intervalId = window.setInterval(() => {
          count += 1;
          setRevealed(count);
          if (count >= steps.length) window.clearInterval(intervalId);
        }, STEP_INTERVAL);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
    };
  }, [steps.length]);

  return (
    <section className="section section-divider como-section" id="como-funciona">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.comoFunciona.eyebrow}</div>
          <h2>{t.comoFunciona.title}</h2>
        </Reveal>
        <div
          className="steps-track"
          ref={trackRef}
          style={{ "--progress": steps.length ? revealed / steps.length : 0 }}
        >
          {steps.map((step, i) => (
            <div className={`step-card ${i < revealed ? "is-active" : ""}`} key={step.title}>
              <div className="step-number" aria-hidden="true">
                <span>{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComoFunciona;
