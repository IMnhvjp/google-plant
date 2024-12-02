import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config, { dev }) {
    if (dev) {
      config.stats = 'errors-only'; 
    }
    return config;
  },
};

export default nextConfig;
