import { useEffect } from "react";

const SITE_URL = "https://www.heredame.cl/";

// JSON-LD Organization + LegalService structured data — helps Google show
// Herédame as a recognized entity (knowledge panel eligibility, rich
// results). Static in Spanish since it describes the business, not the UI.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${SITE_URL}#organization`,
      name: "Herédame",
      alternateName: "Heredame",
      description:
        "Plataforma de mediación y gestión de herencias en Chile, con simulador de herencia y orientación sobre procesos sucesorios.",
      url: SITE_URL,
      logo: `${SITE_URL}images/logo%20.png`,
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "CL",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "Herédame",
      url: SITE_URL,
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
      inLanguage: "es-CL",
    },
  ],
};

function StructuredData() {
  useEffect(() => {
    const existing = document.getElementById("structured-data-ld-json");
    if (existing) return; // static — only needs to be injected once

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "structured-data-ld-json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return null;
}

export default StructuredData;
