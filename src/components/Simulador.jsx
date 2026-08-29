import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 126;
const EXPLODE = 0;
const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--bg)"];

function polarToCartesian(angleDeg, radius = RADIUS) {
  const radians = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(radians),
    y: CENTER + radius * Math.sin(radians),
  };
}

// Solid pie wedge from the centre out to the arc between two angles.
function wedgePath(startDeg, endDeg) {
  const p0 = polarToCartesian(startDeg);
  const p1 = polarToCartesian(endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`;
}

// Outward (dx, dy) shift for a slice centred on `midDeg`.
function explodeOffset(midDeg) {
  const radians = ((midDeg - 90) * Math.PI) / 180;
  return { dx: Math.cos(radians) * EXPLODE, dy: Math.sin(radians) * EXPLODE };
}

function normalizeSegments(segments) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 100) return segments;
  return segments.map((s) => ({
    ...s,
    value: total > 0 ? (s.value / total) * 100 : 0,
  }));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Linear 0 → 1 ramp that starts the first time `active` turns true and runs
 * for `duration` ms. Per-segment easing is applied downstream so the ring
 * arcs and every percentage share one single clock (no drift between them).
 * Honours prefers-reduced-motion by jumping straight to the final state.
 */
function useCountUp(active, duration) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [progress, setProgress] = useState(active ? 1 : 0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let frame = 0;
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, prefersReducedMotion]);

  return prefersReducedMotion ? (active ? 1 : 0) : progress;
}

/**
 * Turns the raw 0 → 1 progress into per-segment fill state. Each visible
 * segment fills during its own equal slice of the timeline, so the ring
 * draws one wedge at a time (1 → n) and the numbers tick up in lockstep.
 */
function computeArcs(segments, progress) {
  const visibleOrder = [];
  segments.forEach((s, i) => {
    if (s.value > 0) visibleOrder.push(i);
  });
  const n = visibleOrder.length || 1;

  let startPct = 0;
  return segments.map((s, i) => {
    const startFrac = startPct / 100;
    startPct += s.value;

    const slot = visibleOrder.indexOf(i);
    let fill;
    if (s.value <= 0) {
      fill = progress >= 1 ? 1 : 0;
    } else {
      fill = easeInOutCubic(Math.max(0, Math.min(1, progress * n - slot)));
    }

    return {
      ...s,
      startFrac,
      spanFrac: s.value / 100,
      fill,
      shown: s.value * fill,
    };
  });
}

function PieChart({ arcs, ariaLabel }) {
  const slices = arcs.filter((a) => a.spanFrac > 0);

  return (
    <div className="sim-chart-wrap">
      <div className="sim-pie-frame">
        <svg
          className="sim-pie-chart"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={ariaLabel}
        >
          <defs>
            <filter id="sim-slice-shadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#1f374c" floodOpacity="0.16" />
            </filter>
            <radialGradient id="sim-slice-sheen" cx="0.3" cy="0.25" r="0.9">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.26" />
              <stop offset="58%" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle className="sim-pie-base" cx={CENTER} cy={CENTER} r={RADIUS} />

          {slices.map((a) => {
            if (a.fill <= 0.001) return null;

            const midDeg = (a.startFrac + a.spanFrac / 2) * 360;
            const startDeg = a.startFrac * 360;
            const endDeg = (a.startFrac + a.spanFrac * a.fill) * 360;
            if (endDeg - startDeg < 0.1) return null;

            const { dx, dy } = explodeOffset(midDeg);
            const d = wedgePath(startDeg, endDeg);
            const labelPos = polarToCartesian(midDeg, RADIUS * 0.58);

            return (
              <g key={a.label} transform={`translate(${dx.toFixed(2)} ${dy.toFixed(2)})`}>
                <path className="sim-pie-slice" d={d} fill={a.color} filter="url(#sim-slice-shadow)" />
                <path d={d} fill="url(#sim-slice-sheen)" />
                <text
                  className="sim-pie-percent"
                  x={labelPos.x}
                  y={labelPos.y}
                  style={{
                    opacity: a.fill > 0.55 ? 1 : 0,
                    transform: a.fill > 0.55 ? "scale(1)" : "scale(0.4)",
                    transformOrigin: `${labelPos.x.toFixed(2)}px ${labelPos.y.toFixed(2)}px`,
                  }}
                >
                  {Math.round(a.value)}%
                </text>
              </g>
            );
          })}
          <circle className="sim-pie-ring" cx={CENTER} cy={CENTER} r={RADIUS} />
        </svg>
      </div>
    </div>
  );
}

function Simulador() {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [chartReady, setChartReady] = useState(() => {
    if (typeof window === "undefined") return true;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return prefersReducedMotion || typeof IntersectionObserver === "undefined";
  });

  const segments = normalizeSegments(t.simulador.segments).map((segment, i) => ({
    ...segment,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  useEffect(() => {
    const node = cardRef.current;
    if (!node || chartReady) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setHasStarted(true);
        timer = window.setTimeout(() => setChartReady(true), 1200);
      },
      { threshold: 0.38 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [chartReady]);

  const progress = useCountUp(chartReady, 1500);
  const arcs = computeArcs(segments, progress);
  const ariaLabel = segments.map((s) => `${s.label} ${Math.round(s.value)}%`).join(", ");

  return (
    <section className="section simulador-section" id="simulador">
      <div className="wrap simulador-shell">
        <Reveal className="simulador-copy">
          <div className="simulador-eyebrow">{t.simulador.eyebrow}</div>
          <h2>{t.simulador.title}</h2>
          <p>{t.simulador.subtitle}</p>
          <div className="simulador-actions">
            <a href="#reservar" className="btn btn--primary">
              {t.simulador.ctaPrimary}
            </a>
            <a href="#contacto" className="btn btn--secondary">
              {t.simulador.ctaSecondary}
            </a>
          </div>
        </Reveal>

        <Reveal className="simulador-card" delay={90}>
          <div ref={cardRef}>
          <div className="simulador-card-head">
            <strong>{t.simulador.noteBrand}</strong>
            <span>{t.simulador.note}</span>
          </div>
          <div className="simulador-badges">
            {t.simulador.badges.map((badge) => (
              <div className="simulador-badge" key={badge.label}>
                <strong>{badge.value}</strong>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
          <div className={`simulador-progress ${hasStarted || chartReady ? "is-animating" : ""}`}>
            {t.simulador.processSteps.map((step, i) => (
              <div className={`simulador-progress-step ${i < 4 ? "complete" : ""}`} style={{ "--step-index": i }} key={step}>
                <span aria-hidden="true" />
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className={`simulador-chart-panel ${chartReady ? "is-ready" : ""}`}>
            <div className="simulador-chart-layout">
              <PieChart arcs={arcs} ariaLabel={ariaLabel} />
              <ul className="simulador-distribution">
                {arcs.map((a) => (
                  <li
                    key={a.label}
                    className={
                      a.spanFrac > 0 ? (a.fill >= 1 ? "is-done" : a.fill > 0 ? "is-filling" : "") : ""
                    }
                  >
                    <span
                      className="sim-chart-dot"
                      style={{ background: a.color, transform: `scale(${(0.55 + 0.45 * a.fill).toFixed(3)})` }}
                      aria-hidden="true"
                    />
                    <span>{a.label}</span>
                    <strong>{Math.round(a.shown)}%</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href="#contacto" className="btn btn--primary simulador-card-cta">
            {t.simulador.ctaCard}
          </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Simulador;
