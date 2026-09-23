import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, ShieldCheck } from 'lucide-react';

const ShortenurlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
    }
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-gradient px-4">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-8 max-w-sm w-full text-center shadow-xl shadow-blue-500/5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center relative">
          <ExternalLink className="w-6 h-6 text-blue-600 animate-pulse" />
          <div className="absolute -top-1 -right-1">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 font-roboto mb-1">
          Redirecting...
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Taking you safely to your destination via Linklytics.
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted & Verified Link</span>
        </div>
      </div>
    </div>
  );
};

export default ShortenurlPage;
