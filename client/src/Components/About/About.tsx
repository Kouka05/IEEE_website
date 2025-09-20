import React from 'react';
import './About.css';

const stories = [
  {
    date: '1991',
    title: 'Branch Establishment',
    description:
      '3rd IEEE branch in Egypt, A step in bringing IEEE’s spirit of technical and professional engagement to Alexandria.',
  },
  {
    date: '2000-2001',
    title: 'First External Activity',
    description:
      'Beginning of outreach beyond campus, setting the tone for a legacy of engagement and collaboration.',
  },
  {
    date: '2005',
    title: 'Branch 1st Expansion',
    description:
      'Expanded further by organizing Interact with Tomorrow’s World (ITW), then the largest technology event in Egypt.',
  },
  {
    date: '2008',
    title: 'Largest Student Branch in R8',
    description:
      'Recognized as largest in R8, supported by around 300 volunteers and a strong student membership.',
  },
  {
    date: '2011-2013',
    title: 'Branch 2nd Expansion',
    description:
      'Expanded by opening chapters and launched programs including ROPE, EDM, Protons, TechTalks and SolidNVoid.',
  },
  {
    date: '2012-2013',
    title: 'Chapter Establishment',
    description:
      'Founded by Meghad and Ayesh, under supervision of Dr. Shalaby, establishing a platform for ICs within AlexSB.',
  },
  {
    date: '2015',
    title: 'First Chapter External Activity',
    description:
      'Launched the Chipions program in partnership with VLSI Egypt, followed by visits, webinars, and other activities.',
  },
  {
    date: '2025',
    title: 'Chapter 1st Expansion',
    description:
      'Expanded with three programs (AlexDuino, Si-Cast, and Si-Clash) and introduced its mega, the HW Carnival.',
  }
];

const About: React.FC = () => {
  return (
    <div className="about-gradient-bg">
      {/* Hero Section */}
      <div className="about-hero-img-section">
        <div className="about-hero-img-overlay" />
        <div className="about-hero-img-content">
          <div className="about-hero-img-title-row reveal reveal-slow">
            <span className="about-hero-img-gold-bar" />
            <span className="about-hero-img-title">Our Story</span>
          </div>
          <div className="about-hero-img-text reveal reveal-slow" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            Since our inception, SSCS AlexSBC has grown from a small study group into the first SSCS student chapter in the MENA region. Milestones include our inaugural workshop series, the launch of the Chipions digital‑design academy in 2015, and the organization of Alexandria’s first hardware carnival. Each step underscores our commitment to education, networking, and real‑world skill development.
          </div>
        </div>
      </div>

      {/* Vision, Mission, Values Section */}
      <div className="about-vmv-section">
        <div className="about-vmv-row">
          <div className="about-vmv-block reveal reveal-slow">
            <div className="about-vmv-title">Who We Are</div>
            <div className="about-vmv-gold-underline" />
            <div className="about-vmv-text">
              The SSCS Alexandria Branch (SSCS AlexSBC) is a student‑run chapter of the IEEE Solid‑State Circuits Society. Founded in 2012 under the IEEE Alexandria University Student Branch, we bring together over 200 passionate members—undergraduates, graduate students, and young professionals—dedicated to advancing semiconductor technology in Egypt and beyond.
            </div>
          </div>
          <div className="about-vmv-block reveal reveal-slow" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            <div className="about-vmv-title">Our Team</div>
            <div className="about-vmv-gold-underline" />
            <div className="about-vmv-text">
              Steered by an elected Chair and supported by a Board of Governors, Technical Chairs, and volunteer committees, our branch combines academic rigor with creative energy. Our governance structure ensures transparent decision‑making, a strong brand identity, and award‑winning project delivery.
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <h2 className="about-history-title reveal reveal-slow">Our Story</h2>
      <div className="about-timeline-center">
        <div className="about-timeline-vertical-line" />
        {stories.map((story, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={story.date} className={`about-timeline-row ${isLeft ? 'left' : 'right'} reveal reveal-slow`} style={{ '--reveal-delay': `${(idx % 4) * 80}ms` } as React.CSSProperties}>
              <div className="about-timeline-card-wrapper">
                <div className="about-timeline-card">
                  <div className="about-timeline-dot-line">
                    <span className="about-timeline-dot" />
                    <span className="about-timeline-horizontal-line" />
                  </div>
                  <div className="about-timeline-content about-timeline-content-flex">
                    <div className="about-timeline-text-block">
                      <div className="about-timeline-date-red">{story.date}</div>
                      <div className="about-timeline-title">{story.title}</div>
                      <div className="about-timeline-description">{story.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;