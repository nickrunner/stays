/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "firebasestorage.googleapis.com",
        "ik.imagekit.io"
      ]
    },
  }
  
module.exports = nextConfig
  