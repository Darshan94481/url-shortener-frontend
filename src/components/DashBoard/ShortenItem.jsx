import React, { useEffect, useState } from 'react';
import {
  ExternalLink,
  Calendar,
  MousePointerClick,
  BarChart2,
  Check,
  Copy,
  QrCode,
  Globe,
  Download,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import api from '../../api/api';
import dayjs from 'dayjs';
import Graph from './Graph';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/contextApi';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

function ShortenItem({ originalUrl, shortUrl, clickCount, createdDate }) {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const baseDomain = import.meta.env.VITE_REACT_SUBDOMAIN || 'https://url-shortener-u1tv.onrender.com';

  const fullShortUrl = shortUrl.startsWith('http')
    ? shortUrl
    : `${baseDomain.replace(/\/$/, '')}/${shortUrl}`;

  const displayUrl = fullShortUrl.replace(/^https?:\/\//, '');

  const shortCode = shortUrl.split('/').pop();

  let domain = '';
  try {
    const urlObj = new URL(originalUrl);
    domain = urlObj.hostname;
  } catch (e) {
    domain = '';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2200);
  };

  const analyticsHandler = () => {
    if (!analyticsToggle) {
      setSelectedUrl(shortCode);
    }
    setAnalyticsToggle(!analyticsToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const currentYear = dayjs().year();
      const startDate = `${currentYear}-01-01T00:00:00`;
      const endDate = `${currentYear}-12-31T23:59:59`;
      const { data: res } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAnalyticsData(res || []);
      setSelectedUrl('');
    } catch (error) {
      console.error('Failed to fetch link analytics:', error);
      setAnalyticsData([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=15&data=${encodeURIComponent(
    fullShortUrl
  )}`;

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-card hover:shadow-card-hover border border-slate-200/80 rounded-2xl p-5 sm:p-6 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden">
            {domain ? (
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                alt="favicon"
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <Globe className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              
                href={fullShortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold text-blue-600 hover:text-blue-700 hover:underline truncate font-roboto"
              >
                {displayUrl}
              </a>
              
                href={fullShortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-colors p-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-slate-500 truncate mt-0.5 max-w-xl font-mono">
              {originalUrl}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100/80 text-emerald-700 text-xs font-semibold">
                <MousePointerClick className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {clickCount} {clickCount === 1 ? 'click' : 'clicks'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dayjs(createdDate).format('MMM DD, YYYY')}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className={`flex-1 sm:flex-initial min-h-[40px] inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 border ${
              isCopied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                : 'bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 border-slate-200 shadow-xs'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => setQrModalOpen(true)}
            className="flex-1 sm:flex-initial min-h-[40px] inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 border border-slate-200 shadow-xs transition-all duration-200"
            title="View QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-500" />
            <span>QR Code</span>
          </button>

          <button
            onClick={analyticsHandler}
            className={`flex-1 sm:flex-initial min-h-[40px] inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 ${
              analyticsToggle
                ? 'bg-blue-600 text-white shadow-brand-sm'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Analytics</span>
            {analyticsToggle ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {analyticsToggle && (
        <div className="mt-5 pt-5 border-t border-slate-100 w-full min-h-[280px] sm:min-h-[340px] animate-fadeIn">
          {loader ? (
            <div className="flex flex-col justify-center items-center h-[260px] sm:h-[320px] gap-2">
              <div className="w-9 h-9 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-medium">Loading telemetry...</p>
            </div>
          ) : (
            <div className="h-[260px] sm:h-[320px] md:h-[340px]">
              <Graph graphData={analyticsData} />
            </div>
          )}
        </div>
      )}

      <Modal
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        aria-labelledby="qr-modal-title"
      >
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-center">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-3.5 right-3.5 min-w-[40px] min-h-[40px] p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
              aria-label="Close QR Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 id="qr-modal-title" className="text-lg font-bold text-slate-900 font-roboto mb-1">
              QR Code
            </h3>
            <p className="text-xs text-slate-500 font-mono truncate mb-4 sm:mb-5 max-w-xs mx-auto">
              {fullShortUrl}
            </p>

            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 inline-block mb-5 sm:mb-6 shadow-inner">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-contain mx-auto"
              />
            </div>

            <div className="flex gap-2.5">
              
                href={qrCodeUrl}
                download={`qr-${shortCode}.png`}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-custom-gradient text-white text-xs font-semibold py-2.5 rounded-xl shadow-brand-sm hover:shadow-brand-md transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR</span>
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ShortenItem;