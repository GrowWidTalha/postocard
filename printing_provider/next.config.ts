import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/printing-provider",
  assetPrefix: "/printing-provider",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },

};
export default nextConfig;
