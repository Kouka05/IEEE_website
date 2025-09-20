import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <section className="contact-section" data-reveal-on-load>
            <div className="contact-container">
                <h3 className="contact-title reveal" style={{ '--reveal-delay': '60ms' } as React.CSSProperties}>
                    Contact & Get Involved
                </h3>
                <p className="contact-intro reveal" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
                    Whether you're an industry partner, guest speaker, or volunteer, we'd love to work with you:
                </p>

                <div className="involvement-options">
                    <div className="involvement-card reveal" style={{ '--reveal-delay': '180ms' } as React.CSSProperties}>
                        <h4 className="involvement-title">Become a Partner</h4>
                        <p className="involvement-description">
                            Showcase your brand at our events and support the next generation of circuit designers.
                        </p>
                    </div>

                    <div className="involvement-card reveal" style={{ '--reveal-delay': '220ms' } as React.CSSProperties}>
                        <h4 className="involvement-title">Become a Speaker</h4>
                        <p className="involvement-description">
                            Share your expertise at a Summit talk, workshop, or MindSpark session.
                        </p>
                    </div>

                    <div className="involvement-card reveal" style={{ '--reveal-delay': '260ms' } as React.CSSProperties}>
                        <h4 className="involvement-title">Become a Volunteer</h4>
                        <p className="involvement-description">
                            Help organize activities, mentor peers, or contribute content to our Resource Hub.
                        </p>
                    </div>
                </div>

                <div className="contact-info reveal" style={{ '--reveal-delay': '300ms' } as React.CSSProperties}>
                    <div className="contact-line">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="contact-icon"
                            aria-hidden="true"
                        >
                            <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.54-.75a.75.75 0 0 0-.54 1.28l7.5 6.75a.75.75 0 0 0 1.0 0l7.5-6.75a.75.75 0 0 0-.54-1.28H4.04Z" />
                        </svg>
                        <a href="mailto:iabdul-aal@ieee.org" className="contact-email">iabdul-aal@ieee.org</a>
                    </div>
                    <div className="contact-line">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="contact-icon"
                            aria-hidden="true"
                        >
                            <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.026c.99 0 1.86.65 2.14 1.596l.662 2.206a2.25 2.25 0 0 1-.516 2.197l-1.212 1.212a14.978 14.978 0 0 0 6.24 6.24l1.212-1.212a2.25 2.25 0 0 1 2.197-.516l2.206.662A2.25 2.25 0 0 1 19.5 19.474V21.5c0 1.243-1.007 2.25-2.25 2.25h-.5C8.706 23.75 2.25 17.294 2.25 9v-.5Z" />
                        </svg>
                        <a href="tel:+201204609271" className="contact-phone">+20 120 460 9271</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;