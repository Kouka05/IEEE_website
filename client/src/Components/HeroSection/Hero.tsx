import React from 'react';
import './Hero.css';

interface HeroProps {
    navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
    return (
        <section className="hero-section">
            <div className="circuit-overlay"></div>
            <div className="hero-container">
                <div className="header-branding">
                    <div className="sscs-logo">SSCS</div>
                    <div className="branch-name">ALEXANDRIA STUDENT BRANCH</div>
                </div>
                
                <h1 className="hero-title">
                    <span className="title-line">SOLID-STATE CIRCUITS</span>
                    <span className="title-line">SOCIETY</span>
                </h1>
                
                <p className="hero-description">
                    Empowering students, researchers, and professionals through innovation, 
                    collaboration, and cutting-edge education in solid-state circuits.
                </p>
                
                <div className="hero-buttons">
                    <button 
                        onClick={() => navigate('/about')} 
                        className="hero-button learn-more"
                    >
                        Learn More
                    </button>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="hero-button join-scs"
                    >
                        Join SSCS
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;