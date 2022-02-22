/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      externalDir: true
    },
    reactStrictMode: true,
    images: {
      domains: [
        "firebasestorage.googleapis.com",
        "ik.imagekit.io"
      ]
    },
  }
  
module.exports = nextConfig
  