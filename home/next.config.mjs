/** @type {import('next').NextConfig} */
const nextConfig = {
  
    trailingSlash: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
          },
        ],
      },
};

export default nextConfig;
