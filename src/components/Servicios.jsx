import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

function renderServiceBody(body) {
  return body.split(/(\$[\d.]+(?:\s*CLP)?|\d+(?:[–-]\d+)?%|\d+\s*UF)/g).map((part) => {
    if (/^(\$[\d.]+(?:\s*CLP)?|\d+(?:[–-]\d+)?%|\d+\s*UF)$/.test(part)) {
      return <strong className="servicio-text-highlight" key={part}>{part}</strong>;
    }

    return part;
  });
}

function Servicios() {
  const { t } = useLanguage();

  return (
    <section className="section section-divider servicios-section" id="servicios">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.servicios.eyebrow}</div>
          <h2>{t.servicios.title}</h2>
          <p>{t.servicios.subtitle}</p>
        </Reveal>
        <div className="servicios-grid">
          {t.servicios.items.map((item, i) => (
            <Reveal as="article" className="servicio-card" key={item.name} delay={(i % 4) * 70}>
              <div className="servicio-card-top">
                <span className="servicio-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="servicio-price">{item.price}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{renderServiceBody(item.body)}</p>
              <span className="servicio-arrow" aria-hidden="true">→</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
