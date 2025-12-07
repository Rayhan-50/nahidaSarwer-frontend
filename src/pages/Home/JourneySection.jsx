import React, { useState, useEffect, useRef } from 'react';
import TypingText from '../../Shared/TypingText';

import img1202 from '../../assets/images/3rd/img_1202.jpg';
import frame20 from '../../assets/images/3rd/frame_20.png';

const JourneySection = ({ scrollContainerRef }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);

    const slides = [
        {
            id: '০১',
            verticalText: 'শিক্ষার ভিত্তি',
            title: 'জ্ঞানের সাথে এগিয়ে যাওয়া',
            description: 'নিভা উচ্চশিক্ষায় অর্জন করেছেন এবং সমাজের প্রতি দায়বদ্ধতা শিখেছেন প্রতিটি প্রতিষ্ঠানে।',
            image: img1202
        },
        {
            id: '০২',
            verticalText: 'সামাজিক প্রতিবাদ',
            title: 'অন্যায়ের বিরুদ্ধে প্রতিবাদ',
            description: 'সমাজের নানা অসঙ্গতি ও অন্যায়ের বিরুদ্ধে তিনি সর্বদা সোচ্চার থেকেছেন এবং সাধারণ মানুষের অধিকার আদায়ে কাজ করেছেন।',
            image: img1202
        },
        {
            id: '০৩',
            verticalText: 'জুলাই মাইলফলক',
            title: 'জুলাই বিপ্লবের চেতনা',
            description: 'জুলাই বিপ্লবে তার সক্রিয় অংশগ্রহণ এবং নেতৃত্ব তাকে নতুন উচ্চতায় নিয়ে গেছে। তিনি ছিলেন আন্দোলনের সম্মুখভাগে।',
            image: img1202
        },
        {
            id: '০৪',
            verticalText: 'রাজনৈতিক সেবা',
            title: 'জনগণের সেবায় রাজনীতি',
            description: 'রাজনীতিকে তিনি মানুষের সেবা করার একটি মহৎ মাধ্যম হিসেবে বেছে নিয়েছেন এবং নিরলসভাবে কাজ করে যাচ্ছেন।',
            image: img1202
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const { top, height } = sectionRef.current.getBoundingClientRect();
            const scrollDistance = -top;
            const scrollableHeight = height - window.innerHeight;

            if (scrollDistance < 0) {
                setActiveIndex(0);
                return;
            }

            if (scrollDistance > scrollableHeight) {
                setActiveIndex(slides.length - 1);
                return;
            }

            const progress = scrollDistance / scrollableHeight;
            const index = Math.floor(progress * slides.length);
            const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
            setActiveIndex(safeIndex);
        };

        const container = scrollContainerRef?.current || window;
        // Only attach scroll listener on desktop/large screens if needed, 
        // or keep it but allow click interaction to override on mobile.
        // For this mobile refactor, we usually want tap-to-expand on mobile, 
        // so we might want to disable scroll-based switching on mobile or allow both.
        // Given the requirement is "interaction effect", tap is better for mobile.

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [slides.length, scrollContainerRef]);

    // Handle click for mobile manual selection
    const handleSlideClick = (index) => {
        // Optional: specific logic for mobile if needed
        setActiveIndex(index);
    };

    return (
        <section ref={sectionRef} className="relative h-[250vh] md:h-[300vh] bg-[#111]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
                    style={{ backgroundImage: `url(${frame20})` }}
                ></div>

                <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10 h-[90vh] md:h-[85vh] flex flex-col">
                    <div className="mb-6 md:mb-12 flex-shrink-0">
                        <span className="text-[#00A651] font-bold text-sm sm:text-base md:text-xl lg:text-2xl bg-white/10 px-3 py-1 sm:px-4 sm:py-1 md:px-6 md:py-2 rounded inline-block mb-3 sm:mb-4 md:mb-6">যাত্রা</span>
                        <TypingText
                            tag="h2"
                            text="নিভার পথচলা এবং প্রতিশ্রুতি"
                            className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-header font-bold mb-3 sm:mb-4 md:mb-6 leading-none"
                        />
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-body max-w-4xl">শিক্ষা থেকে শুরু করে সামাজিক কাজ এবং এখন রাজনৈতিক সেবায় নিয়োজিত</p>
                    </div>

                    <div className="flex-1 flex items-center w-full min-h-0">
                        <div className="flex flex-col md:flex-row w-full h-full md:h-[65vh] gap-3 md:gap-4">
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    onClick={() => handleSlideClick(index)}
                                    className={`relative transition-all duration-700 ease-in-out overflow-hidden rounded-2xl md:rounded-[2rem] 
                                    ${activeIndex === index
                                            ? 'flex-[5] md:flex-[6] bg-[#F4A261]'
                                            : 'flex-[1] md:flex-[0.5] bg-white cursor-pointer hover:bg-gray-100'}`}
                                >
                                    <div className={`absolute inset-0 p-4 md:p-6 lg:p-10 flex flex-col md:flex-row gap-4 md:gap-8 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                                        <div className="flex-1 flex flex-col justify-start md:justify-between h-full overflow-hidden">
                                            <div>
                                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-black mb-1 sm:mb-2 md:mb-4 block">{slide.id}</span>
                                                <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-header font-bold text-black leading-tight mb-2 sm:mb-3 md:mb-6">{slide.title}</h3>
                                                <p className="text-black/90 text-sm sm:text-base md:text-lg lg:text-xl font-body leading-relaxed mb-3 sm:mb-4 md:mb-0 line-clamp-3 md:line-clamp-none">{slide.description}</p>
                                            </div>

                                            <div className="block md:hidden w-full h-auto mt-2 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="flex-1 h-full relative rounded-3xl overflow-hidden hidden md:block">
                                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                                <h4 className="font-bold text-3xl text-white">নাহিদা সারোয়ার নিভা</h4>
                                                <p className="text-xl text-white/80">ঢাকা-১২</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 flex flex-col md:flex-col items-center justify-center md:items-center md:justify-center p-3 md:p-0 transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                                        {/* Mobile: Horizontal Row content when collapsed */}
                                        <div className="md:hidden flex flex-row items-center justify-between w-full h-full px-2">
                                            <span className="text-xl font-bold text-black">{slide.id}</span>
                                            <span className="text-lg font-bold text-black font-header ml-4 truncate">{slide.verticalText}</span>
                                        </div>

                                        {/* Desktop: Vertical interactions */}
                                        <span className="hidden md:block text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-black mb-2 sm:mb-4 md:mb-12">{slide.id}</span>
                                        <span className="hidden md:block text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-black [writing-mode:vertical-rl] rotate-180 tracking-widest whitespace-nowrap font-header">{slide.verticalText}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneySection;