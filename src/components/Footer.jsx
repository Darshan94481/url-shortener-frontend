import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { Link2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      icon: FaGithub,
      href: 'https://github.com/Darshan94481',
      label: 'GitHub',
    },
    {
      icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/in/darshan-jain-dec2003',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/darshanjain_2576/',
      label: 'Instagram',
    },
  ];

  return (
    <footer className="border-t border-slate-200/80 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="bg-custom-gradient w-8 h-8 rounded-xl flex items-center justify-center shadow-brand-sm">
              <Link2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-roboto tracking-tight leading-none">
                Linklytics
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Simplifying URL shortening & analytics for efficient sharing.
              </p>
            </div>
          </div>

          {/* Operational Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All Systems Operational</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl border border-slate-200/80 flex items-center justify-center text-slate-500 hover:bg-custom-gradient hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Quick Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Linklytics. Designed for high-performance link management.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
