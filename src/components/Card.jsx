import React from 'react';

const Card = ({ icon: Icon, title, desc, tag }) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top subtle glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-custom-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-custom-gradient group-hover:text-white transition-all duration-300">
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
          </div>
          {tag && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-full border border-blue-100">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-slate-900 text-lg font-bold font-roboto mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
