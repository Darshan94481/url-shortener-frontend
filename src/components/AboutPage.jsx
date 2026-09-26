import React from "react";
import { Link2, BarChart3, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStoreContext } from "../contextApi/contextApi";

const AboutPage = () => {
  const { token } = useStoreContext();

  const features = [
    {
      icon: Link2,
      title: "Simple URL Shortening",
      color: "bg-blue-500",
      accent: "text-blue-600 bg-blue-50",
      desc: "Transform lengthy, complicated links into clean, concise URLs in a single click. Designed for effortless sharing across social media, SMS, emails, and marketing campaigns.",
    },
    {
      icon: BarChart3,
      title: "Deep Real-Time Analytics",
      color: "bg-indigo-500",
      accent: "text-indigo-600 bg-indigo-50",
      desc: "Gain comprehensive visibility into how your audience interacts with your links. Track daily click frequencies, geographical trends, and engagement spikes.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-Grade Security",
      color: "bg-emerald-500",
      accent: "text-emerald-600 bg-emerald-50",
      desc: "Rest assured with tokenized authorization, encrypted redirection protocols, and reliable anti-spam protection keeping your destination URLs safe.",
    },
    {
      icon: Zap,
      title: "Ultra-Low Latency Redirects",
      color: "bg-amber-500",
      accent: "text-amber-600 bg-amber-50",
      desc: "Engineered for speed. Our lightweight redirection mechanism ensures your visitors reach their destination within milliseconds without annoying intermediary screens.",
    },
  ];

  const highlights = [
    "Instant 1-click clipboard copying",
    "Real-time click tracking & dynamic graphs",
    "QR Code generation for seamless physical sharing",
    "Isolated user workspaces and secure JWT tokens",
  ];

  const containerStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-mesh-gradient lg:px-14 sm:px-8 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero Section */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>Empowering Modern Digital Sharing</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-roboto mb-4 sm:mb-5"
          >
            Built for Speed, Reliability, and <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Actionable Insights</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-600 text-sm sm:text-lg leading-relaxed"
          >
            Linklytics is designed to remove the friction from URL management.
            Whether you are launching a product launch, tracking an email newsletter, or sharing assets with a team,
            we deliver high-performance short links backed by real-time analytics.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {features.map(({ icon: Icon, title, accent, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-start gap-3.5 sm:gap-5"
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${accent}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-roboto mb-1.5 sm:mb-2">
                  {title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Value Checklist & CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Core Architecture
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-roboto mt-2 mb-3 sm:mb-4">
                Why Developers and Marketers Choose Linklytics
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Clean links increase click-through rates by up to 34%. Combined with detailed time-series telemetry, Linklytics gives you full command over your link distribution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3 sm:gap-4 w-full">
              {token ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto min-h-[44px] bg-custom-gradient text-white font-semibold px-8 py-3 rounded-xl shadow-brand-md hover:shadow-brand-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm text-center"
                >
                  <span>Open Your Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto min-h-[44px] bg-custom-gradient text-white font-semibold px-8 py-3 rounded-xl shadow-brand-md hover:shadow-brand-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm text-center"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto min-h-[44px] bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all duration-200 flex items-center justify-center text-sm text-center"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
