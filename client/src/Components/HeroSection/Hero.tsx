

const Hero = () => {
    return (
        <section className="bg-gray-100 py-20 sm:py-24 lg:py-32">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                    IEEE SSCS Alexandria
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mt-2">
                    Powering the Future of Electronics
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
                    Empowering students, researchers, and professionals through innovation, collaboration, and cutting-edge education in solid-state circuits.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-800 font-semibold hover:bg-gray-50 transition-colors duration-300">
                        Learn More
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors duration-300">
                        Join SSCS
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;