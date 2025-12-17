
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import TypingText from '../../Shared/TypingText';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import frame20 from '../../assets/images/3rd/frame_20.png';

const Counter = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, value, { duration: 3, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = motionValue.on("change", (latest) => {
            if (ref.current) {
                // Convert to English integer first
                const englishNumber = Math.floor(latest);
                // Convert to Bengali digits
                const formattedEnglish = englishNumber.toLocaleString('en-US');
                const finalBengali = formattedEnglish.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

                ref.current.textContent = finalBengali + suffix;
            }
        });
        return () => unsubscribe();
    }, [motionValue, suffix]);

    return <span ref={ref} />;
};

const CommunitySection = () => {
    const [statsData, setStatsData] = React.useState({
        activeSupporters: 16000,
        organizedCommunity: 85,
        raisedFunds: 50
    });

    // Create an axios instance for public data
    const axiosPublic = useAxiosPublic(); // Assuming you have imported this hook

    useEffect(() => {
        axiosPublic.get('/stats')
            .then(res => {
                setStatsData(res.data);
            })
            .catch(err => console.error("Stats fetch error:", err));
    }, [axiosPublic]);

    // Helper to format funds to "Lakh" if large enough, else show raw
    const formatFunds = (amount) => {
        if (amount >= 100000) {
            return {
                value: Math.floor(amount / 100000),
                suffix: ' লক্ষ'
            };
        }
        return {
            value: amount,
            suffix: ' টাকা'
        };
    };

    const funds = formatFunds(statsData.raisedFunds);

    const stats = [
        {
            title: 'সক্রিয় সমর্থক',
            value: statsData.activeSupporters || 0,
            suffix: '+',
            description: 'মানুষ নিভার সাথে কাজ করছেন'
        },
        {
            title: 'সংগঠিত কমিউনিটি',
            value: statsData.organizedCommunity || 0,
            suffix: '+',
            description: 'এলাকায় স্থানীয় সংগঠন গঠিত'
        },
        {
            title: 'সংগৃহীত তহবিল',
            value: funds.value,
            suffix: funds.suffix,
            description: 'টাকা উন্নয়ন কাজে ব্যয় করা হয়েছে'
        }
    ];

    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-black">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url(${frame20})`,
                }}
            ></div>

            <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header Content */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                    <TypingText
                        tag="h2"
                        text="সমর্থন এবং সম্প্রদায়ের শক্তি"
                        className="text-4xl md:text-5xl lg:text-7xl font-header font-bold text-[#00A651] leading-tight max-w-2xl"
                    />

                    <p className="text-xl md:text-2xl lg:text-3xl text-white font-body leading-relaxed max-w-3xl text-right lg:text-right">
                        গত এক বছর নিজ কাজ করছেন জুলাই শহীদ পরিবারের, আহতের নিয়ে। জুলাই গণঅভ্যুত্থানে তাদের মতামত, জনতার দুয়ার দুয়ার। শুনছেন সবার কথা, দিচ্ছেন ছোঁয়া ও সমর্থন।
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden group bg-black/50 border border-white/30 p-10 md:p-12 flex flex-col justify-between aspect-square md:aspect-auto md:h-[400px] hover:border-[#00A651] transition-colors duration-300"
                        >
                            {/* Water Filling Effect */}
                            <div className="absolute inset-0 bg-[#00A651] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0"></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <h3 className="text-xl md:text-2xl font-header font-bold text-white mb-4 group-hover:text-white transition-colors duration-500">
                                    {stat.title}
                                </h3>

                                <div className="flex-grow flex items-center justify-center">
                                    <span className="text-4xl md:text-5xl lg:text-6xl font-header font-bold text-white group-hover:text-white transition-colors duration-500">
                                        <Counter value={stat.value} suffix={stat.suffix} />
                                    </span>
                                </div>

                                <div className="border-t border-white/30 pt-6 mt-4 group-hover:border-white/50 transition-colors duration-500">
                                    <p className="text-base md:text-lg text-white/80 font-body text-center group-hover:text-white transition-colors duration-500">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CommunitySection;