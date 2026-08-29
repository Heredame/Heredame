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
import "./App.css";

function App() {
  return (
    <>
      <Seo />
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Stats />
        <QuienesSomos />
        <Beneficios />
        <ComoFunciona />
        <Servicios />
        <Simulador />
        {/* Booking sits in the middle of the page on purpose — right after
            people understand the service ladder, before the deeper "about
            us" / differentiators content. */}
        <Booking />
        <Diferenciadores />
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
