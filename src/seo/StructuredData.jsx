import { useEffect } from "react";

const SITE_URL = "https://heredame.cl"; // TODO: confirm final production domain

// JSON-LD Organization + LegalService structured data — helps Google show
// Herédame as a recognized entity (knowledge panel eligibility, rich
// results). Static in Spanish since it describes the business, not the UI.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Herédame",
  alternateName: "Heredame",
  description:
    "Plataforma de mediación y gestión de herencias en Chile: simulador gratuito, diagnóstico patrimonial, mediación familiar y planificación de legado.",
  url: SITE_URL,
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
  },
  priceRange: "$$",
  slogan: "Transformamos herencias en tranquilidad",
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
