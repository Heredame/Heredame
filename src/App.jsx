import Seo from "./seo/Seo";
import StructuredData from "./seo/StructuredData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Simulador from "./components/Simulador";
import Stats from "./components/Stats";
import QuienesSomos from "./components/QuienesSomos";
import Beneficios from "./components/Beneficios";
import ComoFunciona from "./components/ComoFunciona";
import Servicios from "./components/Servicios";
import Booking from "./components/Booking";
import Diferenciadores from "./components/Diferenciadores";
import Faq from "./components/Faq";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";
import BackToTopLogo from "./components/BackToTopLogo";
import LegalPage from "./components/LegalPage";
import "./App.css";
import { useEffect } from "react";

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return undefined;

    const scrollToHash = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;

      const headerOffset = 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, targetTop - headerOffset),
        behavior: "auto",
      });
    };

    let correctionTimer;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(correctionTimer);
      correctionTimer = window.setTimeout(scrollToHash, 120);
    });

    window.requestAnimationFrame(scrollToHash);
    observer.observe(document.body);
    const stopObservingTimer = window.setTimeout(() => observer.disconnect(), 2000);

    return () => {
      window.clearTimeout(correctionTimer);
      window.clearTimeout(stopObservingTimer);
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname === "/terminos" || pathname === "/condiciones") {
    return <LegalPage type={pathname.slice(1)} />;
  }

  return (
    <>
      <Seo />
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Stats />
        <QuienesSomos />
        <Diferenciadores />
        <Beneficios />
        <ComoFunciona />
        <Servicios />
        <Simulador />
        <Booking />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <BackToTopLogo />
      <WhatsappButton />
    </>
  );
}

export default App;
