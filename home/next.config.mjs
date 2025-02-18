/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /pdf\.worker\.(min\.)?js$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[hash][ext][query]',
          },
        });
        return config;
      },
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
