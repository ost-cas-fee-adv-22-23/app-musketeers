// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['randompicturegenerator.com', 'storage.googleapis.com', 'picsum.photos'] },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = withPWA(nextConfig);
