/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['randompicturegenerator.com', 'storage.googleapis.com', 'picsum.photos'] },
};

module.exports = nextConfig;
