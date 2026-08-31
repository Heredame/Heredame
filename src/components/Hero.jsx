import { useLanguage } from "../i18n/LanguageContext";

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="inicio">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">{t.hero.eyebrow}</div>
          <h1>{t.hero.title}</h1>
          <p className="hero-problem">{t.hero.problem}</p>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-actions">
            <a href="#simulador" className="btn btn--primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#reservar" className="btn btn--secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <p className="hero-trust-note">{t.hero.trustNote}</p>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-card">
            <img src="/images/firmando%20herencia%20.jpg" alt="Familia firmando documentos de herencia" />
            <div className="hero-note hero-note--top">
              <strong>24/7</strong>
              <span>Orientación inicial disponible</span>
            </div>
            <div className="hero-note hero-note--bottom">
              <small>Informe Herédame</small>
              <strong>Distribución, documentos y pasos a seguir</strong>
              <span>
                <i aria-hidden="true" />
                Listo para posesión efectiva y trámites posteriores
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
