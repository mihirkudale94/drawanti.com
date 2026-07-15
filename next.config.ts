import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/#core-services',
        statusCode: 301,
      },
      {
        source: '/programs',
        destination: '/#comprehensive-services',
        statusCode: 301,
      },
      {
        source: '/insights',
        destination: '/#insights',
        statusCode: 301,
      },
      {
        source: '/reviews',
        destination: '/patient-reviews',
        statusCode: 301,
      },
      {
        source: '/faq',
        destination: '/#faq',
        statusCode: 301,
      },
      {
        source: '/contact',
        destination: '/#contact',
        statusCode: 301,
      },
      {
        source: '/book-now',
        destination: '/patient-intake',
        statusCode: 301,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
