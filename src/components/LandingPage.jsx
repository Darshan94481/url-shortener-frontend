import React, { useState } from 'react';
import {
  Link2,
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  MousePointerClick,
  QrCode,
} from 'lucide-react';
import Card from './Card';
import { motion } from 'framer-motion';
import { useStoreContext } from '../contextApi/contextApi';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [copiedDemo, setCopiedDemo] = useState(false);

  const manageLinksHandler = () => {
    navigate(token ? '/dashboard' : '/login');
  };

  const createShortLinkHandler = () => {
    if (token) {
      navigate('/dashboard', { state: { openCreatePopup: true } });
    } else {
      navigate('/register');
    }
  };

  const handleCopyDemo = () => {
    navigator.clipboard.writeText('https://linklytics.dev/launch-2026');
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const features = [
    {
      icon: Link2,
      tag: 'Core Engine',
      title: 'Simple URL Shortening',
      desc: 'Turn long, messy links into clean, shareable URLs in seconds with zero technical complexity.',
    },
    {
      icon: BarChart3,
      tag: 'Telemetry',
      title: 'Powerful Analytics',
      desc: 'Track clicks, daily engagement patterns, and conversion trends with clear, interactive charts.',
    },
    {
      icon: ShieldCheck,
      tag: 'Protection',
      title: 'Enhanced Security',
      desc: 'Rest easy with tokenized sessions, HTTPS encryption, and reliable spam screening on every link.',
    },
    {
      icon: Zap,
      tag: 'Performance',
      title: 'Fast and Reliable',
      desc: 'Built on high-availability cloud routing so your links redirect instantly with near-zero latency.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Paste Destination URL',
      desc: 'Enter any valid destination URL, blog post, campaign link, or portfolio asset.',
    },
    {
      step: '02',
      title: 'Instant Shortening',
      desc: 'Receive a sleek, randomized short slug with 1-click clipboard copy and QR code generation.',
    },
    {
      step: '03',
      title: 'Track Performance',
      desc: 'Watch clicks populate in real time on your dashboard analytics graph.',
    },
  ];

  const containerStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-mesh-gradient lg:px-14 sm:px-8 px-4 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto pt-8 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <motion.div
            className="lg:col-span-7"
            variants={containerStagger}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen URL Shortener & Analytics</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold font-roboto text-slate-900 text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-5 sm:mb-6"
            >
              Shorten Links.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Expand Your Reach.
              </span>{' '}
              Track Every Click.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl"
            >
              Linklytics gives creators, marketers, and developers a reliable platform
              to simplify URL sharing, generate instant QR codes, and monitor click
              engagement in real time.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={manageLinksHandler}
                className="w-full sm:w-auto min-h-[44px] bg-custom-gradient text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>{token ? 'Go to Dashboard' : 'Manage Links'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={createShortLinkHandler}
                className="w-full sm:w-auto min-h-[44px] bg-white border border-slate-200/90 text-slate-700 hover:text-blue-600 hover:border-blue-200 px-7 py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Link2 className="w-4 h-4 text-blue-600" />
                <span>Create Short Link</span>
              </button>
            </motion.div>

            {/* Micro Trust Stats - with flex-wrap to prevent overflow */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200/70 text-xs font-medium text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>100% Free to Use</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Sub-10ms Latency</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Live Preview Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center w-full min-w-0"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-4 sm:p-7 shadow-2xl shadow-blue-500/10 relative min-w-0">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Live Preview</span>
              </div>

              {/* Long URL Box */}
              <div className="mb-3.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Original Destination
                </span>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500 font-mono truncate flex items-center gap-1.5">
                  <span className="text-slate-400 flex-shrink-0">https://</span>
                  <span className="truncate">example-store.com/products/seasonal-collection?utm_source=spring_sale</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex justify-center my-1.5 text-blue-500">
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>

              {/* Short URL Transformed Result */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                  Optimized Short Link
                </span>
                <div className="p-3 sm:p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-blue-700 font-mono truncate">
                      linklytics.dev/launch-2026
                    </span>
                  </div>
                  <button
                    onClick={handleCopyDemo}
                    className="min-w-[36px] min-h-[36px] p-2 rounded-lg bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0 flex items-center justify-center shadow-xs"
                    title="Copy demo link"
                    aria-label="Copy demo link"
                  >
                    {copiedDemo ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Simulated Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100 min-w-0">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 truncate">
                    <MousePointerClick className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="truncate">Engagements</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-slate-800 block truncate">1,428 clicks</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100 min-w-0">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 truncate">
                    <QrCode className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="truncate">QR Readiness</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-emerald-600 block truncate">Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3-Step "How It Works" Section */}
      <div className="max-w-6xl mx-auto py-12 sm:py-16 border-t border-slate-200/70">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Frictionless Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-roboto text-slate-900 mt-3">
            How Linklytics Works in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map(({ step, title, desc }) => (
            <div
              key={step}
              className="bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-100 mb-2 sm:mb-3 font-mono">
                {step}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 font-roboto">
                {title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 pb-16 sm:pb-24 border-t border-slate-200/70">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Feature Highlights
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-roboto text-slate-900 mt-3">
            Everything You Need for Link Growth
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <Card
                icon={feature.icon}
                tag={feature.tag}
                title={feature.title}
                desc={feature.desc}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
