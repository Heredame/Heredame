import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const ICONS = [
  // unlock
  <>
    <path className="benefit-lock-shackle" key="unlock-shackle" d="M7.5 11V7a4.5 4.5 0 0 1 8.4-2.3" />
    <path key="unlock-body" d="M6 11h12v10H6zM12 15v3" />
  </>,
  // shield
  <path key="shield" d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />,
  // handshake / check
  <path key="check" d="M4 12l5 5L20 6" />,
  // heart / people
  <path key="people" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
];

function Beneficios() {
  const { t } = useLanguage();

  return (
    <section className="section" id="beneficios">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.beneficios.eyebrow}</div>
          <h2>{t.beneficios.title}</h2>
          <p>{t.beneficios.subtitle}</p>
        </Reveal>
        <div className="grid grid--4 beneficios-grid">
          {t.beneficios.items.map((item, i) => (
            <Reveal as="div" className="card card--hoverable benefit-card" key={item.title} delay={i * 80}>
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[i % ICONS.length]}
                </svg>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Beneficios;
