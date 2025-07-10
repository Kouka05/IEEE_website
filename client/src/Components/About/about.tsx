import React from 'react';
import './about.css';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, className }) => (
  <div className={className}>
    <h2>{title}</h2>
    <p>{children}</p>
  </div>
);

interface IconInfoProps {
  icon: string;
  title: string;
  text: string;
}

const IconInfo: React.FC<IconInfoProps> = ({ icon, title, text }) => (
  <div className="icon-info-item">
    <div className="icon-container">
      {/* In a real app, you would use an icon library like react-icons */}
      <span className="icon-placeholder">{icon}</span>
    </div>
    <div className="icon-info-text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);


// MY SWEET STORAGE SAVER
const AboutPage: React.FC = () => {
  const partners = [
    { name: 'Siemens Healthineers', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Siemens_Healthineers_logo.svg' },
    { name: 'Eventum Solutions', logo: 'https://cdn.prod.website-files.com/665832f713e86b4a425d7531/6669a235fc73de73cd977740_New%20Logo%20Horizontal-p-500.png' },
    { name: 'Valeo', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Valeo_Logo.svg' },
    { name: 'VSLI EGYPT', logo: 'https://media-exp1.licdn.com/dms/image/C560BAQH_mkyu88X_lA/company-logo_200_200/0/1519876245645?e=2159024400&v=beta&t=xhuU_hRa2mfVT649fSDxITHh0n3UoJpTQlyNKnKmFc8' },
    { name: 'IEEE Egypt Section', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png' },
    { name: 'Cpedia', logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/30/27/4a/30274a7b-900f-1a86-6f04-fb0f6134ba61/AppIcon.lsr/1200x630bb.png' },
    { name: 'Si-Ware Systems', logo: 'https://www.si-ware.com/wp-content/uploads/2021/09/si-ware-logo.png' },
    { name: 'Si-Vision', logo: 'https://www.si-vision.com/wp-content/uploads/2020/01/si-vision-logo.png' },
    { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/1200px-Cisco_logo.svg.png' },
    { name: 'Nile University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Nile_University_logo.svg/1200px-Nile_University_logo.svg.png' },
    { name: 'ITIDA', logo: 'https://www.itida.gov.eg/English/PublishingImages/itida-logo.png' },
    { name: 'Microsoft Research', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Microsoft_Research_logo.svg/1200px-Microsoft_Research_logo.svg.png' },
    { name: 'Vodafone', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Vodafone_icon.svg/1200px-Vodafone_icon.svg.png' },
    { name: 'NTRA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/NTRA_Logo.svg/1200px-NTRA_Logo.svg.png' },
  ];

  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About</h1>
        <div className="header-logos">
           <span>Part of: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png" alt="IEEE Power Electronics Society" /></span>
           <span>Powered of: <img src="https://www.pst.edu.eg/wp-content/uploads/2020/09/PST-Logo-Final-e1600181186835.png" alt="PST" /></span>
           <span>Backed of: <img src="https://www.eme-eg.com/wp-content/uploads/2020/09/eme-logo.png" alt="EME" /></span>
        </div>
      </header>

      <main>
        {/* IEEE Section */}
        <section className="info-card-section">
          <div className="info-card-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png" alt="IEEE Logo" />
          </div>
          <div className="info-card-content">
            <InfoSection title="IEEE" className="info-column">
              The IEEE is the world's largest technical organization, with 400,000+ members in over 160 countries. It advances technology through research, standards, conferences, education, and networking, supporting innovation to solve global challenges.
              <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer">https://www.ieee.org/</a>
            </InfoSection>
            <InfoSection title="IEEE AlexSB" className="info-column">
              The IEEE Alexandria University Student Branch, one of the largest in IEEE Region 8 since 2000, part of the IEEE Egypt Section with 500+ Volunteers.
              <a href="https://www.alexsb.org/" target="_blank" rel="noopener noreferrer">https://www.alexsb.org/</a>
            </InfoSection>
          </div>
        </section>

        {/* SSCS Section */}
        <section className="info-card-section sscs-section">
          <div className="info-card-logo">
            <img src="https://ieee-sscs.org/images/sscs_logo_2020.png" alt="SSCS Logo" />
          </div>
          <div className="info-card-content">
            <InfoSection title="SSCS" className="info-column">
              The IEEE Solid-State Circuits Society (SSCS) advances the design and application of solid-state circuits, including analog, digital, RF, and VLSI technologies. It connects professionals and students worldwide through top publications, flagship conferences like ISSCC, and programs that promote innovation and learning.
              <a href="https://sscs.ieee.org/" target="_blank" rel="noopener noreferrer">https://sscs.ieee.org/</a>
            </InfoSection>
            <InfoSection title="SSCS AlexSBC" className="info-column">
              The SSCS Alexandria University Student Branch Chapter, 1st in MENA and MEA Region, part of the IEEE AlexSB since 2012 with 200+ independent Volunteers.
              <a href="https://sscsalex.org/" target="_blank" rel="noopener noreferrer">https://sscsalex.org/</a>
            </InfoSection>
          </div>
        </section>

        {/* Vision, Mission, Objective Section */}
        <section className="vmo-section">
          <IconInfo icon="💡" title="Vision" text="Cultivating next generation of leaders and pioneers in the semiconductors industry" />
          <IconInfo icon="🎯" title="Mission" text="Building a supportive ecosystem that equips youth with the knowledge, skills, and opportunities needed to excel through education and industry engagement" />
          <IconInfo icon="📝" title="Objective" text="Spread awareness about the semiconductor industry. Train students with hands-on skills and industry insights. Empower talents by capitalizing leadership and innovation." />
        </section>

        {/* Strategy Section */}
        <section className="strategy-section">
          <div className="strategy-header">
             <span className="icon-placeholder">🔗</span>
             <h2>Strategy</h2>
          </div>
          <div className="strategy-bubbles">
            <div className="bubble">Aware</div>
            <div className="bubble">Educate</div>
            <div className="bubble">Empower</div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="activities-section">
            <InfoSection title="Activities">
              SSCS AlexSBC organizes a variety of oncampus seminars, targeted towards raising the awareness of engineering students, where several technical and non-technical fields are discussed.
            </InfoSection>
             <InfoSection title="Activities">
             Visits: SSCS AlexSBC organizes a variety of oncampus seminars, targeted towards raising the awareness of engineering students, where several technical and non-technical fields are discussed.
            </InfoSection>
        </section>

        {/* Chipions Section */}
        <section className="chipions-section">
            <img src="https://i.imgur.com/ODp9iTj.png" alt="Chipions Logo" className="chipions-logo"/>
            <h3>Chipions</h3>
            <p>Launched in 2015, Chipions was one of Egypt's few digital design training programs and the first in Alexandria, training over 1,000 participants in the full VLSI design flow.</p>
        </section>

        {/* Achievement Section */}
        <section className="achievement-section">
            <h2>Achievement</h2>
            <img src="https://i.imgur.com/uQy3C2s.png" alt="Achievements" className="achievement-image"/>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
            <h2>Old Partners</h2>
            <div className="partners-grid">
                {partners.map(partner => (
                    <div key={partner.name} className="partner-logo">
                        <img src={partner.logo} alt={`${partner.name} logo`} onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x70/ffffff/cccccc?text=Logo+Not+Found'; }} />
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
