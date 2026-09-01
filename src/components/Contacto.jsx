import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  honeypot: "",
};

function Contacto() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return undefined;

    const timer = window.setTimeout(() => {
      setSuccessMessage("");
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{7,15}$/;

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((current) => ({
        ...current,
        phone: digitsOnly,
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedMessage) {
      return lang === "en"
        ? "Please complete the required fields: full name and your message."
        : "Completa los campos requeridos: nombre completo y tu mensaje.";
    }

    if (!trimmedPhone && !trimmedEmail) {
      return lang === "en"
        ? "Please provide at least one contact method: phone or email."
        : "Debes ingresar al menos un medio de contacto: teléfono o correo.";
    }

    if (trimmedPhone && !phoneRegex.test(trimmedPhone)) {
      return lang === "en"
        ? "Phone number must contain only digits and be valid."
        : "El teléfono solo puede contener números y debe ser válido.";
    }

    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      return lang === "en"
        ? "Please enter a valid email address."
        : "Ingresa un correo electrónico válido.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.honeypot) {
      return;
    }

    const validationMessage = validateForm();
    if (validationMessage) {
      setSuccessMessage("");
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          time: new Date().toLocaleString("es-CL", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        publicKey,
      );

      setSuccessMessage(
        lang === "en"
          ? "Thank you, your form has been successfully sent and we will get in touch as soon as possible."
          : "Gracias, tu formulario ha sido enviado correctamente y te contactaremos lo antes posible.",
      );
      setErrorMessage("");
      setFormData(emptyForm);
    } catch (error) {
      console.error("EmailJS error:", error);
      setErrorMessage(
        lang === "en"
          ? "There was a problem sending your message. Please try again."
          : "Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.",
      );
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
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

          <form className="contacto-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>
                {t.contacto.form.name}
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </label>
              <label>
                {t.contacto.form.phone}
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </label>
            </div>
            <label>
              {t.contacto.form.email}
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </label>
            <label>
              {t.contacto.form.message}
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contacto.form.messagePlaceholder}
              />
            </label>

            <div
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%" }}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? lang === "en"
                  ? "Sending..."
                  : "Enviando..."
                : t.contacto.form.submit}
            </button>

            <p className="form-note" aria-live="polite">
              {t.contacto.form.note}
            </p>
            {errorMessage && (
              <p
                className="form-note"
                aria-live="polite"
                style={{ color: "#c62828" }}
              >
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <div
                className="form-success-toast"
                role="status"
                aria-live="polite"
                style={{
                  position: "relative",
                  background: "#e8f5e9",
                  color: "#1b5e20",
                  border: "1px solid #a5d6a7",
                  borderRadius: "10px",
                  padding: "10px 36px 10px 12px",
                  marginTop: "10px",
                  fontSize: "0.92rem",
                  lineHeight: "1.5",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSuccessMessage("")}
                  aria-label="Cerrar notificación"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#1b5e20",
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
                {successMessage}
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default Contacto;
