/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
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
