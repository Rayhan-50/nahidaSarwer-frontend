import React from 'react';
import { LayoutTemplate, Building2, Lightbulb, HeartHandshake } from 'lucide-react';
import TypingText from '../../Shared/TypingText';

import frame19 from '../../assets/images/section_2/frame_19.png';

const VisionSection = () => {
    const cards = [
        {
            icon: LayoutTemplate,
            title: 'সবার জন্য মৌলিক অধিকার',
            description: 'এমন রাষ্ট্র গড়তে চাই যেখানে উন্নয়নের মাপকাঠি জিডিপি বা গড় আয় নয়, সব থেকে অসহায় মানুষটার জীবনমান দ্বারা নির্ধারিত হবে। সব থেকে অসহায় মানুষটার মানসম্মত পুষ্টি, পড়বার বস্ত্র, কাজশেষে ফিরবার শান্তির ঘর, মর্যাদা সম্পন্ন শিক্ষা, সহজ চিকিৎসা ব্যবস্থা নিশ্চিত না হওয়া পর্যন্ত আমি কাজ করে যাবো।'
        },
        {
            icon: Building2,
            title: 'স্থানীয় সরকারকে দায়িত্বশীল করা',
            description: 'ভাঙা রাস্তা ঠিক করা, পর্যাপ্ত ডাস্টবিন বা পাবলিক টয়লেট স্থাপন করা স্থানীয় সরকারের কাজ। ঢাকা ১২ এর স্থানীয় সরকার যেন তার দায়িত্ব ঠিকভাবে পালন করে ও করতে পারে তার জন্য আমি সংসদ সদস্য হিসাবে কাজ করবো।'
        },
        {
            icon: Lightbulb,
            title: 'নগর পরিকল্পনা',
            description: 'আমরা শব্দ দূষণে জর্জরিত, ধুলা-বালুতে, জলাবদ্ধতায় অতিষ্ঠ। এসব ঠিক করার জন্য প্রয়োজন বিশেষজ্ঞদের তৈরি নগর পরিকল্পনা, পরিকল্পিত আইন ও আইনের প্রণয়ন।'
        },
        {
            icon: HeartHandshake,
            title: 'মাদক ও চাঁদাবাজি নির্মূল',
            description: 'মাদক ও চাঁদাবাজি নির্মূলের জন্য সব থেকে জরুরী পুলিশ, বিজিবি ও প্রশাসনের দুর্নীতি বন্ধ করা, ইনফর্মাল ইকোনমিকে ফরমাল ইকোনমিতে নিয়ে আসা। আমি সংসদ সদস্য নির্বাচিত হলে তার জন্য সর্বোচ্চ চেষ্টা করবো, না হলেও এই সব দাবিতে সরব থাকবো।'
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
                            আত্মমর্যাদা সম্পন্ন, সুস্থ, নিরাপদ ও আধুনিক জীবনই আমাদের লক্ষ্য
                        </p>

                        {/* Button removed as per user request */}
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