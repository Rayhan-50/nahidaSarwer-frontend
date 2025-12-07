import React from 'react';
import TypingText from '../../Shared/TypingText';

import image3 from '../../assets/images/vento_/image3.JPEG';
import lfs05061 from '../../assets/images/vento_/LFS05061.JPG';
import lfs05191 from '../../assets/images/vento_/LFS05191.JPG';
import img0648 from '../../assets/images/vento_/IMG_0648.jpg';
import frame23 from '../../assets/images/vento_/frame_23.png';

const WorkGallerySection = () => {
    const images = [
        image3,
        lfs05061,
        lfs05191,
        img0648
    ];

    return (
        <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden bg-black">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `url(${frame23})`,
                }}
            ></div>

            <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <TypingText
                        tag="h2"
                        text="আমাদের কাজের ছবি"
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-header font-bold text-[#00A651] mb-4 sm:mb-6 md:mb-8 leading-none"
                    />
                    <p className="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white font-body max-w-6xl mx-auto leading-relaxed">
                        ঢাকা-১২ এর রূপান্তরের প্রতিটি মুহূর্ত এখানে ধরা আছে।
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]">
                            <img
                                src={images[0]}
                                alt="Work Image 1"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                            <img
                                src={images[1]}
                                alt="Work Image 2"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 md:mt-24">
                        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                            <img
                                src={images[2]}
                                alt="Work Image 3"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]">
                            <img
                                src={images[3]}
                                alt="Work Image 4"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WorkGallerySection;