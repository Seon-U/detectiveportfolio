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

  // Umami 1st-party 프록시 — 광고 차단기의 도메인 필터를 피하기 위해 같은 도메인으로 중계.
  // 오픈 프록시가 되지 않도록 와일드카드 없이 필요한 두 경로만 고정 목적지로 연결한다.
  async rewrites() {
    return [
      {
        source: "/stats/script.js",
        destination: "https://cloud.umami.is/script.js",
      },
      {
        source: "/stats/api/send",
        destination: "https://cloud.umami.is/api/send",
      },
    ];
  },
};

export default nextConfig;
