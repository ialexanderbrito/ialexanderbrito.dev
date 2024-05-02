/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sa-east-1.graphassets.com',
        pathname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
