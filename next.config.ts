import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable Vercel's image optimization to avoid hitting limits
    // We use Contentful's image API for optimization instead
    unoptimized: true, // Disable Vercel's image optimization to avoid hitting limits ENABLE IF NOT ON LIMIT
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
