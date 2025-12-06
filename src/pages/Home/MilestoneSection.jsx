import { motion } from 'framer-motion';
import TypingText from '../../Shared/TypingText';

import img0648 from '../../assets/images/long_/img_0648.jpg';
import img1457 from '../../assets/images/long_/img_1457.jpg';
import lfs05457 from '../../assets/images/long_/lfs05457.jpg';
import whatsappImage from '../../assets/images/long_/whatsapp_image.jpeg';
import frame27 from '../../assets/images/long_/frame_27.png';

const MilestoneSection = () => {
    const milestones = [
        {
            year: '২০২৩',
            title: 'যাত্রা শুরু',
            description: 'প্রিয় ঢাকা-১২ এর মানুষের সাথে চলার পথে আমাদের পথচলা শুরু। প্রতিটি মানুষের ভালোবাসা আমাদের শক্তি।',
            image: img0648,
            align: 'right'
        },
        {
            year: '২০২৪',
            title: 'স্বপ্নজয় সংগঠন',
            description: 'বিভিন্ন এলাকায় স্থানীয় নেতা ও সংগঠক নিয়োগ দেওয়া হয়েছে। তাদের মাধ্যমে প্রতিটি মানুষের সেবা করা হচ্ছে।',
            image: img1457,
            align: 'left'
        },
        {
            year: '২০২৪',
            title: 'উন্নয়ন প্রকল্প',
            description: 'শিক্ষা, স্বাস্থ্য ও অবকাঠামো উন্নয়নে ব্যাপক পদক্ষেপ নেওয়া হয়েছে। সাধারণ মানুষের জীবনমান উন্নয়নে আমরা বদ্ধপরিকর।',
            image: lfs05457,
            align: 'right'
        },
        {
            year: 'চলমান',
            title: 'ভবিষ্যৎ পরিকল্পনা',
            description: 'আরও অনেক কিছু করার আছে। ঢাকা-১২ কে একটি আদর্শ ও আধুনিক নগরী হিসেবে গড়ে তোলাই আমাদের লক্ষ্য।',
            image: whatsappImage,
            align: 'left'
        }
    ];

    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-[#FEFFF6]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url(${frame27})`,
                }}
            ></div>

            <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-[#00A651] font-bold text-4xl mb-4 block">অগ্রগতি</span>
                    <TypingText
                        tag="h2"
                        text="আমাদের যাত্রা এবং মাইলফলক"
                        className="text-6xl md:text-8xl lg:text-9xl font-header font-bold text-black mb-6"
                    />
                    <p className="text-3xl md:text-4xl lg:text-5xl text-black/70 font-body max-w-5xl mx-auto leading-relaxed">
                        প্রতিটি পদক্ষেপ মানুষের হৃদয়ের দিকে এগিয়ে নিয়ে যায় আমাদের। <br />
                        বিশ্বাস করি ধৈর্য ও নিষ্ঠার মাধ্যমে সবকিছু সম্ভব।
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px border-l-2 border-dashed border-black/30 hidden lg:block"></div>

                    <div className="space-y-12 lg:space-y-24">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                                className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 ${item.align === 'left' ? 'lg:flex-row-reverse' : ''}`}
                            >

                                {/* Empty Space for Alignment */}
                                <div className="hidden lg:block w-1/2"></div>

                                {/* Center Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full hidden lg:block"></div>

                                {/* Card */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="bg-[#F4A261] p-8 md:p-10 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300">

                                        {/* Header Content */}
                                        <div className="mb-8">
                                            <span className="text-4xl font-bold text-black mb-2 block">{item.year}</span>
                                            <h3 className="text-5xl md:text-7xl font-header font-bold text-black mb-4">
                                                {item.title}
                                            </h3>
                                            <p className="text-2xl md:text-3xl text-black/80 font-body leading-relaxed mb-6">
                                                {item.description}
                                            </p>
                                            <button className="px-6 py-2 border border-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition-colors">
                                                আরও জানুন ›
                                            </button>
                                        </div>

                                        {/* Image */}
                                        <div className="relative overflow-hidden rounded-3xl h-64 md:h-80 w-full">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MilestoneSection;