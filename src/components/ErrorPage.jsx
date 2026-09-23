import React from 'react';
import { AlertTriangle, Home, LayoutDashboard, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../contextApi/contextApi';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-16 bg-mesh-gradient">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-rose-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2 font-roboto">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          {message || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {token ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-custom-gradient text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand-md transition-all duration-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-custom-gradient text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand-md transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Home Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
