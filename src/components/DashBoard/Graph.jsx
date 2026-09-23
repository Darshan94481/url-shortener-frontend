import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';
import { BarChart3, TrendingUp, BarChart2 } from 'lucide-react';

ChartJS.register(
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData = [] }) => {
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'line'
  const hasData = graphData && graphData.length > 0;

  // Real data parsing
  const labels = hasData
    ? graphData.map((item) => item.clickDate)
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const userPerDays = hasData
    ? graphData.map((item) => item.count)
    : [0, 0, 0, 0, 0, 0, 0];

  const barData = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: userPerDays,
        backgroundColor: hasData
          ? 'rgba(59, 130, 246, 0.85)'
          : 'rgba(226, 232, 240, 0.4)',
        hoverBackgroundColor: 'rgba(37, 99, 235, 1)',
        borderColor: hasData ? '#2563eb' : 'rgba(203, 213, 225, 0.6)',
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.8,
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: userPerDays,
        borderColor: '#3b82f6',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: hasData,
        backgroundColor: '#0f172a',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} ${context.parsed.y === 1 ? 'click' : 'clicks'}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: hasData ? undefined : 5,
        grid: {
          color: 'rgba(241, 245, 249, 1)',
          drawBorder: false,
        },
        ticks: {
          stepSize: 1,
          color: '#64748b',
          font: { size: 11 },
          callback: (value) => (Number.isInteger(value) ? value : ''),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Chart Header Toolbar */}
      <div className="flex items-center justify-between pb-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-roboto">
              Click Telemetry
            </h4>
            <span className="text-[11px] text-slate-500">
              Aggregated daily performance
            </span>
          </div>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              chartType === 'bar'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Bar View"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setChartType('line')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              chartType === 'line'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Trend View"
          >
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative flex-1 w-full min-h-[280px]">
        {chartType === 'bar' ? (
          <Bar data={barData} options={options} />
        ) : (
          <Line data={lineData} options={options} />
        )}

        {!hasData && (
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/70 backdrop-blur-[1px] rounded-xl pointer-events-none p-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3 shadow-inner">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h5 className="text-slate-800 text-sm font-bold font-roboto">
              No Data Recorded for This Range
            </h5>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Share your shortened links on social or messaging apps to generate click telemetry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
