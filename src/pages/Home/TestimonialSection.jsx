import React, { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';
import TypingText from '../../Shared/TypingText';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import frame21 from '../../assets/images/commnet/frame_21.png';
import frame24 from '../../assets/images/supporter_img/frame_24.png';

const TestimonialSection = () => {
    const axiosPublic = useAxiosPublic();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get('/feedbacks/approved')
            .then(res => {
                setTestimonials(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [axiosPublic]);

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axiosPublic.get('/videos')
            .then(res => {
                setVideos(res.data);
            })
            .catch(error => console.error(error));
    }, [axiosPublic]);

    return (
        <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden bg-[#FF9F66]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url(${frame21})`,
                }}
            ></div>

            <div className="w-full relative z-10">

                {/* Header */}
                <div className="mb-12 sm:mb-16 px-4 sm:px-6 lg:px-12">
                    <TypingText
                        tag="h2"
                        text="মানুষ কী বলছে"
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-header font-bold text-[#006838] mb-4 sm:mb-6"
                    />
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black font-body max-w-4xl leading-relaxed">

                    </p>
                </div>

                {/* Testimonials Marquee */}
                <div className="relative w-full overflow-hidden border-t border-black/10 pt-8 sm:pt-12">
                    {/* Gradient Masks for smooth fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#FF9F66] to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#FF9F66] to-transparent z-20 pointer-events-none"></div>

                    {loading ? (
                        <div className="text-center py-10 text-lg sm:text-xl text-black/60">
                            Loading testimonials...
                        </div>
                    ) : testimonials.length > 0 ? (
                        <div className="flex cursor-grab active:cursor-grabbing">
                            <motion.div
                                className="flex gap-4 sm:gap-6 lg:gap-8 px-4"
                                drag="x"
                                dragConstraints={{ left: -2000, right: 0 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 40
                                }}
                                whileTap={{ cursor: "grabbing" }}
                            >
                                {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] bg-white/10 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-black/5 hover:bg-white/20 transition-colors duration-300 flex flex-col pointer-events-auto"
                                    >
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4 sm:mb-6">
                                            {[...Array(parseInt(item.rating || 5))].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-[#FFFF00] text-[#FFFF00]" />
                                            ))}
                                        </div>

                                        {/* Quote - with line clamp to prevent overflow */}
                                        <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-header font-bold text-black mb-6 sm:mb-8 leading-tight line-clamp-4 flex-grow">
                                            "{item.message}"
                                        </blockquote>

                                        {/* User Info */}
                                        <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 flex-shrink-0">
                                                <User size={20} className="sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-base sm:text-lg font-bold text-black truncate">{item.name}</h4>
                                                <p className="text-sm sm:text-base text-black/80 truncate">{item.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-lg sm:text-xl text-black/60">
                            এখনও কোনো রিভিউ নেই। (No reviews yet)
                        </div>
                    )}
                </div>

                {/* Featured Voice / Video Embed Section */}
                <div className="mt-12 sm:mt-16 lg:mt-20 relative w-full overflow-hidden rounded-3xl sm:rounded-[3rem] bg-cover bg-center" style={{ backgroundImage: `url(${frame24})` }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 py-12 sm:py-16 lg:py-20">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl justify-center px-4">
                            <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-[#FF4D50] rounded-full flex items-center justify-center text-white text-xs sm:text-sm">
                                <svg width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                            </span>
                            Featured Voice
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-header font-bold mb-8 sm:mb-12 text-center text-white px-4">জনগণের কথা</h2>

                        <div className="flex overflow-hidden py-6 sm:py-10 cursor-grab active:cursor-grabbing">
                            <motion.div
                                className="flex gap-4 sm:gap-6 lg:gap-8 px-4"
                                drag="x"
                                dragConstraints={{ left: -2000, right: 0 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                whileTap={{ cursor: "grabbing" }}
                            >
                                {[...videos, ...videos, ...videos, ...videos].map((video, index) => (
                                    <div key={index} className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[500px] xl:w-[600px] bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl border border-gray-100 flex-shrink-0 flex flex-col pointer-events-auto">
                                        <div className="aspect-video w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-3 sm:mb-4 md:mb-5 lg:mb-8 bg-black flex-shrink-0">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={video.videoUrl}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 flex-grow">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 text-black truncate">{video.name}</h3>
                                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mb-2 sm:mb-3 md:mb-4 truncate">{video.location}</p>
                                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed line-clamp-3">
                                                    "{video.quote}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TestimonialSection;