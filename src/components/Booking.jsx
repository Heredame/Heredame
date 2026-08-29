import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

/**
 * Placeholder for the free 30-minute call booking widget.
 *
 * To wire up Cal.com later:
 * 1. npm install @calcom/embed-react
 * 2. Replace the <div className="booking-placeholder"> block below with:
 *
 *      import Cal, { getCalApi } from "@calcom/embed-react";
 *      import { useEffect } from "react";
 *
 *      useEffect(() => {
 *        (async function () {
 *          const cal = await getCalApi();
 *          cal("ui", { theme: "light", styles: { branding: { brandColor: "#2b4863" } } });
 *        })();
 *      }, []);
 *
 *      <Cal
 *        calLink="your-cal-username/30min"   // swap for your real Cal.com event link
 *        style={{ width: "100%", height: "100%", overflow: "scroll" }}
 *        config={{ layout: "month_view" }}
 *      />
 *
 * No API key needed for the basic embed — calLink is enough. Keep this
 * section's id="reservar" so the header/hero CTAs keep working unchanged.
 */
function Booking() {
  const { t } = useLanguage();

  return (
    <section className="section section-divider booking-section" id="reservar">
      <div className="wrap">
        <Reveal as="div" className="card booking-card">
          <div className="booking-copy">
            <div className="eyebrow">{t.booking.eyebrow}</div>
            <h2>{t.booking.title}</h2>
            <p>{t.booking.subtitle}</p>
          </div>
          <div className="booking-placeholder" aria-hidden="true">
            {/* Cal.com embed goes here — see the comment above this component */}
            <span>{t.booking.placeholderNote}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Booking;
