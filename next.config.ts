import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimization is now enabled
    // We use Contentful's image API for optimization as well
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/addons',
        destination: '/addons-style-extensions',
        permanent: true,
      },
      {
        source: '/addons/:type',
        destination: '/addons-style-extensions/:type',
        permanent: true,
      },
      {
        source: '/addons/:type/:id',
        destination: '/addons-style-extensions/:type/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
