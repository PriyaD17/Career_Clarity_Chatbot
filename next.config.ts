import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  serverExternalPackages: ["chromadb"],
  

  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/chromadb/ }
    ];
    return config;
  },
};

export default nextConfig;