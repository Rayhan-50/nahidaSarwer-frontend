import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import frame16 from '../../assets/frame_16.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollY = e.detail?.scrollTop !== undefined ? e.detail.scrollTop : window.scrollY;
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('element-scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('element-scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'হোম', href: '/', isExternal: false },
    { name: 'সমর্থন করুন', href: '/supporters', isExternal: false },
    { name: 'ডোনেট', href: '/donate', isExternal: false },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => console.error(err));
  };

  const isTransparentPage = location.pathname === '/supporters';

  return (
    <nav className={`${isTransparentPage ? 'absolute top-0 left-0 w-full bg-transparent' : 'relative bg-white'} z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white' : ''}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer no-underline">
            <img src={frame16} alt="Logo" className="h-8 md:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-black hover:text-brand-red transition-colors duration-300 font-header text-2xl font-bold ${location.pathname === item.href ? 'text-brand-red' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-black hover:text-brand-red transition-colors duration-300 font-header text-2xl font-bold">
                <span>আরও</span>
                <ChevronDown size={20} />
              </div>
              {/* Dropdown Content */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <div className="py-2">
                  <Link to="/about" className="block px-4 py-2 text-lg font-header text-gray-800 hover:bg-brand-orange/10 hover:text-brand-orange">আমাদের সম্পর্কে</Link>
                  <Link to="/gallery" className="block px-4 py-2 text-lg font-header text-gray-800 hover:bg-brand-orange/10 hover:text-brand-orange">গ্যালারি</Link>
                  <Link to="/contact" className="block px-4 py-2 text-lg font-header text-gray-800 hover:bg-brand-orange/10 hover:text-brand-orange">যোগাযোগ</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="hidden lg:block">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="font-header text-lg font-bold text-black hover:text-brand-red">ড্যাশবোর্ড</Link>
                <button
                  onClick={handleLogout}
                  className="bg-black text-white font-header text-2xl font-bold px-10 py-3 rounded-full shadow-[4px_4px_0px_0px_#FF4D50] hover:shadow-[2px_2px_0px_0px_#FF4D50] hover:translate-y-[2px] transition-all duration-200"
                >
                  লগ আউট
                </button>
              </div>
            ) : (
              <Link
                to="/donate"
                className="bg-black text-white font-header text-2xl font-bold px-10 py-3 rounded-full shadow-[4px_4px_0px_0px_#FF4D50] hover:shadow-[2px_2px_0px_0px_#FF4D50] hover:translate-y-[2px] transition-all duration-200 inline-block"
              >
                ডোনেট করুন
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#FF4D50] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#FEFFF6] border-t border-gray-200 shadow-lg z-50">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-2xl font-header font-bold text-black hover:text-brand-red"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <span className="block text-2xl font-header font-bold text-gray-500 mb-2">আরও</span>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-xl font-header text-black hover:text-brand-red pl-4">আমাদের সম্পর্কে</Link>
                <Link to="/gallery" onClick={() => setIsOpen(false)} className="block py-2 text-xl font-header text-black hover:text-brand-red pl-4">গ্যালারি</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-xl font-header text-black hover:text-brand-red pl-4">যোগাযোগ</Link>
              </div>

              <div className="pt-6">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-center font-header text-xl font-bold text-black">ড্যাশবোর্ড</Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full bg-black text-white font-header text-2xl font-bold px-10 py-4 rounded-full shadow-[4px_4px_0px_0px_#FF4D50] active:shadow-[2px_2px_0px_0px_#FF4D50] active:translate-y-[2px] transition-all duration-200"
                    >
                      লগ আউট
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/donate"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-black text-white font-header text-2xl font-bold px-10 py-4 rounded-full shadow-[4px_4px_0px_0px_#FF4D50] active:shadow-[2px_2px_0px_0px_#FF4D50] active:translate-y-[2px] transition-all duration-200"
                  >
                    ডোনেট করুন
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;