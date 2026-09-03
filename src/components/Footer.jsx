import { useLanguage } from "../i18n/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <img
            className="site-logo site-logo--footer"
            src="/images/logo%20horizontal%202.png"
            alt="Herédame"
          />
          <span>{t.footer.tagline}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrap footer-bottom-inner">
          <span>
            © {year} heredame.cl — {t.footer.rights}
          </span>
          <a href="#">{t.footer.legal}</a>
          <span>
            {t.footer.credit}{" "}
            <a
              href="https://devdenilson.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Devdenilson.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
