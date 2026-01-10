import type { NextConfig } from "next";

const vercelDevHost = "https://vercel.live";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains;",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${vercelDevHost}`,
              "style-src 'self' 'unsafe-inline' https:",
              `img-src 'self' data: https: ${vercelDevHost}`,
              "font-src 'self' data: https:",
              `connect-src 'self' https: ${vercelDevHost}`,
              `frame-src 'self' ${vercelDevHost}`,
            ].join("; "),
          },
        ],
      },
    ];
  },
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

export default nextConfig;
