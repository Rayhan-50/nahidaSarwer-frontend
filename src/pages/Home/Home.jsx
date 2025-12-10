import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

// import heroImage from '../../assets/images/hero.jpeg';
import frame19 from '../../assets/images/section_2/frame_19.png';
import nivaPoster from '../../assets/images/section_2/niva_poster.png';
import nivaPortrait1 from '../../assets/images/section_2/niva_portrait_1.png';
import image1 from '../../assets/images/section_2/image1.jpeg';
import img from '../../assets/images/img.jpg'
const TextWithReadMore = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = "নিভা ঢাকা ইউনিভার্সিটির মাইক্রোবায়োলজি ডিপার্টমেন্ট থেকে অনার্স ও মাস্টার্স শেষ করেন। দীর্ঘদিন গবেষণার কাজে যুক্ত ছিলেন icddrb তে। ছোটবেলা থেকেই রাজনৈতিক কালচারের সাথে পরিচয়। ভার্সিটি জীবনে প্রায় সকল ধরণের আন্দোলনে যুক্ত ছিলেন। ২০১৮ এর কোটা আন্দোলন, নিরাপদ সড়ক আন্দোলন থেকে ছোটখাটো আরো শ-খানেক আন্দোলন, যা ২০২৪ এর জুলাই গণঅভ্যুত্থানের ভিত্তি তৈরী করে প্রায় তার সবগুলোতেই যুক্ত ছিলেন। গুরুতপূর্ন ভূমিকা রেখেছেন জুলাই গণঅভ্যুত্থানেও";

  // Split into sentences (approximately) or just character count
  // Using character count for simplicity to match "show first few lines"
  const limit = 250;
  const shouldTruncate = text.length > limit;
  const displayText = isExpanded ? text : (shouldTruncate ? text.slice(0, limit) + '...' : text);

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl text-black font-header font-medium leading-relaxed underline decoration-[#00A651] decoration-2 underline-offset-8">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#FF4D50] font-bold text-lg sm:text-xl md:text-2xl hover:underline"
        >
          {isExpanded ? "কম দেখুন" : "আরও পড়ুন"}
        </button>
      )}
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (location.hash && scrollRef.current) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
            backgroundImage: `url(https://res.cloudinary.com/duh7c5x99/image/upload/v1765347650/LFS05105_-_Reyad_Hossain_y2bo4c.jpg)`,
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
            আত্মমর্যাদা সম্পন্ন, সুস্থ, নিরাপদ ও আধুনিক জীবনই আমাদের লক্ষ্য
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
            <Link to="/#about">
              <button className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-transparent text-white rounded-full font-header text-xl sm:text-2xl md:text-6xl lg:text-8xl font-bold border-2 border-white overflow-hidden group shadow-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
                <span className="relative z-10 group-hover:text-[#FF4D50] transition-colors duration-500">আরও জানুন</span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
              </button>
            </Link>
          </motion.div>


        </div>
      </section >

      {/* Introduction Section */}
      <section id="about" className="relative w-full py-20 overflow-hidden bg-[#FEFFF6] min-h-screen flex items-center">
        {/* Background Grid */}
        < div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url(${frame19})`,
          }}
        ></div >

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
                    src={img}
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
                <TextWithReadMore />
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Journey Section */}
      < div >
        <JourneySection scrollContainerRef={scrollRef} />
      </div >

      {/* Vision Section */}
      < div >
        <VisionSection />
      </div >

      {/* Community Section */}
      < div >
        <CommunitySection />
      </div >

      {/* Milestone Section */}
      < div >
        <MilestoneSection />
      </div >

      {/* Testimonial Section */}
      < div >
        <TestimonialSection />
      </div >

      {/* Work Gallery Section */}
      <div id="gallery">
        <WorkGallerySection />
      </div >

      {/* News Section */}
      < div >
        <NewsSection />
      </div >

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div >

      {/* Footer */}
      < div >
        <Footer />
      </div >
    </div >
  );
};

export default Home;