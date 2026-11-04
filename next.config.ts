import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },

  // 레거시 /cases 경로 — locale 리다이렉트(proxy)를 한 번 더 거치지 않도록 기본 locale로 직행
  async redirects() {
    return [
      {
        source: "/cases",
        destination: "/ko/projects",
        permanent: true,
      },
      {
        source: "/cases/:id",
        destination: "/ko/projects/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
