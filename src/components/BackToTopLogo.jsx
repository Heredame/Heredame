import { useEffect, useState } from "react";

function BackToTopLogo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`back-top-logo ${visible ? "visible" : ""}`}
      href="#inicio"
      aria-label="Volver al inicio"
    >
      <span className="back-top-arrow" aria-hidden="true">↑</span>
    </a>
  );
}

export default BackToTopLogo;
