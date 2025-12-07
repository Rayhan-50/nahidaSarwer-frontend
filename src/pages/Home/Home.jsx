import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import JourneySection from './JourneySection';
import VisionSection from './VisionSection';
import CommunitySection from './CommunitySection';
import MilestoneSection from './MilestoneSection';
import TestimonialSection from './TestimonialSection';
import WorkGallerySection from './WorkGallerySection';
import NewsSection from './NewsSection';
import ContactSection from './ContactSection';
import Footer from '../../Shared/Footer/Footer';
import TypingText from '../../Shared/TypingText';

import heroImage from '../../assets/images/hero.jpeg';
import frame19 from '../../assets/images/section_2/frame_19.png';
import nivaPoster from '../../assets/images/section_2/niva_poster.png';
import nivaPortrait1 from '../../assets/images/section_2/niva_portrait_1.png';
import image1 from '../../assets/images/section_2/image1.jpeg';

const Home = () => {
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const event = new CustomEvent('element-scroll', { detail: { scrollTop } });
    window.dispatchEvent(event);
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="w-full bg-[var(--color-bg-cream)] h-screen overflow-y-scroll font-body text-charcoal scroll-smooth"
    >
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          {/* Dark Overlay with Red/Maroon Tint */}
          <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-20">

          {/* Main Text */}
          <div className="space-y-2 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-header font-bold text-white drop-shadow-lg"
            >
              নাহিদা সারোয়ার নিভা,
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-header font-bold text-white drop-shadow-md"
            >
              ঢাকা- ১২
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto font-body mb-12 drop-shadow-md leading-relaxed"
          >
            নাহিদা সারোয়ার নিভা আপনার স্বপ্নের ঢাকা-১২ গড়তে প্রতিশ্রুতিবদ্ধ।
            <br />
            একটি আধুনিক, সুশৃঙ্খল ও উন্নত নগরী আমাদের লক্ষ্য।
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 md:gap-12 justify-center items-center mb-32"
          >
            <Link to="/donate">
              <button className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-[#FF4D50] text-white rounded-full font-header text-xl sm:text-2xl md:text-6xl lg:text-8xl font-bold border-2 border-[#FF4D50] overflow-hidden group shadow-2xl hover:shadow-[0_0_20px_rgba(255,77,80,0.6)] transition-all duration-300">
                <span className="relative z-10 group-hover:text-[#FF4D50] transition-colors duration-500">ডোনেট</span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
              </button>
            </Link>
            <button className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-transparent text-white rounded-full font-header text-xl sm:text-2xl md:text-6xl lg:text-8xl font-bold border-2 border-white overflow-hidden group shadow-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
              <span className="relative z-10 group-hover:text-[#FF4D50] transition-colors duration-500">আরও জানুন</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
            </button>
          </motion.div>

          {/* Bottom Tabs */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-6">
            <div className="container mx-auto px-4">
              <div className="flex justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-16 border-b border-white/30 pb-4">
                {['দৃষ্টিভঙ্গি', 'পরিকল্পনা', 'অগ্রগতি', 'সমর্থন'].map((item) => (
                  <button
                    key={item}
                    className="text-white/70 hover:text-[#FF4D50] font-header text-sm sm:text-base md:text-xl lg:text-2xl font-bold transition-colors relative group pb-2"
                  >
                    {item}
                    <span className="absolute bottom-[-17px] left-0 w-0 h-1 bg-[#FF4D50] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative w-full py-20 overflow-hidden bg-[#FEFFF6] min-h-screen flex items-center">
        {/* Background Grid */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url(${frame19})`,
          }}
        ></div>

        <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="mb-16">
            <span className="text-[#00A651] font-header text-2xl sm:text-3xl md:text-4xl font-bold mb-4 block">পরিচয়</span>
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-header font-bold text-black leading-none">
              <TypingText text="কে এই," className="block" />
              <TypingText text="নাহিদা সারোয়ার নিভা ?" className="block" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column - Large Poster */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-black rounded-[2.5rem] transform translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <img
                src={nivaPoster}
                alt="Nahida Sarwar Niva Poster"
                className="relative w-full h-auto rounded-[2.5rem] border-4 border-white z-10"
              />
            </div>

            {/* Right Column - Images & Text */}
            <div className="lg:col-span-7 space-y-12">
              {/* Two Images Row */}
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-1/2 relative group">
                  <div className="absolute inset-0 bg-[#F4A261] rounded-[2rem] transform translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                  <img
                    src={nivaPortrait1}
                    alt="Nahida Sarwar Niva Portrait 1"
                    className="relative w-full aspect-square object-cover rounded-[2rem] border-4 border-white z-10"
                  />
                </div>
                <div className="w-full sm:w-1/2 relative group mt-8 sm:mt-0">
                  <div className="absolute inset-0 bg-[#F4A261] rounded-[2rem] transform translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                  <img
                    src={image1}
                    alt="Nahida Sarwar Niva Portrait 2"
                    className="relative w-full aspect-square object-cover rounded-[2rem] border-4 border-white z-10"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl text-black font-body font-medium leading-relaxed underline decoration-[#00A651] decoration-2 underline-offset-8">
                  নিভা একজন সাধারণ মানুষ যিনি অসাধারণ কিছু করতে চান। ঢাকা-১২ এর প্রতিটি কোণে তার শেকড় রয়েছে, এবং এই শহরের মানুষের জন্য তার ভালোবাসা অসীম।
                </p>

                {/* Button */}
                <div className="pt-4">
                  <button className="group flex items-center gap-2 sm:gap-3 md:gap-4 px-6 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 bg-white border-2 border-black rounded-full font-header text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    আরও
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl">জানুন ›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <div>
        <JourneySection scrollContainerRef={scrollRef} />
      </div>

      {/* Vision Section */}
      <div>
        <VisionSection />
      </div>

      {/* Community Section */}
      <div>
        <CommunitySection />
      </div>

      {/* Milestone Section */}
      <div>
        <MilestoneSection />
      </div>

      {/* Testimonial Section */}
      <div>
        <TestimonialSection />
      </div>

      {/* Work Gallery Section */}
      <div>
        <WorkGallerySection />
      </div>

      {/* News Section */}
      <div>
        <NewsSection />
      </div>

      {/* Contact Section */}
      <div>
        <ContactSection />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;