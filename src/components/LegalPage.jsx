import Header from "./Header";
import Footer from "./Footer";

function LegalPage({ type }) {
  const isTermsPage = type === "terminos";
  const title = isTermsPage ? "Términos" : "Condiciones";

  return (
    <>
      <Header isLegalPage />
      <main className="legal-page">
        <div className="wrap">
          <h1>{title}</h1>
          <p>Contenido próximamente.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LegalPage;
