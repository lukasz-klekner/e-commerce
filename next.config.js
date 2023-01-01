/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'naszsklep-api.vercel.app',
      'media.graphassets.com',
      'media.graphassets.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
