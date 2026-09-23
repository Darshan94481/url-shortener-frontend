import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Link2, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { useStoreContext } from '../contextApi/contextApi';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useStoreContext();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-blue-600 bg-blue-50/80 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
    }`;

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="bg-custom-gradient w-9 h-9 rounded-xl flex items-center justify-center shadow-brand-sm group-hover:scale-105 transition-transform duration-200">
            <Link2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 bg-clip-text text-transparent font-roboto tracking-tight">
            Linklytics
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {/* CRITICAL FIX: Dashboard link available when user is authenticated */}
          {token && (
            <NavLink to="/dashboard" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                Dashboard
              </span>
            </NavLink>
          )}
        </nav>

        {/* Desktop Auth Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              <button
                onClick={logoutHandler}
                className="flex items-center gap-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium px-3.5 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <NavLink
                to="/login"
                className="text-slate-700 hover:text-blue-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-100/60 transition-all duration-200"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="bg-custom-gradient text-white text-sm font-semibold rounded-xl px-5 py-2 shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          {token && (
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                Dashboard
              </span>
            </NavLink>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {token ? (
              <button
                onClick={() => {
                  logoutHandler();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 font-semibold text-sm hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-custom-gradient text-white font-semibold text-sm shadow-brand-sm transition-all"
                >
                  Create Free Account
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
