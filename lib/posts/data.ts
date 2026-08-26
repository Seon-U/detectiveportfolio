import type { BlogPost } from "./types";

/**
 * 블로그 포스트 목록
 * ogImage: 각 블로그 플랫폼의 og:image에서 추출 (Tistory URL은 ~2026-09 만료)
 */
export const ALL_POSTS: BlogPost[] = [
  {
    id: "001",
    title: "Nginx 뒤에서 인증이 깨질 때 | 헤더 유실과 NextAuth 쿠키 판별",
    url: "https://brandofme.tistory.com/entry/Nginx-%EB%92%A4%EC%97%90%EC%84%9C-%EC%9D%B8%EC%A6%9D%EC%9D%B4-%EA%B9%A8%EC%A7%88-%EB%95%8C-%ED%97%A4%EB%8D%94-%EC%9C%A0%EC%8B%A4%EA%B3%BC-NextAuth-%EC%BF%A0%ED%82%A4-%ED%8C%90%EB%B3%84-%EA%B0%80%EC%84%A4-4%EA%B0%9C-%EA%B2%80%EC%A6%9D",
    ogImage:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fbkjj6L%2FdJMcagTSIhB%2FAAAAAAAAAAAAAAAAAAAAAKBS8SYsoxe6FIladQ4O63FAGBeGvYzOxLgihuWU3Wb3%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1788188399%26allow_ip%3D%26allow_referer%3D%26signature%3DqlMP0MeBW%252FHWUqFvJGYAW%252BVnvpY%253D",
    tags: ["NextAuth", "Nginx", "Docker"],
    roles: ["backend", "frontend"],
  },
  {
    id: "002",
    title: "도커가 뭘까?",
    url: "https://velog.io/@nowlee/%EB%8F%84%EC%BB%A4%EA%B0%80-%EB%AD%98%EA%B9%8C",
    ogImage:
      "https://velog.velcdn.com/images/nowlee/post/79b30d42-f235-454e-b5e9-5209ae08e54f/image.png",
    tags: ["Docker"],
    roles: ["backend"],
  },
  {
    id: "003",
    title: "개인 페이지 SEO 최적화 수행 및 배운점",
    url: "https://brandofme.tistory.com/entry/%EA%B0%9C%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-SEO-%EC%B5%9C%EC%A0%81%ED%99%94-%EC%88%98%ED%96%89-%EB%B0%8F-%EB%B0%B0%EC%9A%B4-%EC%A0%90",
    ogImage:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fb18B4A%2FdJMcagzpTCc%2FAAAAAAAAAAAAAAAAAAAAAO-0h8yeKh_-Qmise6OT6P1y5ZgQmW0aO5qgq8l2-l2d%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1788188399%26allow_ip%3D%26allow_referer%3D%26signature%3DHb8x4rCR7lBxgeHJxY33BiUNAo4%253D",
    tags: ["Next.js", "SEO", "robots.ts"],
    roles: ["frontend"],
  },
  {
    id: "004",
    title: "Swift앱에서 오직 JSON 파일만 이용하여 데이터 영속성 유지해보기",
    url: "https://brandofme.tistory.com/entry/Swift%EC%95%B1%EC%97%90%EC%84%9C-%EC%98%A4%EC%A7%81-JSON-%ED%8C%8C%EC%9D%BC%EB%A7%8C-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%98%81%EC%86%8D%EC%84%B1-%EC%9C%A0%EC%A7%80%ED%95%B4%EB%B3%B4%EA%B8%B0",
    ogImage:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FI1h3t%2FbtsKKPl5b19%2FAAAAAAAAAAAAAAAAAAAAAKxMHCfYdtIRmXTCho9CB8rCBU_qZmPeKMAxbevPtPR3%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1788188399%26allow_ip%3D%26allow_referer%3D%26signature%3DJ9zX%252FgpMiYGQI%252BFrrmioVJQYkDE%253D",
    tags: ["iOS", "Swift", "JSON"],
    roles: ["ios"],
  },
  {
    id: "005",
    title: "초심자를 위한 React2Shell 보안 이슈",
    url: "https://brandofme.tistory.com/entry/%EC%B4%88%EC%8B%AC%EC%9E%90%EB%A5%BC-%EC%9C%84%ED%95%9C-React2Shell-%EB%B3%B4%EC%95%88-%EC%9D%B4%EC%8A%88",
    ogImage:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcROWU8%2FdJMcaacJrG9%2FAAAAAAAAAAAAAAAAAAAAABdrsM8HofWtmkx5QrofvYAEMepUEN_S3oRcVeYrLpRw%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1788188399%26allow_ip%3D%26allow_referer%3D%26signature%3DMlwixcSCMApinnFznsM7fM4fAcA%253D",
    tags: ["React", "Security"],
    roles: ["frontend"],
  },
  {
    id: "006",
    title: "Spring MVC, Swift MVC, MVVM 헷갈리는 부분 정리",
    url: "https://brandofme.tistory.com/entry/Spring-MVC-Swift-MVC-MVVM-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-%EB%B6%80%EB%B6%84-%EC%A0%95%EB%A6%AC",
    tags: ["Spring", "Swift", "MVVM", "MVC"],
    roles: ["backend", "ios"],
  },
  {
    id: "007",
    title: "유튜브 iframe 사용 중 CORS 에러 + Next.js CORS",
    url: "https://brandofme.tistory.com/entry/%EC%9C%A0%ED%8A%9C%EB%B8%8C-iframe-%EC%82%AC%EC%9A%A9-%EC%A4%91-CORS-%EC%97%90%EB%9F%AC-Nextjs-CORS",
    ogImage:
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FPQsS0%2FdJMcafyp1ye%2FAAAAAAAAAAAAAAAAAAAAAN781g_0iNYLAztN8oisradULy5Y21hoA3m0RSB5hszU%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1788188399%26allow_ip%3D%26allow_referer%3D%26signature%3DMUGZckbq6GQwPvy%252FlW7nRCrvLx8%253D",
    tags: ["Next.js", "iframe", "CORS"],
    roles: ["frontend"],
  },
];
