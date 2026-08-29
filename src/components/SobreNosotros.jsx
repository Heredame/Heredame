import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

const teamImages = [
  "/images/team-constanza-perez.png",
  "/images/team-valentina-henriquez.png",
  "/images/team-adrian-lillo.png",
  "/images/team-fernando-guzman.png",
  "/images/team-abogada-legal-tech.png",
];

function SobreNosotros() {
  const { t } = useLanguage();

  return (
    <section className="section section-divider" id="nosotros">
      <div className="wrap nosotros-grid">
        <Reveal className="nosotros-copy">
          <div className="eyebrow">{t.nosotros.eyebrow}</div>
          <h2>{t.nosotros.title}</h2>
          <p>{t.nosotros.body}</p>
        </Reveal>
        <div className="nosotros-cards">
          <Reveal as="div" className="card nosotros-card">
            <span className="nosotros-label">{t.nosotros.mission.label}</span>
            <p>{t.nosotros.mission.body}</p>
          </Reveal>
          <Reveal as="div" className="card nosotros-card nosotros-card--dark" delay={80}>
            <span className="nosotros-label">{t.nosotros.vision.label}</span>
            <p>{t.nosotros.vision.body}</p>
          </Reveal>
        </div>
      </div>

      <div className="wrap team-wrap">
        <Reveal className="section-head center">
          <div className="eyebrow">{t.nosotros.team.eyebrow}</div>
          <h2>{t.nosotros.team.title}</h2>
          <p>{t.nosotros.team.subtitle}</p>
        </Reveal>
        <div className="team-grid">
          {t.nosotros.team.members.map((member, i) => (
            <Reveal as="div" className="card card--hoverable team-card" key={member.name} delay={i * 70}>
              <div className="team-photo-wrap">
                <img className="team-photo" src={teamImages[i]} alt={member.name} />
              </div>
              <div className="team-info">
                <strong className="team-name">{member.name}</strong>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SobreNosotros;
