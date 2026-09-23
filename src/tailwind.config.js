/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
        'custom-gradient-2': 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)',
        'card-gradient': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      colors: {
        navbarColor: '#ffffff',
        btnColor: '#3b82f6',
        linkColor: '#2563eb',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      boxShadow: {
        'brand-sm': '0 2px 8px 0 rgba(59, 130, 246, 0.15)',
        'brand-md': '0 4px 16px 0 rgba(59, 130, 246, 0.2)',
        'brand-lg': '0 10px 30px 0 rgba(59, 130, 246, 0.25)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(59, 130, 246, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
