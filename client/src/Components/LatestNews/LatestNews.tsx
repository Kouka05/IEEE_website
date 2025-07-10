import React, { useState } from "react";
import "./LatestNews.css"; // Make sure to import the CSS file

const LatestNews: React.FC = () => {
    const newsItems = [
        { title: "Local Chapter. Global Impact." },
        { title: "Bridging Theory and Innovation in Solid-State Circuits" },
        { title: "Innovating at the Atomic Level" },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
    };

    return (
        <section className="news-section">
            <div className="news-container">
                <div className="news-header">
                    <h2 className="news-title">📡 Latest from SSCS Alexandria</h2>
                </div>

                {/* Grid for Desktop */}
                <div className="news-grid">
                    {newsItems.map((item, index) => (
                        <div key={index} className="news-card">
                            <div className="news-card-image">
                                <svg
                                    className="placeholder-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div className="news-card-content">
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider for Mobile/Tablet */}
                <div className="news-slider">
                    {newsItems.map((item, index) => (
                        <div
                            key={index}
                            className={`slider-item ${
                                index === currentIndex ? "active" : ""
                            }`}
                        >
                            <div className="news-card">
                                <div className="news-card-image">
                                    <svg
                                        className="placeholder-svg"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="news-card-content">
                                    <h3>{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Slider Controls */}
                    <button
                        onClick={prevSlide}
                        className="slider-control prev"
                        aria-label="Previous slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="slider-control next"
                        aria-label="Next slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;