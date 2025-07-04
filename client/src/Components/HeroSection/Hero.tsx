import React from 'react';
import './Hero.css';

interface HeroProps {
  navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <h1 className="hero-title">IEEE SSCS Alexandria</h1>
                <h2 className="hero-subtitle">Powering the Future of Electronics</h2>
                <p className="hero-description">
                    Empowering students, researchers, and professionals through innovation, collaboration, and cutting-edge education in solid-state circuits.
                </p>
                <div className="hero-buttons">
                    <button onClick={() => navigate('/about')} className="hero-button learn-more">
                        Learn More
                    </button>
                    <button onClick={() => navigate('/signIn')} className="hero-button join-scs">
                        Join SSCS
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;