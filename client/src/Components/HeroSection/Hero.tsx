import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

interface HeroProps {
    navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const [hours, setHours] = useState(0);
    const [alumni, setAlumni] = useState(0);
    const [activity, setActivity] = useState(0);
    const impactRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const targetValues = { hours: 2500, alumni: 1000, activity: 100 };
        const durationMs = 1500;

        const startAnimation = () => {
            if (hasAnimated) return;
            setHasAnimated(true);
            const start = performance.now();
            const step = (now: number) => {
                const progress = Math.min((now - start) / durationMs, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setHours(Math.floor(targetValues.hours * easeOut));
                setAlumni(Math.floor(targetValues.alumni * easeOut));
                setActivity(Math.floor(targetValues.activity * easeOut));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const el = impactRef.current;
        if (!el) {
            startAnimation();
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startAnimation();
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div className="hero-section">
            <div className="hero-circuit-overlay"></div>
            <div className="hero-container">
                <div className="header-branding reveal reveal-slow">
                    <div className="sscs-logo">SSCS</div>
                    <div className="branch-name">ALEXANDRIA STUDENT BRANCH</div>
                </div>
                
                <h1 className="hero-title reveal reveal-slow" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
                    <span className="title-line">SOLID-STATE CIRCUITS</span>
                    <span className="title-line">SOCIETY</span>
                </h1>
                
                <p className="hero-description reveal reveal-slow" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
                    Empowering students, researchers, and professionals through innovation, 
                    collaboration, and cutting-edge education in solid-state circuits.
                </p>
                
                <div className="hero-buttons reveal reveal-slow" style={{ '--reveal-delay': '240ms' } as React.CSSProperties}>
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
            <section className="hero-welcome reveal reveal-slow" style={{ '--reveal-delay': '280ms' } as React.CSSProperties}>
                <p>
                    Welcome to the IEEE Solid‑State Circuits Society (SSCS) Alexandria Branch—your local nexus for semiconductor innovation, hands‑on design, and professional growth. Chartered through Alexandria University and recognized by IEEE Region 8’s Egypt Section, we unite students, researchers, and industry experts to push the boundaries of analog, digital, RF, and mixed‑signal circuits. Dive into our programs, explore upcoming events, and discover how you can join our vibrant community.
                </p>
            </section>
            <div className="hero-impact reveal reveal-slow" style={{ '--reveal-delay': '320ms' } as React.CSSProperties} ref={impactRef}>
                <h2 className="impact-title">Chapter Impact</h2>
                <div className="impact-grid">
                    <div className="impact-item">
                        <div className="impact-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                                <path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="impact-number"><span className="plus">+</span>{hours.toLocaleString()}</div>
                        <div className="impact-label">Hours</div>
                        <div className="impact-sub">Over 2,500 hours of training and hands‑on experience</div>
                    </div>
                    <div className="impact-item">
                        <div className="impact-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="white" strokeWidth="2"/>
                                <path d="M3 19c.5-3.5 4-6 9-6s8.5 2.5 9 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="impact-number"><span className="plus">+</span>{alumni.toLocaleString()}</div>
                        <div className="impact-label">Alumni</div>
                        <div className="impact-sub">Over 1000 Alumni who have been part of our journey</div>
                    </div>
                    <div className="impact-item">
                        <div className="impact-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7l2 4h4l-3.2 2.3L16 18l-4-2.5L8 18l1.2-4.7L6 11h4l2-4z" fill="none" stroke="white" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="impact-number"><span className="plus">+</span>{activity.toLocaleString()}</div>
                        <div className="impact-label">Activity</div>
                        <div className="impact-sub">Interactive activities done for learning and growth</div>
                    </div>
                </div>
            </div>

            <section className="partners-section">
                <h3 className="partners-title">Our Partners</h3>
                <div className="partners-marquee">
                    <div className="partners-track">
                        <div className="partners-group">
                            <img src="/aast.png" alt="aast" className="partner-logo" />
                            <img src="/cisco.png" alt="cisco" className="partner-logo" />
                            <img src="/eventum.png" alt="eventum" className="partner-logo" />
                            <img src="/itidia.png" alt="itidia" className="partner-logo" />
                            <img src="/micrososft.png" alt="microsoft" className="partner-logo" />
                            <img src="/nile.png" alt="nile" className="partner-logo" />
                            <img src="/si-vision.webp" alt="Si-vision" className="partner-logo" />
                            <img src="/si-ware.png" alt="Si-ware" className="partner-logo" />
                            <img src="/valeo.png" alt="valeo" className="partner-logo" />
                            <img src="/vlsi.png" alt="vlsi" className="partner-logo" />
                        </div>
                        <div className="partners-group">
                            <img src="/aast.png" alt="aast" className="partner-logo" />
                            <img src="/cisco.png" alt="cisco" className="partner-logo" />
                            <img src="/eventum.png" alt="eventum" className="partner-logo" />
                            <img src="/itidia.png" alt="itidia" className="partner-logo" />
                            <img src="/micrososft.png" alt="microsoft" className="partner-logo" />
                            <img src="/nile.png" alt="nile" className="partner-logo" />
                            <img src="/si-vision.webp" alt="Si-vision" className="partner-logo" />
                            <img src="/si-ware.png" alt="Si-ware" className="partner-logo" />
                            <img src="/valeo.png" alt="valeo" className="partner-logo" />
                            <img src="/vlsi.png" alt="vlsi" className="partner-logo" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;