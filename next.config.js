/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sa-east-1.graphassets.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
