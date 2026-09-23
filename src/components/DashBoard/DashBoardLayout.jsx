import React, { useState, useEffect, useMemo } from 'react';
import Graph from './Graph';
import { useStoreContext } from '../../contextApi/contextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import {
  Link2,
  MousePointerClick,
  TrendingUp,
  Award,
  Plus,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react';
import ShortenUrlList from './ShortenUrlList';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader';
import ShortenPopUp from './ShortenPopUp';
import dayjs from 'dayjs';

const DashBoardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  const {
    isLoading: isUrlsLoading,
    data: myShortenUrls = [],
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const {
    isLoading: isClicksLoading,
    data: totalClicks = [],
  } = useFetchTotalClicks(token, onError);

  function onError(err) {
    console.error('Dashboard data query error:', err);
  }

  useEffect(() => {
    if (location.state?.openCreatePopup) {
      setShortenPopUp(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Compute KPI Metrics
  const metrics = useMemo(() => {
    const totalLinks = myShortenUrls.length;
    const totalEngagements = myShortenUrls.reduce(
      (sum, item) => sum + (item.clickCount || 0),
      0
    );

    let topLink = null;
    if (myShortenUrls.length > 0) {
      topLink = [...myShortenUrls].sort(
        (a, b) => (b.clickCount || 0) - (a.clickCount || 0)
      )[0];
    }

    const avgClicks =
      totalLinks > 0 ? (totalEngagements / totalLinks).toFixed(1) : 0;

    return {
      totalLinks,
      totalEngagements,
      topLink,
      avgClicks,
    };
  }, [myShortenUrls]);

  const isLoading = isUrlsLoading || isClicksLoading;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-mesh-gradient lg:px-14 sm:px-8 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{dayjs().format('MMMM YYYY')} Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-roboto">
              Link Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor click performance, generate QR codes, and deploy short links.
            </p>
          </div>

          <button
            onClick={() => setShortenPopUp(true)}
            className="inline-flex items-center justify-center gap-2 bg-custom-gradient text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-brand-sm hover:shadow-brand-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Short URL</span>
          </button>
        </div>

        {isLoading ? (
          <Loader message="Loading your dashboard & telemetry..." />
        ) : (
          <>
            {/* KPI Summary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Links */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Links
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Link2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-roboto">
                  {metrics.totalLinks}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Active tracked destinations
                </p>
              </div>

              {/* Card 2: Total Engagements */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Engagements
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-roboto">
                  {metrics.totalEngagements}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Cumulative click-throughs
                </p>
              </div>

              {/* Card 3: Top Performer */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Top Performer
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900 truncate font-mono">
                  {metrics.topLink ? `/${metrics.topLink.shortUrl}` : '—'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {metrics.topLink
                    ? `${metrics.topLink.clickCount} clicks captured`
                    : 'Create links to track'}
                </p>
              </div>

              {/* Card 4: Avg Clicks */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Avg. Clicks / Link
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-roboto">
                  {metrics.avgClicks}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Performance efficiency
                </p>
              </div>
            </div>

            {/* Overall Analytics Graph Card */}
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-card">
              <div className="w-full h-[380px]">
                <Graph graphData={totalClicks} />
              </div>
            </div>

            {/* Links List Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-roboto">
                    Your Shortened Links
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage, copy, inspect QR codes, and expand link telemetry.
                  </p>
                </div>
              </div>

              {myShortenUrls.length === 0 ? (
                /* Empty state when user hasn't created any links */
                <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-12 text-center shadow-card max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <Link2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 font-roboto">
                    No Short Links Created Yet
                  </h4>
                  <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm mx-auto leading-relaxed">
                    Create your very first clean link to start sharing and viewing live analytics.
                  </p>
                  <button
                    onClick={() => setShortenPopUp(true)}
                    className="inline-flex items-center gap-2 bg-custom-gradient text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-brand-sm hover:shadow-brand-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Your First Link</span>
                  </button>
                </div>
              ) : (
                <ShortenUrlList data={myShortenUrls} />
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal Popup */}
      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashBoardLayout;
