/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0-modern-portfolio-website-nine-phi.vercel.app',
      },
    ],
  },
};

module.exports = nextConfig;
