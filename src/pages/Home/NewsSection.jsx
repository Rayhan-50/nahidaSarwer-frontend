import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import TypingText from '../../Shared/TypingText';

import frame19 from '../../assets/images/section_2/frame_19.png';

const NewsSection = () => {
    const newsItems = [
        {
            id: 1,
            title: 'নতুন স্বাস্থ্য কেন্দ্র উদ্বোধন',
            description: 'ঢাকা-১২ এর তিনটি এলাকায় নতুন স্বাস্থ্য কেন্দ্র চালু হয়েছে।',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'স্বাস্থ্য',
            readTime: '২ মিনিট পড়া',
            date: '১২ ডিসেম্বর, ২০২৪'
        },
        {
            id: 2,
            title: 'শিক্ষার্থীদের জন্য বৃত্তি কর্মসূচি',
            description: 'মেধাবী কিন্তু দরিদ্র শিক্ষার্থীদের জন্য বৃত্তি প্রদান শুরু হয়েছে।',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'শিক্ষা',
            readTime: '৩ মিনিট পড়া',
            date: '১০ ডিসেম্বর, ২০২৪'
        },
        {
            id: 3,
            title: 'রাস্তা মেরামত প্রকল্প সম্পন্ন',
            description: 'পাঁচটি প্রধান রাস্তার মেরামত কাজ সফলভাবে শেষ হয়েছে।',
            image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'উন্নয়ন',
            readTime: '২ মিনিট পড়া',
            date: '০৮ ডিসেম্বর, ২০২৪'
        },
        {
            id: 4,
            title: 'যুব প্রশিক্ষণ কর্মশালা',
            description: 'বেকার যুবকদের জন্য কারিগরি প্রশিক্ষণ কর্মশালা আয়োজন।',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'কর্মসংস্থান',
            readTime: '৪ মিনিট পড়া',
            date: '০৫ ডিসেম্বর, ২০২৪'
        }
    ];

    return (
        <section className="relative w-full py-12 sm:py-14 md:py-16 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${frame19})`,
                }}
            >
            </div>

            <div className="w-full px-2 sm:px-4 md:px-6 lg:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-20 gap-4 sm:gap-6 md:gap-8">
                    <div>
                        <span className="text-[#00A651] font-header text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-1 sm:mb-2 md:mb-4 block">
                            খবর
                        </span>
                        <TypingText
                            tag="h2"
                            text="সাম্প্রতিক আপডেট"
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-header font-bold text-black mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-none"
                        />
                        <p className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-600 font-body max-w-4xl">
                            দেখে নিন আজকের গুরুত্বপূর্ণ সংবাদ সমূহ
                        </p>
                    </div>

                    <button className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 lg:px-12 lg:py-5 border-2 md:border-4 border-[#FF4D50] text-[#FF4D50] rounded-full font-header text-sm sm:text-base md:text-xl lg:text-3xl font-bold hover:bg-[#FF4D50] hover:text-white transition-colors duration-300">
                        সব দেখুন
                    </button>
                </div>

                {/* News Carousel (Auto Sliding) */}
                <div className="relative w-full overflow-hidden py-4 sm:py-6 md:py-10">
                    <motion.div
                        className="flex gap-3 sm:gap-4 md:gap-8 cursor-grab active:cursor-grabbing w-max"
                        drag="x"
                        dragConstraints={{ left: -10000, right: 0 }}
                        dragElastic={0.1}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {/* Duplicate items for infinite loop */}
                        {[...newsItems, ...newsItems, ...newsItems, ...newsItems].map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex-shrink-0 min-w-[85vw] sm:min-w-[75vw] md:min-w-[450px] lg:min-w-[550px] xl:min-w-[600px] bg-white rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden shadow-lg border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                                {/* Image */}
                                <div className="relative h-40 sm:h-48 md:h-64 lg:h-80 overflow-hidden">
                                    <img
                                        draggable="false"
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 select-none"
                                    />
                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-lg font-bold text-black">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 md:p-8 lg:p-10">
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm md:text-lg mb-3 sm:mb-4 md:mb-6">
                                        <Clock size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                        <span>{item.readTime}</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-header font-bold text-black mb-3 sm:mb-4 md:mb-6 leading-snug group-hover:text-[#00A651] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-2 font-body">
                                        {item.description}
                                    </p>

                                    <a href="#" className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 text-black text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:text-[#FF4D50] transition-colors">
                                        আরও পড়ুন <ArrowRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default NewsSection;