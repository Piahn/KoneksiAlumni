import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/90 pt-16 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 items-start">
          {/* Left: Connect with us (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Stay connected with us
            </h4>
            <div className="flex items-center max-w-sm">
              <input
                id="footer-email"
                aria-label="Enter your email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-xs bg-white border border-slate-200 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
              />
              <button
                type="button"
                className="rounded-r-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
              >
                Submit
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: 3 Nav Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6 sm:gap-8 text-xs">
            {/* Col 1 */}
            <div>
              <h5 className="font-bold text-slate-900 mb-3">Navigation</h5>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <Link to="/#about" className="hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/direktori" className="hover:text-blue-600 transition-colors">
                    Network
                  </Link>
                </li>
                <li>
                  <Link to="/#career" className="hover:text-blue-600 transition-colors">
                    Career
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="font-bold text-slate-900 mb-3">Programs</h5>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <Link to="/direktori" className="hover:text-blue-600 transition-colors">
                    Career Class
                  </Link>
                </li>
                <li>
                  <Link to="/direktori" className="hover:text-blue-600 transition-colors">
                    Counselling
                  </Link>
                </li>
                <li>
                  <Link to="/#about" className="hover:text-blue-600 transition-colors">
                    Donation
                  </Link>
                </li>
                <li>
                  <Link to="/#impact" className="hover:text-blue-600 transition-colors">
                    Tracer Study
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 className="font-bold text-slate-900 mb-3">Updates</h5>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <Link to="/#events" className="hover:text-blue-600 transition-colors">
                    Event
                  </Link>
                </li>
                <li>
                  <Link to="/#news" className="hover:text-blue-600 transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="/#impact" className="hover:text-blue-600 transition-colors">
                    Awards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Watermark Display Typography Matching Image 2 */}
        <div className="pt-10 pb-6 border-t border-slate-200/60">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-blue-600 tracking-tight select-none">
            Nusantara University
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Nusantara University Alumni Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Term & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
