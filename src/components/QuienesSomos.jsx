import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

function QuienesSomos() {
  const { t } = useLanguage();

  return (
    <section className="section section-divider quienes-section" id="quienes-somos">
      <div className="wrap quienes-grid">
        <Reveal className="quienes-media" delay={90}>
          <img src="/images/about-us.jpg" alt={t.quienesSomos.imageAlt} loading="lazy" />
          <span className="quienes-note">{t.quienesSomos.experienceNote}</span>
        </Reveal>

        <Reveal className="quienes-copy">
          <div className="eyebrow">{t.quienesSomos.eyebrow}</div>
          <h2>{t.quienesSomos.title}</h2>
          <p>{t.quienesSomos.body}</p>
          <div className="quienes-tags" aria-label={t.quienesSomos.eyebrow}>
            {t.quienesSomos.highlights.map((highlight) => (
              <span className="quienes-tag" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default QuienesSomos;
