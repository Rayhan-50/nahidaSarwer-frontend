import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import TypingText from '../../Shared/TypingText';

import frame19 from '../../assets/images/section_2/frame_19.png';

import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const NewsSection = () => {
    const axiosPublic = useAxiosPublic();

    const { data: newsItems = [] } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await axiosPublic.get('/news');
            return res.data;
        }
    });

    // Fetch stats for dynamic news link
    const { data: stats = {} } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    });

    const newsLink = stats.newsLink || "https://www.prothomalo.com/world";

    const displayItems = newsItems.slice(0, 3);

    return (
        <section className="relative w-full py-12 sm:py-14 md:py-16 lg:py-24 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: `url(${frame19})`,
                }}
            >
            </div>

            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
                    <div>
                        <span className="text-[#00A651] font-header text-xl sm:text-2xl md:text-3xl font-bold mb-2 block">
                            খবর
                        </span>
                        <TypingText
                            tag="h2"
                            text="সাম্প্রতিক আপডেট"
                            className="text-3xl sm:text-4xl md:text-6xl font-header font-bold text-black mb-4 leading-none"
                        />
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-body max-w-2xl">
                            দেখে নিন আজকের গুরুত্বপূর্ণ সংবাদ সমূহ
                        </p>
                    </div>

                    <a href={newsLink} target="_blank" rel="noopener noreferrer" className="hidden md:block px-8 py-3 border-2 border-[#FF4D50] text-[#FF4D50] rounded-full font-header text-lg font-bold hover:bg-[#FF4D50] hover:text-white transition-colors duration-300">
                        সব দেখুন
                    </a>
                </div>

                {/* News List */}
                <div className="space-y-6">
                    {displayItems.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 hover:shadow-xl hover:border-[#00A651]/30 transition-all duration-300 flex flex-col md:flex-row gap-4 md:items-center justify-between"
                        >
                            <div className="flex-1">
                                <span className="inline-block bg-[#E8F5E9] text-[#00A651] px-3 py-1 rounded-full text-sm font-bold mb-3">
                                    {item.date}
                                </span>
                                <h3 className="text-xl md:text-3xl font-header font-bold text-[#FF4D50] mb-2 group-hover:text-black transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-base md:text-lg text-gray-600 font-body line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-4 md:mt-0">
                                <a href={item.newsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black text-lg font-bold hover:text-[#FF4D50] transition-colors group-hover:translate-x-2 duration-300">
                                    আরও পড়ুন <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View More Button */}
                <div className="mt-8 text-center md:hidden">
                    <a href={newsLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border-2 border-[#FF4D50] text-[#FF4D50] rounded-full font-header text-base font-bold hover:bg-[#FF4D50] hover:text-white transition-colors duration-300">
                        সব দেখুন
                    </a>
                </div>

            </div>
        </section>
    );
};

export default NewsSection;