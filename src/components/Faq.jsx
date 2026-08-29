import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button type="button" className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && <p className="faq-answer">{item.a}</p>}
    </div>
  );
}

function Faq() {
  const { t } = useLanguage();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [leftOpenIndex, setLeftOpenIndex] = useState(0);
  const [rightOpenIndex, setRightOpenIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateActiveSlide = () => {
      const nextSlide = Math.round(carousel.scrollLeft / carousel.clientWidth);
      setActiveSlide(Math.max(0, Math.min(1, nextSlide)));
    };

    updateActiveSlide();
    carousel.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      carousel.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  const scrollToSlide = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: carousel.clientWidth * index, behavior: "smooth" });
  };

  const columns = [
    {
      label: t.faq.tabLeft,
      items: t.faq.items,
      openIndex: leftOpenIndex,
      setOpenIndex: setLeftOpenIndex,
    },
    {
      label: t.faq.tabRight,
      items: t.faq.itemsExtra,
      openIndex: rightOpenIndex,
      setOpenIndex: setRightOpenIndex,
    },
  ];

  return (
    <section className="section section-divider" id="preguntas">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.faq.eyebrow}</div>
          <h2>{t.faq.title}</h2>
          <div className="faq-tabs" aria-label={t.faq.title}>
            {columns.map((column, i) => (
              <button
                type="button"
                className={`faq-tab ${activeSlide === i ? "active" : ""}`}
                onClick={() => scrollToSlide(i)}
                aria-pressed={activeSlide === i}
                key={column.label}
              >
                {column.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="faq-columns" ref={carouselRef}>
          {columns.map((column) => (
            <div className="faq-list" key={column.label}>
              {column.items.map((item, i) => (
                <Reveal as="div" key={item.q} delay={i * 45}>
                  <FaqItem
                    item={item}
                    isOpen={column.openIndex === i}
                    onToggle={() => column.setOpenIndex(column.openIndex === i ? -1 : i)}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
