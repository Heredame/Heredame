import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const SITE_URL = "https://heredame.cl"; // TODO: confirm final production domain

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href, extra = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}

/**
 * Keeps <title>, meta description/OG/Twitter tags, canonical and hreflang
 * links in sync with the active language. Since this is a single-page site
 * (no router), all sections share one URL — hreflang here signals language
 * variants of the same page via a query param, which is enough for a
 * same-URL toggle. If this ever becomes multi-route, switch to real
 * per-language paths (e.g. /en) for cleaner SEO.
 */
function Seo() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
    setMeta("name", "description", t.meta.description);
    setMeta("property", "og:title", t.meta.title);
    setMeta("property", "og:description", t.meta.description);
    setMeta("property", "og:locale", lang === "es" ? "es_CL" : "en_US");
    setMeta("property", "og:url", SITE_URL);
    setMeta("name", "twitter:title", t.meta.title);
    setMeta("name", "twitter:description", t.meta.description);
    setLink("canonical", SITE_URL);
  }, [lang, t]);

  return null;
}

export default Seo;
