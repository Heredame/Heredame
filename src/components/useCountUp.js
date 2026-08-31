import { useEffect, useRef, useState } from "react";

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function useCountUp(targets, duration = 1200) {
  const ref = useRef(null);
  const [values, setValues] = useState(() => targets.map(() => 0));
  const targetKey = targets.join(",");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const showFinalValues = () => setValues(targets);
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      showFinalValues();
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const easedProgress = easeOutCubic(progress);
          setValues(targets.map((target) => Math.round(target * easedProgress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
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
  }, [duration, targetKey]);

  return [ref, values];
}

export default useCountUp;
