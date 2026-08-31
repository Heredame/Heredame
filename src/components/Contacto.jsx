import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

function Contacto() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to a real endpoint (e.g. a Cloudflare Worker + email
    // service, or a form backend like Formspree) — it currently only opens
    // the visitor's email client as a safe default so nothing is lost.
    const form = e.target;
    const body = `Nombre: ${form.name.value}\nTeléfono: ${form.phone.value}\nEmail: ${form.email.value}\n\n${form.message.value}`;
    window.location.href = `mailto:info@heredame.cl?subject=Consulta desde heredame.cl&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="section section-divider" id="contacto">
      <div className="wrap">
        <Reveal as="div" className="contacto-grid">
          <div className="contacto-info">
            <div className="eyebrow">{t.contacto.eyebrow}</div>
            <h2>{t.contacto.title}</h2>
            <p>{t.contacto.subtitle}</p>
            <p className="contacto-hours">{t.contacto.hours}</p>
            <ul className="contacto-list">
              <li>
                <a href="tel:+56993977894">+56 9 9397 7894</a>
              </li>
              <li>
                <a href="mailto:info@heredame.cl">info@heredame.cl</a>
              </li>
              <li>Santiago, Chile</li>
            </ul>
          </div>

          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                {t.contacto.form.name}
                <input name="name" type="text" required />
              </label>
              <label>
                {t.contacto.form.phone}
                <input name="phone" type="tel" />
              </label>
            </div>
            <label>
              {t.contacto.form.email}
              <input name="email" type="email" required />
            </label>
            <label>
              {t.contacto.form.message}
              <textarea name="message" rows={4} placeholder={t.contacto.form.messagePlaceholder} />
            </label>
            <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
              {t.contacto.form.submit}
            </button>
            <p className="form-note">{sent ? "✓" : ""} {t.contacto.form.note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default Contacto;
