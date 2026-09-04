import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#quienes-somos", label: t.nav.quienesSomos },
    { href: "#diferenciadores", label: t.nav.diferenciadores },
    { href: "#beneficios", label: t.nav.beneficios },
    { href: "#servicios", label: t.nav.servicios },
    { href: "#como-funciona", label: t.nav.comoFunciona },
    { href: "#reservar", label: t.nav.agenda },
    { href: "#preguntas", label: t.nav.preguntas },
    { href: "#contacto", label: t.nav.contacto },
  ];

  return (
    <header id="site-header" className={scrolled ? "scrolled" : ""}>
      <div className="wrap header-row">
        <a href="#inicio" className="logo" onClick={() => setMenuOpen(false)}>
          <img
            className="site-logo site-logo--header"
            src="/images/logo%20horizontal%202.png"
            alt="Herédame"
          />
        </a>

        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? "open" : ""}`}
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="lang-switch"
            onClick={toggleLang}
            aria-label="Cambiar idioma / Switch language"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <a
            href="/simulador.html"
            className="btn btn--primary btn--sm header-cta"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
