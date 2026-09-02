import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const CAL_LINK = "informaciones-heredame-zuhrrt/30-min-llamada-gratuita-heredame";

function Booking() {
  const { t } = useLanguage();

  useEffect(() => {
    let mediaQuery;
    let renderCalendar;
    let cancelled = false;

    (async function initializeCal() {
      const cal = await getCalApi();
      if (cancelled) return;

      mediaQuery = window.matchMedia("(max-width: 640px)");

      renderCalendar = () => {
        cal("inline", {
          elementOrSelector: "#my-cal-inline",
          calLink: CAL_LINK,
          config: {
            layout: mediaQuery.matches ? "column_view" : "month_view",
            theme: "light",
          },
        });
      };

      cal("ui", {
        styles: { branding: { brandColor: "#0D1741" } },
        theme: "light",
      });
      renderCalendar();
      mediaQuery.addEventListener("change", renderCalendar);
    })();

    return () => {
      cancelled = true;
      if (mediaQuery && renderCalendar) {
        mediaQuery.removeEventListener("change", renderCalendar);
      }
    };
  }, []);

  return (
    <section className="section section-divider booking-section" id="reservar">
      <div className="wrap">
        <Reveal as="div" className="card booking-card">
          <div className="booking-copy">
            <div className="eyebrow">{t.booking.eyebrow}</div>
            <h2>{t.booking.title}</h2>
            <p>{t.booking.subtitle}</p>
          </div>
          <div className="booking-calendar">
            <div id="my-cal-inline" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Booking;
