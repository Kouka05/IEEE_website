import './JoinUs.css'
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/signup');
    }

    return (
        <section className="bg-gray-100 py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <a href="#" className="inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 group">
                            Your Journey in Solid-State Starts Here
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                        <p className="mt-6 text-base sm:text-lg text-gray-600">
                            Connect with like-minded engineers, access exclusive events, and grow your skills in the world of solid-state circuits.
                        </p>
                        <div className="mt-8">
                            <button
                                className="px-8 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors duration-300"
                                onClick={handleClick}
                            >
                                Join Us
                            </button>
                        </div>
                    </div>
                    {/* Image Placeholder */}
                    <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                         <img className="aspect-square max-w-lg mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
