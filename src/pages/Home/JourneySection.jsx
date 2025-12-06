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
            title: 'জ্ঞানের সাথে এগিয়ে যাওয়া',
            description: 'নিভা উচ্চশিক্ষায় অর্জন করেছেন এবং সমাজের প্রতি দায়বদ্ধতা শিখেছেন প্রতিটি প্রতিষ্ঠানে।',
            image: img1202
        },
        {
            id: '০২',
            verticalText: 'সামাজিক প্রতিবাদ',
            title: 'অন্যায়ের বিরুদ্ধে প্রতিবাদ',
            description: 'সমাজের নানা অসঙ্গতি ও অন্যায়ের বিরুদ্ধে তিনি সর্বদা সোচ্চার থেকেছেন এবং সাধারণ মানুষের অধিকার আদায়ে কাজ করেছেন।',
            image: img1202
        },
        {
            id: '০৩',
            verticalText: 'জুলাই মাইলফলক',
            title: 'জুলাই বিপ্লবের চেতনা',
            description: 'জুলাই বিপ্লবে তার সক্রিয় অংশগ্রহণ এবং নেতৃত্ব তাকে নতুন উচ্চতায় নিয়ে গেছে। তিনি ছিলেন আন্দোলনের সম্মুখভাগে।',
            image: img1202
        },
        {
            id: '০৪',
            verticalText: 'রাজনৈতিক সেবা',
            title: 'জনগণের সেবায় রাজনীতি',
            description: 'রাজনীতিকে তিনি মানুষের সেবা করার একটি মহৎ মাধ্যম হিসেবে বেছে নিয়েছেন এবং নিরলসভাবে কাজ করে যাচ্ছেন।',
            image: img1202
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const { top, height } = sectionRef.current.getBoundingClientRect();
            // We want the animation to start when the section hits the top of the viewport
            // and end when the section scrolls out.

            // Calculate how far we've scrolled into the section
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

            // Map scroll progress to slide index
            const progress = scrollDistance / scrollableHeight;
            const index = Math.floor(progress * slides.length);

            // Clamp index
            const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
            setActiveIndex(safeIndex);
        };

        const container = scrollContainerRef?.current || window;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [slides.length, scrollContainerRef]);

    return (
        <section ref={sectionRef} className="relative h-[250vh] md:h-[300vh] bg-[#111]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
                    style={{ backgroundImage: `url(${frame20})` }}
                ></div>

                <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10 h-[90vh] md:h-[85vh] flex flex-col">
                    {/* Header Content */}
                    <div className="mb-6 md:mb-12 flex-shrink-0">
                        <span className="text-[#00A651] font-bold text-xl md:text-2xl bg-white/10 px-4 py-1 md:px-6 md:py-2 rounded inline-block mb-4 md:mb-6">যাত্রা</span>
                        <TypingText
                            tag="h2"
                            text="নিভার পথচলা এবং প্রতিশ্রুতি"
                            className="text-white text-4xl md:text-8xl lg:text-9xl font-header font-bold mb-4 md:mb-6 leading-none"
                        />
                        <p className="text-gray-400 text-lg md:text-3xl font-body max-w-4xl">শিক্ষা থেকে শুরু করে সামাজিক কাজ এবং এখন রাজনৈতিক সেবায় নিয়োজিত</p>
                    </div>

                    {/* Accordion */}
                    <div className="flex-1 flex items-center w-full min-h-0">
                        <div className="flex w-full h-full md:h-[65vh] gap-2 md:gap-4">
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`relative transition-all duration-700 ease-in-out overflow-hidden rounded-2xl md:rounded-[2rem] ${activeIndex === index ? 'flex-[10] md:flex-[4] bg-[#F4A261]' : 'flex-[1] md:flex-[0.25] bg-white cursor-pointer hover:bg-gray-100'
                                        }`}
                                >
                                    {/* Active Content */}
                                    <div className={`absolute inset-0 p-4 md:p-10 flex flex-col md:flex-row gap-4 md:gap-8 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                                        <div className="flex-1 flex flex-col justify-between h-full overflow-y-auto md:overflow-visible no-scrollbar">
                                            <div>
                                                <span className="text-3xl md:text-6xl font-bold text-black mb-2 md:mb-6 block">{slide.id}</span>
                                                <h3 className="text-2xl md:text-7xl lg:text-8xl font-header font-bold text-black leading-tight mb-4 md:mb-8">{slide.title}</h3>
                                                <p className="text-black/90 text-lg md:text-3xl lg:text-4xl font-body leading-relaxed mb-4 md:mb-0">{slide.description}</p>
                                            </div>

                                            {/* Mobile Image (Visible only on mobile) */}
                                            <div className="block md:hidden w-full aspect-video rounded-xl overflow-hidden mt-4 flex-shrink-0">
                                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        {/* Desktop Image Container */}
                                        <div className="flex-1 h-full relative rounded-3xl overflow-hidden hidden md:block">
                                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                                                <h4 className="font-bold text-3xl text-white">নাহিদা সারোয়ার নিভা</h4>
                                                <p className="text-xl text-white/80">ঢাকা-১২</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inactive Content (Vertical Text) */}
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                                        <span className="text-xl md:text-3xl font-bold text-black mb-4 md:mb-12">{slide.id}</span>
                                        <span className="text-lg md:text-2xl font-bold text-black [writing-mode:vertical-rl] rotate-180 tracking-widest whitespace-nowrap font-header">{slide.verticalText}</span>
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