import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimization is now enabled
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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
