/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  theme: {
    extend: {
      colors: {
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F5F5F5',
          100: '#E5E4E2', // Brushed Silver
          200: '#D7D7D8',
          300: '#C0C0C3',
          400: '#B4B5B8',
          500: '#A8A9AD', // Metallic Silver
          600: '#8E8E93',
        },
      },
    },
  },
};

module.exports = nextConfig;
