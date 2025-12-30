/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.thecatapi.com",
      },
      {
        protocol: "https",
        hostname: "*.tumblr.com",
      },
    ],
  },
};

module.exports = nextConfig;
