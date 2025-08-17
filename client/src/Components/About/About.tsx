import React from 'react';
import './About.css';

const stories = [
  {
    date: '2013-01-02',
    title: 'The beginning of it all',
    description:
      'Our journey started with a spark of inspiration! In 2013, a visionary counselor saw the potential in 12 passionate students and ignited their enthusiasm for joining the global IEEE community. By signing the IEEE petition, these students laid the foundation for the thriving INSAT IEEE Student Branch we know today. Their vision and initiative paved the way for countless opportunities for future generations.',
  },
  {
    date: '2015-05-10',
    title: 'First Major Conference',
    description:
      'In 2015, the branch hosted its first major conference, attracting students and professionals from across the region. This event marked a turning point, establishing our reputation for excellence and collaboration.',
  },
  {
    date: '2019-11-23',
    title: 'Innovation in Action',
    description:
      'By 2019, our members had launched several innovative projects, winning awards and recognition at national and international levels. Our commitment to pushing the boundaries of technology continues to inspire new generations.',
  },
];

const About: React.FC = () => {
  return (
    <div className="about-gradient-bg">
      {/* Hero Section */}
      <div className="about-hero-img-section">
        <div className="about-hero-img-overlay" />
        <div className="about-hero-img-content">
          <div className="about-hero-img-title-row">
            <span className="about-hero-img-gold-bar" />
            <span className="about-hero-img-title">Our Story</span>
          </div>
          <div className="about-hero-img-text">
            Since our inception, SSCS AlexSBC has grown from a small study group into the first SSCS student chapter in the MENA region. Milestones include our inaugural workshop series, the launch of the Chipions digital‑design academy in 2015, and the organization of Alexandria’s first hardware carnival. Each step underscores our commitment to education, networking, and real‑world skill development.
          </div>
        </div>
      </div>

      {/* Vision, Mission, Values Section */}
      <div className="about-vmv-section">
        <div className="about-vmv-row">
          <div className="about-vmv-block">
            <div className="about-vmv-title">Who We Are</div>
            <div className="about-vmv-gold-underline" />
            <div className="about-vmv-text">
              The SSCS Alexandria Branch (SSCS AlexSBC) is a student‑run chapter of the IEEE Solid‑State Circuits Society. Founded in 2012 under the IEEE Alexandria University Student Branch, we bring together over 200 passionate members—undergraduates, graduate students, and young professionals—dedicated to advancing semiconductor technology in Egypt and beyond.
            </div>
          </div>
          <div className="about-vmv-block">
            <div className="about-vmv-title">Our Team</div>
            <div className="about-vmv-gold-underline" />
            <div className="about-vmv-text">
              Steered by an elected Chair and supported by a Board of Governors, Technical Chairs, and volunteer committees, our branch combines academic rigor with creative energy. Our governance structure ensures transparent decision‑making, a strong brand identity, and award‑winning project delivery.
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <h2 className="about-history-title">Our Impact</h2>
      <div className="about-timeline-center">
        <div className="about-timeline-vertical-line" />
        {stories.map((story, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={story.date} className={`about-timeline-row ${isLeft ? 'left' : 'right'}`}>
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