import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
      },
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/cases",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/cases/:id",
        destination: "/projects/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
