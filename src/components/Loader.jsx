import React from 'react';
import { Loader2 } from 'lucide-react';

function Loader({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[350px] gap-3">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-blue-50/50" />
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">{message}</p>
    </div>
  );
}

export default Loader;
