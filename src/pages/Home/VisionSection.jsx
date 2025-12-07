import React from 'react';
import { LayoutTemplate, Building2, Lightbulb, HeartHandshake } from 'lucide-react';
import TypingText from '../../Shared/TypingText';

import frame19 from '../../assets/images/section_2/frame_19.png';

const VisionSection = () => {
    const cards = [
        {
            icon: LayoutTemplate,
            title: 'শিক্ষা ও স্বাস্থ্যসেবা',
            description: 'প্রতিটি পরিবারের জন্য মানসম্মত শিক্ষা ও চিকিৎসা নিশ্চিত করা।'
        },
        {
            icon: Building2,
            title: 'অর্থনৈতিক উন্নয়ন',
            description: 'স্থানীয় ব্যবসা ও কর্মসংস্থান সৃষ্টিতে আমরা প্রতিশ্রুতিবদ্ধ।'
        },
        {
            icon: Lightbulb,
            title: 'অবকাঠামো উন্নয়ন',
            description: 'রাস্তা, পানি ও বিদ্যুৎ ব্যবস্থা আরও ভালো করার জন্য কাজ করছি।'
        },
        {
            icon: HeartHandshake,
            title: 'আমাদের প্রতিশ্রুতি',
            description: 'ঢাকা-১২ কে রূপান্তরিত করার জন্য কাজ করছি। প্রতিটি পদক্ষেপ মানুষের জীবনযাত্রার মান উন্নয়নের দিকে পরিচালিত।'
        }
    ];

    return (
        <section className="relative w-full py-16 lg:py-32 overflow-hidden bg-[#FEFFF6]">
            {/* Background Grid */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url(${frame19})`,
                }}
            ></div>

            <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

                    {/* Left Column - Sticky Content */}
                    <div className="lg:sticky lg:top-32">
                        <span className="text-[#00A651] font-bold text-xl md:text-2xl text-3xl md:text-5xl mb-4 md:mb-6 block">লক্ষ্য</span>
                        <div className="text-3xl md:text-5xl lg:text-7xl font-header font-bold text-black leading-tight mb-6 md:mb-8">
                            <TypingText tag="h2" text="আমাদের দৃষ্টিভঙ্গি" />
                            <TypingText tag="h2" text="স্পষ্ট" />
                        </div>
                        <p className="text-lg md:text-xl lg:text-2xl text-black/80 font-body leading-relaxed mb-8 md:mb-12 max-w-2xl">
                            ঢাকা-১২ কে আধুনিক, সুশৃঙ্খল ও উন্নত নগরী হিসেবে গড়ে তোলা আমাদের প্রধান লক্ষ্য।
                        </p>

                        <button className="group flex items-center gap-4 px-8 py-3 md:px-10 md:py-4 bg-white border-2 border-black rounded-full font-header text-xl md:text-2xl font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            আরও
                            <span className="text-lg md:text-xl">জানুন ›</span>
                        </button>
                    </div>

                    {/* Right Column - Cards */}
                    <div className="space-y-6 md:space-y-8">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden group bg-white border-2 border-black p-6 md:p-10 rounded-2xl md:rounded-3xl hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Water Filling Effect */}
                                <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0"></div>

                                <div className="relative z-10">
                                    <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 text-black group-hover:text-white transition-colors duration-500">
                                        <card.icon size={40} className="md:w-12 md:h-12" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-header font-bold text-black group-hover:text-white transition-colors duration-500 mb-2 md:mb-4">
                                        {card.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-black/70 group-hover:text-white/90 transition-colors duration-500 font-body leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisionSection;