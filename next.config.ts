import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com'],
  },
};

export default nextConfig;
