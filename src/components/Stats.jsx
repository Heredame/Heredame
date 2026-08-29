import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const DURATION = 1500;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function parseNumberPart(part) {
  return Number(part.replace(/\./g, "").replace(",", "."));
}

function formatNumberPart(value, template) {
  const hasDecimalComma = template.includes(",");
  const decimals = hasDecimalComma ? template.split(",")[1].length : 0;
  const rounded = value.toFixed(decimals);
  const [whole, decimal] = rounded.split(".");
  const withThousands = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return decimal ? `${withThousands},${decimal}` : withThousands;
}

function parseStatValue(value) {
  const suffix = value.match(/[^\d.,–-]+$/)?.[0] || "";
  const core = suffix ? value.slice(0, -suffix.length) : value;
  const parts = core.split(/[–-]/);

  return {
    parts,
    numbers: parts.map(parseNumberPart),
    separator: parts.length > 1 ? "–" : "",
    suffix,
  };
}

function AnimatedStatNumber({ value }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(() => {
    if (typeof window === "undefined") return 1;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return prefersReducedMotion || typeof IntersectionObserver === "undefined" ? 1 : 0;
  });
  const parsed = parseStatValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const next = Math.min((now - start) / DURATION, 1);
          setProgress(easeOutCubic(next));
          if (next < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const displayValue = parsed.parts
    .map((part, index) => formatNumberPart(parsed.numbers[index] * progress, part))
    .join(parsed.separator);

  return (
    <strong ref={ref} className="stat-value" aria-label={value}>
      {displayValue}
      {parsed.suffix}
    </strong>
  );
}

function Stats() {
  const { t } = useLanguage();

  return (
    <section className="section section--tight section-divider stats-section" id="por-que-existimos">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.stats.eyebrow}</div>
          <h2>{t.stats.title}</h2>
        </Reveal>
        <div className="grid grid--4 stats-grid">
          {t.stats.items.map((item, i) => (
            <Reveal as="div" className="stat-item" key={item.label} delay={i * 80}>
              <AnimatedStatNumber value={item.value} />
              <span>{item.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
