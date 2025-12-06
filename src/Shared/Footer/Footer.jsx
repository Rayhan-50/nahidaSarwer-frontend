import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#F4A261] pt-16 pb-8 px-4 sm:px-6 lg:px-12 font-body text-black">
      {/* Top Section: Nav & Newsletter */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-20 gap-8">
        {/* Top Navigation Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-4 text-xl md:text-2xl font-bold">
          <a href="#" className="hover:underline">ঢাকা-১২ এর ভবিষ্যৎ</a>
          <a href="#" className="hover:underline">নিজ সম্পর্কে</a>
          <a href="#" className="hover:underline">আমাদের লক্ষ্য</a>
          <a href="#" className="hover:underline">সংগঠকদের সাথে</a>
          <a href="#" className="hover:underline">সংযোগ স্থাপন</a>
        </nav>

        {/* Newsletter Section */}
        <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
          <span className="text-sm font-bold mb-2">আমাদের নিউজলেটার</span>
          <div className="bg-[#FF4D50] p-4 w-full max-w-xs text-center border border-black">
            <p className="font-bold text-lg mb-1">ধন্যবাদ আপনার সাবস্ক্রিপশনের জন্য।</p>
            <p className="text-xs">ত্রুটি ঘটেছে সাবস্ক্রিপশন প্রক্রিয়ায়</p>
          </div>
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

      {/* Bottom Section: Policies & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-black/20 pt-8 text-xs md:text-sm font-medium gap-4">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">কুকি পলিসি</a>
          <a href="#" className="hover:underline">শর্তাবলী</a>
          <a href="#" className="hover:underline">গোপনীয়তা নীতি</a>
        </div>
        <div className="text-center md:text-right">
          © ২০২৪ নিভা ক্যাম্পেইন। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;