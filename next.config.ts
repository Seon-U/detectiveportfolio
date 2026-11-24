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

      // 지원처별 단축 링크 — /r/<코드> → UTM이 붙은 홈. 코드마다 규칙을 추가할 필요 없음(배포 불필요).
      // 코드는 영문 소문자·숫자·하이픈 1~40자만 허용. 그 외는 매칭되지 않아 404로 간다.
      // permanent: false(307) — 브라우저가 목적지를 영구 캐시하지 않게 해 나중에 규칙을 바꿀 수 있도록 함.
      // 대응표(코드 ↔ 회사)는 docs/utm-links.md (gitignore)
      {
        // locale 지정: /ko/r/toss, /en/r/acme
        source: "/:lang(ko|en)/r/:code([a-z0-9-]{1,40})",
        destination: "/:lang?utm_source=:code&utm_medium=link",
        permanent: false,
      },
      {
        // locale 미지정: proxy가 쿠키·Accept-Language로 ko/en을 고른다(쿼리는 유지됨)
        source: "/r/:code([a-z0-9-]{1,40})",
        destination: "/?utm_source=:code&utm_medium=link",
        permanent: false,
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
        // 스크립트의 기본 수집 endpoint(data-host-url 미지정 시)와 같은 호스트
        destination: "https://gateway.umami.is/api/send",
      },
    ];
  },
};

export default nextConfig;
