// HeroSection.tsx
import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="logo-container">
          <div className="ieee-logo">IEEE</div>
          <div className="sscs-logo">SSCS</div>
        </div>
        
        <h1 className="hero-title">
          <span>Solid-State Circuits Society</span>
          Alexandria University Branch
        </h1>
        
        <p className="hero-subtitle">
          Advancing integrated circuit design and systems through education, research, and professional development
        </p>
        
        <div className="hero-cta">
          <button className="cta-primary">Join Our Community</button>
          <button className="cta-secondary">Upcoming Events</button>
        </div>
      </div>
      
      <div className="hero-decoration">
        <div className="circuit-line"></div>
        <div className="chip-icon">
          <div className="chip-core"></div>
          <div className="chip-pins">
            {[...Array(16)].map((_, i) => <div key={i} className="chip-pin"></div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
{/*
import './JoinUs.css';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
    const navigate = useNavigate();
    
    function handleClick() {
        navigate('/signup');
    }

    return (
        <section className="journey-section">
            <div className="journey-container">
                <div className="journey-content">
                    <a href="#" className="journey-title-link">
                        Your Journey in Solid-State Starts Here
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="journey-arrow"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                            />
                        </svg>
                    </a>
                    <p className="journey-description">
                        Connect with like-minded engineers, access exclusive events, 
                        and grow your skills in the world of solid-state circuits.
                    </p>
                    <div className="journey-button-container">
                        <button
                            className="journey-button"
                            onClick={handleClick}
                        >
                            Join Us
                        </button>
                    </div>
                </div>
                
                <div className="journey-image-container">
                    <div className="journey-image-placeholder" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src="https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Abstract solid-state circuits"
                            className="journey-image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default JoinUs;*/}