import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import useCountUp from "./useCountUp";

function StatValue({ value }) {
  const [ref, values] = useCountUp([30, 50]);

  return (
    <strong ref={ref} className="stat-value" aria-label={value}>
      {values[0]}%–{values[1]}%
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
        <div className="stats-grid">
          {t.stats.items.map((item, i) => (
            <Reveal as="article" className="stat-item" key={item.title} delay={i * 100}>
              <span className="stat-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {item.value && <StatValue value={item.value} />}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
