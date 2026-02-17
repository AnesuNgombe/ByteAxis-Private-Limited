import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, getTelLink, getWhatsAppLink } from '../../utils/company';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.17c-.29-.14-1.72-.85-1.98-.95-.26-.1-.45-.14-.64.14-.19.29-.74.95-.91 1.15-.17.19-.34.22-.63.08-.29-.14-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.89 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.72-.7 1.96-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.17-.55-.31z" />
    <path d="M26.73 5.27A14.97 14.97 0 0 0 16 .5C7.9.5 1.33 7.07 1.33 15.17c0 2.68.7 5.17 1.92 7.33L.5 31.5l9.21-2.69a14.9 14.9 0 0 0 6.29 1.4h.01c8.1 0 14.67-6.57 14.67-14.67 0-3.91-1.52-7.58-4.25-10.27zm-10.73 23.6h-.01a12.33 12.33 0 0 1-6.29-1.72l-.45-.27-5.46 1.59 1.46-5.32-.29-.47a12.34 12.34 0 1 1 11.03 6.19z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M21 8.3a5.2 5.2 0 0 1-3.1-1V16a6 6 0 1 1-6-6c.4 0 .9.1 1.3.2v3.2a2.8 2.8 0 1 0 2 2.7V1h3.1a5.2 5.2 0 0 0 2.7 4.6v2.7z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.326v21.348C0 23.402.598 24 1.326 24h11.495V14.706h-3.13V11.07h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.636h-3.123V24h6.116C23.403 24 24 23.402 24 22.674V1.326C24 .598 23.403 0 22.675 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7A3 3 0 1 1 12 9a3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1z" />
    <path d="M20.5 6.1a5.2 5.2 0 0 0-1.1-1.6 5.2 5.2 0 0 0-1.6-1.1c-.6-.2-1.5-.5-3.2-.5H9.4c-1.7 0-2.6.3-3.2.5a5.2 5.2 0 0 0-1.6 1.1 5.2 5.2 0 0 0-1.1 1.6c-.2.6-.5 1.5-.5 3.2v5.2c0 1.7.3 2.6.5 3.2a5.2 5.2 0 0 0 1.1 1.6 5.2 5.2 0 0 0 1.6 1.1c.6.2 1.5.5 3.2.5h5.2c1.7 0 2.6-.3 3.2-.5a5.2 5.2 0 0 0 1.6-1.1 5.2 5.2 0 0 0 1.1-1.6c.2-.6.5-1.5.5-3.2V9.3c0-1.7-.3-2.6-.5-3.2zm-1.7 8.6a3.1 3.1 0 0 1-.8 1.7 3.1 3.1 0 0 1-1.7.8c-.6.2-1.4.4-3 .4H9.7c-1.6 0-2.4-.2-3-.4a3.1 3.1 0 0 1-1.7-.8 3.1 3.1 0 0 1-.8-1.7c-.2-.6-.4-1.4-.4-3V9.7c0-1.6.2-2.4.4-3a3.1 3.1 0 0 1 .8-1.7 3.1 3.1 0 0 1 1.7-.8c.6-.2 1.4-.4 3-.4h3.6c1.6 0 2.4.2 3 .4a3.1 3.1 0 0 1 1.7.8 3.1 3.1 0 0 1 .8 1.7c.2.6.4 1.4.4 3v3.6c0 1.6-.2 2.4-.4 3z" />
  </svg>
);

const Footer = () => {
  const socials = [
    { name: 'WhatsApp', href: getWhatsAppLink(), color: 'text-[#25D366]', icon: WhatsAppIcon },
    { name: 'TikTok', href: COMPANY.social.tiktok, color: 'text-white', icon: TikTokIcon },
    { name: 'Facebook', href: COMPANY.social.facebook, color: 'text-[#1877F2]', icon: FacebookIcon },
    { name: 'Instagram', href: COMPANY.social.instagram, color: 'text-[#E4405F]', icon: InstagramIcon },
  ];

  return (
    <footer className="bg-ink text-sand mt-20 print-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/img/byteaxis_logo.png" alt="ByteAxis logo" className="h-10 w-auto" />
              <span className="text-xl font-display text-primary-600">ByteAxis</span>
            </div>
            <p className="text-sand/70 leading-relaxed">
              Software, systems, and business-launch services built for founders and growing teams.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-sand/60 mb-4">Company</h4>
            <ul className="space-y-2 text-sand/80">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <SignedOut>
                <li><Link to="/quotation" className="hover:text-white">Quotation</Link></li>
              </SignedOut>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-sand/60 mb-4">Contact</h4>
            <ul className="space-y-3 text-sand/80">
              <li>VOIP: <a href={getTelLink(COMPANY.voip)} className="hover:text-white">{COMPANY.voip}</a></li>
              <li>WhatsApp: <a href={getWhatsAppLink()} className="hover:text-white">{COMPANY.whatsapp}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-sand/60">Ready to build?</h4>
            <p className="text-sand/70">Get a clear scope, timeline, and 15% VAT-ready quote.</p>
            <div className="flex flex-col gap-3">
              <SignedOut>
                <Link to="/quotation" className="btn-secondary">Generate Quotation</Link>
              </SignedOut>
              <SignedIn>
                <Link to="/pricing" className="btn-secondary">View Pricing</Link>
              </SignedIn>
              <a href={getWhatsAppLink()} className="btn-outline text-sand border-sand/40 hover:text-ink hover:bg-sand">
                Chat on WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noreferrer"
                    className={`h-10 w-10 rounded-full border border-sand/20 flex items-center justify-center transition hover:bg-sand/10 ${item.color}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-sand/20 mt-12 pt-6 text-sm text-sand/60 flex flex-col md:flex-row md:justify-between gap-3">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Built with React + Spring-ready API.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
