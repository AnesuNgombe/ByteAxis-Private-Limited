import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { COMPANY, getTelLink, getWhatsAppLink } from '../../utils/company';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-50 print-hidden"
    >
      <div className="bg-ink text-sand text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="tracking-widest uppercase">Tech + Business Launch Studio</span>
          <div className="flex flex-wrap items-center gap-4">
            <a href={getTelLink(COMPANY.voip)} className="hover:text-white">VOIP {COMPANY.voip}</a>
            <a href={getWhatsAppLink()} className="hover:text-white">WhatsApp {COMPANY.whatsapp}</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between min-h-[72px] py-4 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.img
                src="/img/byteaxis_logo.png"
                alt="ByteAxis Logo"
                className="h-14 w-auto bounce-logo"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="ml-3 text-2xl font-display text-primary-600">ByteAxis</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-slate-700 hover:text-primary-600 hover:bg-sand'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <SignedOut>
              <Link to="/quotation" className="btn-primary">Get Quote</Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white rounded-2xl shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-600 hover:bg-sand'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <SignedOut>
                <Link
                  to="/quotation"
                  className="block w-full text-center btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
