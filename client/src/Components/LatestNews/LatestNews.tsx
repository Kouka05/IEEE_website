import React, { useState } from "react";


// Temparary and will fetch images from API or NEWS.tsx
const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-gray-200 flex items-center justify-center ${className ?? ""}`}>
        <span className="text-gray-400">Image</span>
    </div>
);

const LatestNews: React.FC = () => {
    const newsItems = [
        {
            title: "Local Chapter. Global Impact.",
        },
        {
            title: "Bridging Theory and Innovation in Solid-State Circuits",
        },
        {
            title: "Innovating at the Atomic Level",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

// ...
    
    
    
    
    
    
    
    const nextSlide = () => {
        setCurrentIndex((prevIndex: number) => (prevIndex + 1) % newsItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex: number) => (prevIndex - 1 + newsItems.length) % newsItems.length);
    };


    return (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-6">
                <div className="flex items-center mb-12">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" className="text-gray-800 mr-4">
                        <path fill="currentColor" d="M228.44 106.69a16 16 0 0 0-15.55-6.1L161.6 109.4a80 80 0 0 0-67.2 0l-51.29-8.81a16 16 0 0 0-15.55 6.1a15.86 15.86 0 0 0 2 16.84l33.69 49.07a16 16 0 0 0 13.52 7.4h112.82a16 16 0 0 0 13.52-7.4l33.69-49.07a15.86 15.86 0 0 0 2-16.84ZM128 144a16 16 0 1 1 16-16a16 16 0 0 1-16 16Zm88-37.31l-33.69 49.07a.1.1 0 0 1-.09 0H73.78a.1.1 0 0 1-.09 0L40 106.69a.2.2 0 0 1 0-.09l51.29 8.81a96.11 96.11 0 0 1 81.42 0l51.29-8.81a.2.2 0 0 1 0 .09Z"></path>
                    </svg>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        Latest from SSCS Alexandria
                    </h2>
                </div>

                {/* Grid for Desktop */}
                <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <ImagePlaceholder className="h-48" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 h-16">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider for Mobile/Tablet */}
                <div className="relative h-[24rem] lg:hidden">
                    {newsItems.map((item, index) => (
                         <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                         >
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
                                <ImagePlaceholder className="h-48 flex-shrink-0" />
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Slider Controls */}
                    <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-10" aria-label="Previous slide">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-10" aria-label="Next slide">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;