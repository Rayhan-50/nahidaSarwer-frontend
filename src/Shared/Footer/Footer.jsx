import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F4A261] pt-16 pb-8 px-4 sm:px-6 lg:px-12 font-body text-black">
      {/* Top Section: Nav & Newsletter */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-20 gap-8">
        {/* Top Navigation Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-4 text-xl md:text-2xl font-bold">
          <Link to="/" className="hover:underline">ঢাকা-১২ এর ভবিষ্যৎ</Link>
          <a href="https://www.facebook.com/nahidasarwer.niva.5" target="_blank" rel="noopener noreferrer" className="hover:underline">নিজ সম্পর্কে</a>
          <Link to="/" className="hover:underline">আমাদের লক্ষ্য</Link>
          <Link to="/supporters" className="hover:underline">সংগঠকদের সাথে</Link>
          <Link to="/#contact" className="hover:underline">সংযোগ স্থাপন</Link>
        </nav>

        {/* Newsletter Section */}
        <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
          <span className="text-sm font-bold mb-2">আমাদের নিউজলেটার</span>
          <form className="flex w-full max-w-sm border border-black" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="w-full p-3 bg-[#FF4D50] placeholder-black/70 text-black font-bold focus:outline-none"
            />
            <button type="submit" className="bg-black text-white px-6 font-bold hover:bg-gray-800 transition-colors">
              সাবস্ক্রাইব
            </button>
          </form>
        </div>
      </div>

      {/* Center: Massive Logo */}
      <div className="flex justify-center mb-12 lg:mb-20">
        <img
          src="https://res.cloudinary.com/duh7c5x99/image/upload/v1764875711/Frame_16_1_lgjt7t.png"
          alt="Nahida Sarwar Niva"
          className="w-full max-w-6xl h-auto object-contain brightness-0"
        />
      </div>

      {/* Contact Info (Added based on user request for actual info) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center md:text-left border-t border-black/10 pt-8">
        <div>
          <h4 className="font-bold text-lg mb-2">যোগাযোগ</h4>
          <p className="text-sm">ফার্মগেট, ঢাকা</p>
          <p className="text-sm">ইমেইল: nahidasarwer@gmail.com</p>
          <p className="text-sm">ফোন: 01763210498</p>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-end items-center gap-6">
          {/* Social Links placeholder - assuming existing or generic if not found */}
        </div>
      </div>


      {/* Bottom Section: Policies & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-black/20 pt-8 text-xs md:text-sm font-medium gap-4">
        <div className="flex gap-6">
          {/* Cookie Policy - Linking to a clear explanation by the GDPR */}
          <a href="https://gdpr.eu/cookies/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            কুকি পলিসি
          </a>

          {/* Terms & Conditions - Linking to a general generator or reference */}
          <a href="https://www.termsofservicegenerator.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            শর্তাবলী
          </a>

          {/* Privacy Policy - Linking to a standard Privacy Policy guide */}
          <a href="https://www.privacypolicygenerator.info/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            গোপনীয়তা নীতি
          </a>
        </div>
        <div className="text-center md:text-right">
          © {currentYear} নাহিদা সারোয়ার নিভা। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;