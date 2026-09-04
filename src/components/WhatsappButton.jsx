import { useLanguage } from "../i18n/LanguageContext";

// TODO: swap for Herédame's real WhatsApp Business number (digits only,
// with country code, no "+" and no spaces — Chile = 56 9 XXXX XXXX).
const PHONE = "56932104944";

function WhatsappButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsapp.message)}`;

  return (
    <a
      href={href}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      title={t.whatsapp.label}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.61 4.33 1.68 6.13L3 29l8.02-2.6a11.98 11.98 0 0 0 5.02 1.1h.01c6.66 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.87h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.75 1.22 1.24-3.66-.24-.38a9.83 9.83 0 0 1-1.5-5.23c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.04 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.45 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}

export default WhatsappButton;
