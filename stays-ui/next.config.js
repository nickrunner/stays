/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      externalDir: true
    },
    reactStrictMode: true,
    images: {
      domains: [
        'ik.imagekit.io',
      ]
    },
  }
  
module.exports = nextConfig
  