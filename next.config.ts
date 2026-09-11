import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
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
