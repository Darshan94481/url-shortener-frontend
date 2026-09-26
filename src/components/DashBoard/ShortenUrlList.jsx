import React, { useState, useMemo } from 'react';
import ShortenItem from './ShortenItem';
import { Search, ArrowUpDown, Filter, Link2 } from 'lucide-react';

const ShortenUrlList = ({ data = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'clicks' | 'oldest'

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.originalUrl?.toLowerCase().includes(query) ||
          item.shortUrl?.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'clicks') {
        return (b.clickCount || 0) - (a.clickCount || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
      // default: newest
      return new Date(b.createdDate) - new Date(a.createdDate);
    });

    return result;
  }, [data, searchQuery, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search links by URL or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-14 py-2.5 min-h-[40px] bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] px-2 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto flex-shrink-0">
          <div className="flex-1 sm:flex-initial flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200/80 text-xs text-slate-600 min-h-[40px]">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-medium text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer w-full sm:w-auto min-h-[32px]"
            >
              <option value="newest">Newest First</option>
              <option value="clicks">Most Clicks</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <span className="text-xs text-slate-400 font-medium px-2 hidden md:inline">
            {filteredAndSortedData.length} of {data.length} links
          </span>
        </div>
      </div>

      {/* List / Empty Filtered State */}
      {filteredAndSortedData.length === 0 ? (
        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800 font-roboto">
            No Links Match Your Search
          </h4>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search query or reset the filter.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredAndSortedData.map((item) => (
            <ShortenItem key={item.id || item.shortUrl} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortenUrlList;
