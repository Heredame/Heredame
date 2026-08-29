import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

function Diferenciadores() {
  const { t } = useLanguage();

  return (
    <section className="section section-divider diferenciadores-section" id="diferenciadores">
      <div className="wrap diferenciadores-grid">
        <Reveal className="diferenciadores-copy">
          <div className="eyebrow">{t.diferenciadores.eyebrow}</div>
          <h2>{t.diferenciadores.title}</h2>
        </Reveal>
        <div className="diferenciadores-list">
          {t.diferenciadores.items.map((item, i) => (
            <Reveal as="div" className="diferenciador-item" key={item.title} delay={i * 90}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Diferenciadores;
