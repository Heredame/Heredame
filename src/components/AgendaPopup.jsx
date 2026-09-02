import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const CAL_LINK = "informaciones-heredame-zuhrrt/30-min-llamada-gratuita-heredame";

function AgendaPopup() {
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    (async function initializeCal() {
      const cal = await getCalApi();
      if (cancelled) return;

      cal("ui", {
        styles: { branding: { brandColor: "#0D1741" } },
        layout: "month_view",
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const days = Array.from({ length: 35 }, (_, index) => index + 1);

  return (
    <section className="section section-divider booking-section booking-section--popup" id="reservar-popup">
      <div className="wrap">
        <Reveal as="div" className="card booking-card booking-card--popup">
          <div className="booking-copy">
            <div className="eyebrow">{t.booking.eyebrow}</div>
            <h2>{t.booking.title}</h2>
            <p>{t.booking.subtitle}</p>
          </div>
          <button
            className="agenda-popup-card"
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
            type="button"
          >
            <span className="agenda-popup-card__top">
              <span className="agenda-popup-card__month">Agenda</span>
              <span className="agenda-popup-card__pill">30 min</span>
            </span>
            <span className="agenda-popup-card__grid" aria-hidden="true">
              {days.map((day) => (
                <span
                  className={`agenda-popup-card__day${[10, 11, 17, 24].includes(day) ? " is-open" : ""}`}
                  key={day}
                />
              ))}
            </span>
            <span className="agenda-popup-card__cta">Ver disponibilidad</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export default AgendaPopup;
