import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/designer",
  assetPrefix: "/designer",
  trailingSlash: true,
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
