import type { Project } from "./types";

export const ALL_PROJECTS: Project[] = [
  /* ═══════════════════════════════════════════════════════════════
     001 — 시니어 반려동물 건강·금융 통합 관리 웹 서비스 (MGK)
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "001",
    title: "시니어를 위한 반려동물 건강, 금융 통합 관리 웹 서비스",

    tags: [
      "Next.js",
      "NextAuth",
      "Typescript",
      "Spring Security",
      "JAVA",
      "JWT",
      "Nginx",
      "Reverse Proxy",
      "BFF",
    ],

    period: "2026.03 - 2026.04",
    lastModified: "2026-08-31",

    image: "/mgkHero.webp",

    description:
      "반려동물 건강 관리와 비용 관리 통합 관리 서비스로 전체 인증 구조 설계 및 개발과 STT기반 알람 설정 개발을 담당했습니다",

    links: [
      { label: "GitHub", url: "https://github.com/My-Golden-Kids/MGK" },
      {
        label: "시연영상",
        url: "https://youtu.be/X2XGyBBq22s?si=pj5CUtLc8fN217NI",
      },
    ],

    teamSize: 5,

    contributions: [
      {
        roleId: "frontend",
        summary: "BFF 세션 기반 인증 구조 구현, 해시 기반 알림 상태 관리",
      },
      {
        roleId: "backend",
        summary:
          "토큰 기반 접근 제어 구현, 인증 장애 계층별 추적, Join Fetch로 N+1 해결",
      },
      {
        roleId: "planner",
        summary:
          "시니어 팻코노미 시장 겨냥한 서비스 제안, 유저 인터뷰로 구체화",
      },
    ],

    sections: [
      {
        id: "introduction",
        heading: "시니어 팻코노미 시장의 발견",
        roles: ["planner"],
        layout: "simple",
        blocks: [
          {
            type: "image",
            src: "/mgkIntro.webp",
            width: 1920,
            height: 1080,
          },
          {
            type: "text",
            body: `시니어 반려동물 시장 규모는 8조에 달하고 농림축산식품부 조사에 따르면 지속적으로 성장할 것으로 예측되고 있습니다.
            직접 시니어 반려인 20인을 인터뷰한 결과, 의료비가 주요 고려사항인 만큼 반려동물 비용 관리와 의료 관리 통합 수요를 확인할 수 있었습니다.
            반려동물 금융상품의 존재를 잘 모르는 고객들을 대상으로 실제 데이터 기반 이점을 제공한다면 반려동물 보험 등 상품 가입 유인이 가능하고, 일상적 기능으로 지속적인 고객 확보가 가능할 것이라 기대했습니다.
            `,
          },
        ],
      },

      {
        id: "fetures",
        heading: "주요 기능",
        layout: "feature",
        features: [
          {
            title: "대화형 대시보드",
            description:
              "메인화면에서 STT, AI를 활용하여 특정 페이지 이동, 종합 데이터 제공을 통해 접근성을 높였습니다",
            block: {
              type: "image",
              src: "/mgkFeature1.webp",
              width: 1920,
              height: 1080,
              caption: "대화형 대시보드 활용 예시",
            },
          },
          {
            title: "반려동물 소비 카테고리별 가계부",
            description:
              "카테고리별 요약 지출을 토대로 노후자금 예측과 상품 추천으로 연계되는 맞춤형 금융 리포트를 제공합니다",
            block: {
              type: "image",
              src: "/mgkFeature2.webp",
              width: 1920,
              height: 1080,
              caption: "재정 탭 화면과 금융리포트 화면",
            },
          },
          {
            title: "알람과 접종 및 의료기록관리",
            description:
              "대화형 대시보드, 의료기록 OCR을 토대로 수집된 데이터 기반 알람과 접종 이력 추적으로 생활 편리를 제공합니다.",
            block: {
              type: "image",
              src: "/mgkFeature3.webp",
              width: 1920,
              height: 1080,
              caption: "메인화면 알람 버블과 반려동물 접종 이력 화면",
            },
          },
        ],
      },

      /* ── BFF 세션과 JWT 헤더 분리 설계 (frontend+backend) ── */
      {
        id: "auth-architecture",
        heading: "인증 구조 설계",
        roles: ["frontend", "backend"],
        layout: "feature",
        features: [
          {
            title: "프론트와 백엔드의 명확한 책임 분리",
            description: `백엔드는 API 접근 제어와 유저 데이터 관리에 집중하고,
            프론트엔드에서 사용자 접근 제어를 전담하도록 설계했습니다.
            BFF 구조를 활용하여 SSR의 경우 Spring 직접 호출(1홉)으로 빠른 데이터 조회가 가능하도록 하고,
            CSR은 프록시 기반으로 Spring API URL을 은닉했습니다. 
            백엔드는 JWT Stateless 상태를 활용하여 세션 방식과 다르게 DB조회 부하는 낮추고, 302 Redirect를 전송하지 않고 프론트엔드에서 화면 제어를 전담하도록 했습니다.`,
            block: {
              type: "flow",
              steps: [
                {
                  label: "클라이언트",
                  detail: "Zod 검증으로 불필요한 API 요청 차단",
                },
                {
                  label: "Next.js BFF · NextAuth",
                  detail:
                    "Spring JWT를 Session 쿠키 내 암호화 저장 → 화면 접근 제어",
                },
                {
                  label: "Spring Security",
                  detail:
                    "중복 검증 · 암호화 · 토큰 발급, JWT 헤더 → API 접근 제어",
                },
                {
                  label: "Refresh 화이트리스트",
                  detail: "비밀번호 재설정 시 타 세션 강제 만료",
                },
              ],
              caption: "전체 인증 플로우",
            },
          },
          {
            title: "HTTP 상태코드 기반 예외 처리로 공통 이해 속도 증대",
            description: `ResponseStatusException을 활용하고 GlobalExceptionHandler를 통해 응답 포맷을 통일했습니다. 
              다만 프로젝트 규모가 커질 시 다국어 지원, 상태코드 세분화를 위해 커스텀 에러 클래스로 분리가 필요해질 것이라 생각합니다.`,
          },
        ],
      },

      /* ── 리프레쉬 토큰 화이트리스트 (backend) ── */
      {
        id: "refresh-whitelist",
        heading: "리프레쉬 토큰 기반 화이트리스트 설정",
        roles: ["backend"],
        layout: "feature",
        features: [
          {
            title: "리프레쉬 토큰 로테이션",
            description:
              "서버 측 토큰 무효화를 위해 리프레쉬 토큰 DB 저장, 비밀번호 변경, 갱신, 회원탈퇴 등 지점에서 기존 토큰 무효 처리하여 기존 토큰 재활용이 불가능하도록 설정했습니다",
            block: {
              type: "flow",
              steps: [
                {
                  label: "RT로 갱신 요청",
                },
                {
                  label: "DB 조회",
                },
                {
                  label: "만료 확인",
                },
                {
                  label: "기존 RT 삭제",
                },
                {
                  label: "새 AT + RT 발급, 저장",
                },
              ],
            },
          },
          {
            title: "Transacton 설정",
            description:
              "토큰 삭제, 새 토큰 저장이 한 트랜젝션 안에 이루어지도록 설정하여 하나라도 실패 시 rollback 설정",
            block: {
              type: "code",
              lang: "java",
              filename: "RefreshTokenService.java",
              code: '@Transactional\npublic RefreshResponse refreshToken(RefreshRequest request) {\n  if (!jwtProvider.validateToken(request.getRefreshToken())) {\n    throw new ResponseStatusException(\n      HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다.");\n  }\n  RefreshToken stored = refreshTokenRepository\n    .findByToken(request.getRefreshToken())\n    .orElseThrow(() -> new ResponseStatusException(\n      HttpStatus.UNAUTHORIZED, "존재하지 않는 리프레시 토큰입니다."));\n  if (stored.isExpired()) {\n    refreshTokenRepository.delete(stored);\n    throw new ResponseStatusException(\n      HttpStatus.UNAUTHORIZED, "만료된 리프레시 토큰입니다.");\n  }\n  // 기존 RT 삭제 + 새 AT·RT 발급\n  refreshTokenRepository.delete(stored);\n}',
            },
          },
        ],
      },

      /* ── 배포 환경 인증 장애 (frontend+backend) ── */
      {
        id: "deploy-auth-debug",
        heading: "배포 환경 인증 장애 - 계층별 소거로 원인 특정",
        roles: ["frontend", "backend"],
        layout: "simple",
        description: `로컬에선 정상, 배포 환경에서 인증이 실패하는 원인을 추적하며 단계별로 해결했습니다. 
        Nginx TLS 터미네이션 환경에서 쿠키명 변경과 설정에 따른 헤더 누락 문제를 파악했습니다`,
        blocks: [
          {
            type: "flow",
            steps: [
              {
                label: "Middleware 토큰 비교 실패 - HTTPS 환경 쿠키명 변경",
                detail: "설정 객체 공유되는 Auth() 콜백으로 교체",
              },
              {
                label: "Spring 403 + mixed content",
                detail: "BFF 리버스 프록시로 API 호출 단일화",
              },
              {
                label: "세션 헤더 정상 파악, 403 지속",
                detail:
                  "Nginx 설정 문제로 파악, 인프라 담당과 의견 공유 후 인프라 담당 서버 재설정 정상화",
              },
            ],
          },
          {
            type: "text",
            body: "에러 코드 단위 대응으로 시간 과다 소모, 이후 인프라 환경을 동시에 고려해야 한다는 걸 깨달았습니다.",
          },
          {
            type: "image",
            src: "/mgkDeployDebug.webp",
            width: 1920,
            height: 1080,
            caption: "기존 플로우(상)와 최종 플로우(하) 비교",
          },
        ],
      },

      /* ── 해시 기반 알림 + N+1 해결 (frontend+backend) ── */
      {
        id: "hash-alarm-n1",
        heading: "해시 기반 알림 상태 관리와 알람용 데이터 N+1 해결",
        roles: ["frontend", "backend"],
        layout: "split",
        description:
          "알림 변경 감지를 해시 기반으로 최적화하고, 알람용 데이터 조회 시 N+1 문제를 Join Fetch로 해결했습니다.",
        blocks: [
          {
            type: "text",
            body: `보안 데이터가 아니라 기존 알람과 변동 체크용 키이기 때문에 빠른 비교를 위해 djb2 해시를 키로 활용했습니다. 
            날짜+상태+이벤트+급여를 JSON.stringify 후 djb2로 base36 hash로 변환하여 알람 데이터 변경 확인용으로 활용했습니다. 
            데이터는 정렬을 토대로 DB에서 배열 순서가 바뀌어도 동일 키를 유지하도록 설정했으며, 새로운 알람 여부는 키 1개로 통합 관리하되, dismiss 상태는 개별 키로 관리하여 개별적으로 닫을 수 있도록 했습니다.`,
          },
          {
            type: "code",
            lang: "typescript",
            filename: "hashAlarm.ts",
            code: "function hashAlarm(todayStr: string, alarm: AlarmResponse): string {\n  const raw = JSON.stringify({\n    date: todayStr,\n    walkHour: alarm.mostFrequentWalkHour,\n    events: alarm.todayEvents.map((e) => \u0060\u0024{e.petId}:\u0024{e.eventType}\u0060).sort(),\n    feeding: (alarm.feedingAlarms ?? [])\n      .map((f) => \u0060\u0024{f.petId}:\u0024{f.feedTime}\u0060)\n      .sort(),\n  });\n\n  // djb2\n  let h = 5381;\n  for (let i = 0; i < raw.length; i++) {\n    h = Math.imul(h << 5, h) + raw.charCodeAt(i);\n  }\n  return (h >>> 0).toString(36);\n}",
          },
          {
            type: "text",
            body: "또한 반려동물별 알람 정보를 불러올 때 pet이 FetchType.LAZY이기에 일반 FETCH 시 N+1번 조회되는 문제를 ManyToOne(Lazy) 구조는 유지하되 JPQL JOIN FETCH로 한 번에 데이터를 불러오도록 설정했습니다. DTO 처리 필터용 데이터 외에도 펫의 이름 등이 추가적으로 필요하기 때문에 전체 로드가 더 효율적이라 판단했습니다.",
          },
          {
            type: "code",
            lang: "java",
            filename: "CalendarRepository.java",
            code: `@Query("""
		SELECT c FROM CalendarEvent c
		JOIN FETCH c.pet
		WHERE c.pet.user.id = :userId
			AND c.date = :date ORDER BY c.date
		""")
	List<CalendarEvent> findByPet_User_IdAndDateOrderByDate(Long userId, LocalDate date);`,
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     002 — MZ부모를 위한 증여 관리 웹 서비스
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "002",

    title: "MZ부모를 위한 증여 관리 웹서비스",

    tags: ["Next.js", "PrismaORM", "MySQL", "OpenAI API", "Design System"],

    period: "2026.01 - 2026.02",
    lastModified: "2026-08-31",

    image: "/aiappHero.webp",

    description: `온라인 소액 중심 증여를 타겟으로 공제 세액 한도 안내와 안정적 상품 가입을 도와주는 서비스입니다. 
      금융 구조에 맞는 데이터 모델링 제안과 상태별 분기처리, 통합된 디자인 구조 설계로 디자인 일관성 유지를 담당했습니다`,

    links: [
      {
        label: "GitHub",
        url: "https://github.com/Seon-U/foryouhana-mobileweb-ui.git",
      },
      {
        label: "시연영상",
        url: "https://youtu.be/bk5TZbhknp4",
      },
    ],

    teamSize: 8,

    contributions: [
      {
        roleId: "frontend",
        summary:
          "TailwindCSS v4 기반 디자인 시스템 구축, CustomHook 활용 테스트 환경 설정",
      },
      {
        roleId: "backend",
        summary: "Account 중심 데이터 모델 재설계",
      },
    ],

    sections: [
      /* ── 기획의도 (planner) ── */
      {
        id: "market-discovery",
        heading: "온라인 소액 증여 틈새 시장 타겟",
        layout: "simple",
        description: `온라인, 소액 증여를 선호하는 MZ세대 부모를 대상으로 기존 오프라인, 고액중심 기여로 연계 전 단계의 고객을 위한 서비스를 기획했습니다.`,
        blocks: [
          {
            type: "image",
            src: "/aiappSurvey.webp",
            width: 1920,
            height: 1080,
            caption: "MZ세대(104명) 설문 결과",
          },
          {
            type: "text",
            body: `맘 카페, SNS 기반 설문 결과 소액 증여 관심이 높으나 절차, 정보 부족이 걸림돌임을 확인하고, 공제 한도와 신고 정보를 통합 제공하는 서비스를 기획하게 되었습니다.
            사용자는 증여 목적의 전용 계좌 분리를 토대로 신고 데이터를 확보하여 간편하게 증여세 신고를 할 수 있고, 자녀 명의 펀드 상품 가입을 통해 공제 한도 외 투자 수익을 통한 절세 효과를 얻을 수 있습니다.
            은행은 증여 플랜에 따른 최소 10년 단위 장기 고객을 확보와, 추후 고액 상품으로 연계를 기대할 수 있습니다`,
          },
        ],
      },
      {
        id: "aiapp-features",
        heading: "주요 기능",
        layout: "feature",
        features: [
          {
            title: "자녀별 증여한도, 상품 관리 대시보드",
            description:
              "메인화면에서 유기정기금 여부(증여 플랜)에 맞춘 한도액 안내와 가입 상품을 한눈에 확인할 수 있습니다",
            block: {
              type: "image",
              src: "/aiappFeature1.webp",
              width: 1920,
              height: 1080,
              caption: "메인 화면",
            },
          },
          {
            title: "증여 플랜 설정",
            description:
              "증여 기간, 증여액, 유기정기금 가입 여부, 연금저축펀드 신청에 따른 증여 플랜을 추천받고, 직접 조정이 가능합니다",
            block: {
              type: "image",
              src: "/aiappFeature2.webp",
              width: 1920,
              height: 1080,
              caption: "증여 플랜 관리 화면",
            },
          },
          {
            title: "증여 기록을 자녀에게 메세지와 함께 전달",
            description:
              "이체 기록과 함께 메세지를 남겨 성인 도달 시점에 자녀에게 마음을 전할 수 있습니다",
            block: {
              type: "image",
              src: "/aiappFeature3.webp",
              width: 1920,
              height: 1080,
              caption: "성인 도달 시 메세지 출력 팝업",
            },
          },
        ],
      },

      /* ── DB 구조 개선 (backend) ── */
      {
        id: "db-redesign",
        heading: "ERD 개선 제안 및 안전 응답 구현",
        roles: ["backend"],
        layout: "feature",
        description:
          "이체 원장의 비대칭을 발견하고 개선안 제안 및 화면 분기처리를 위해 관계 검증, 타입 안전 응답을 구현했다.",
        features: [
          {
            title: "Account 중심 관계 모델 재설계",
            description: `초기 구조는 Parent→Child→Account→fund 단방향 1:N 체인으로, 
              마이데이터 기반 데이터 뷰 조회만을 염두에 둔 구조였습니다.
              그러나 비즈니스 로직이 고도화되며 원장 시스템으로 변경을 고려했고 실제 은행 DB 구조 자료를 찾아보며, 기존 구조의 한계를 파악하여 개선안을 제시했습니다.
              
              기존 구조에선 로직 내부에 부모 계좌가 부재해 이체 기록이 불가능햤습니다. 
              출금, 입금 양단 모두 account, User 테이블을 통합하는 계좌 중심 구조를 제안했습니다. 
              최종 구현에서는 read_auth 연결 테이블 기반 M:N 구조로 확장되었습니다.`,
            block: {
              type: "image",
              src: "/aiappERD.webp",
              width: 1920,
              height: 1080,
              caption: "기존 구조(좌)와 제안 구조(우) ERD 비교",
            },
          },
          {
            title: "계좌 조회 권한 사전 검증과 Discriminated Union 응답 설계",
            description: `신고 화면 분기를 위해 자녀 데이터를 조회할 때, 
            read_auth 관계를 먼저 확인하여 잘못된 분기를 방지했습니다. 
            분기처리용 유저 데이터 응답을 상태별로 분리된 Union 타입으로 설계하여, 
            상태 확인 없을 시 TypeScript 컴파일러가 에러를 발생시키도록 설정했습니다`,
          },
        ],
      },

      /* ── 디자인 토큰 (frontend) ── */
      {
        id: "design-tokens",
        heading: "디자인 토큰 체계 수립",
        roles: ["frontend"],
        layout: "simple",
        description:
          "디자이너 없이 8명이 각자 화면을 디자인하여 제각각 다른 UI가 완성되었습니다. 유사 색상 중복이 생성과 디자인 통일성 유지를 위해 공통 디자인 컬러와 폰트를 코드와 Figma Style로 정리했습니다",
        blocks: [
          {
            type: "image",
            src: "/aiappDesignToken.webp",
            width: 1920,
            height: 1080,
            caption: "color-hana-gray 100~600 스케일 및 폰트 토큰 체계",
          },
          {
            type: "text",
            body: `명도 100~600 스케일로 재배치하고 Style과 코드 토큰명을 통일하여 개발 편리성을 향상시켰습니다.
            디자인 핵심 폰트가 variant 구조가 아닌 각각 별도 형식으로 구성되어 있어 폰트명 단위로 토큰을 설정했으며, 
            원본 폰트를 woff로 변환해 번들에 포함하여 초기 로드 시 전송량을 감소시켰습니다`,
          },
        ],
      },

      /* ── Context 설계 개선 (frontend) ── */
      {
        id: "context-redesign",
        heading: "초기 Context 설계의 한계와 개선안",
        roles: ["frontend"],
        layout: "simple",
        description:
          "별도 로그인 시스템이 존재하는 서비스의 내부 서비스 가정, 로그인 없이 localStorage와 CustomHook으로 유저 공유를 설계했습니다.",
        blocks: [
          {
            type: "code",
            lang: "typescript",
            filename: "UserContextProvider.tsx",
            code: `export function UserContextProvider({
  children, forcedUserId
}: Props) {
  const [userId, setUserIdState] =
    useState(DEFAULT_USER_ID);
  const [ready, setReady] = useState(false);`,
          },
          {
            type: "text",
            body: `UI 변화를 빠르게 테스트할 수 있는 구조를 염두에 두고 설계했습니다.
            기본적으로는 유저Id를 전체 공유하되 인자로 forcedUserId 설정 시 다른 화면 영향 없이 특정 화면에서만 유저를 강제할 수 있는 구조를 만들었습니다.
            `,
          },
          {
            type: "text",
            body: `그러나 구현 과정에서 사용자 식별값이 브라우저 전용 값에 저장되어 Context를 소비하는 하위 화면 전체가 클라이언트로 내려가는 문제가 발생했습니다. 
            초기 렌더에 사용자 정보가 없어 로딩/깜빡임이 발생하고, 
            서버에서 계좌 데이터를 미리 가져올 수 없어 요청이 클라이언트 마운트 이후로 밀리는 문제가 발생했습니다. 
            다시 개발한다면 layout울 통한 Context주입은 그대로 활용하되, Cookie 기반으로 구현하고 forcedUserId 같은 테스트용 식별 파라미터로 테스트 용이성을 고려할 것입니다`,
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     003 — 금융 광고 시안 제작 자동화 AI Agent 서비스 (FinAdGen)
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "003",

    title: "금융 광고 시안 제작 자동화 AI Agent 서비스",

    tags: ["Python", "LangGraph", "Streamlit", "Gemini", "BGE-M3", "Imagen"],

    period: "2026.06",
    lastModified: "2026-09-01",

    image: "/finadgenHero.webp",

    description:
      "금융권 디지털 마케팅 담당자를 타겟으로 5단계 AI 파이프라인을 통해 시안제작을 일부 자동화하는 서비스를 기획했습니다. 전체 파이프라인, 이미지 분석, 생성 Agent 개발을 담당하여 일주일 내 PoC 개발을 완료했습니다",

    links: [
      {
        label: "Github",
        url: "https://github.com/Seon-U/JBFrog.git",
      },
    ],

    teamSize: 2,

    contributions: [
      {
        roleId: "planner",
        summary: "금융 광고 시안 제작 자동화 서비스 기획",
      },
      {
        roleId: "backend",
        summary: "LangGraph 파이프라인 구조 설계",
      },
    ],

    sections: [
      /* ── 기획의도 ── */
      {
        id: "pipeline-overview",
        heading: "반복작업 자동화를 통한 리드타임 감소",
        layout: "simple",
        description:
          "금융권 공모전 참가작으로 금융권 디지털 마케팅 담당자를 타겟으로, 시안 제작 플로우를 자동화하여 리드타임 감소를 목표로 파이프라인 구조를 기획했습니다.",
        blocks: [
          {
            type: "flow",
            steps: [
              {
                label: "레퍼런스 업로드",
                detail: "사용자가 광고 레퍼런스 이미지(PNG·JPG)를 업로드",
              },
              {
                label: "키워드 추출·보정",
                detail:
                  "분석 Agent(Gemini Vision)가 업종·톤·색상·타겟 키워드를 자동 추출, 사용자 수정·삭제",
              },
              {
                label: "마케팅 목표 입력",
                detail: "캠페인 목표와 핵심 메시지를 프롬프트로 입력",
              },
              {
                label: "AI 분석·생성",
                detail:
                  "전략·생성 Agent(Gemini Flash, Imagen)가 광고 이미지와 카피를 생성",
              },
              {
                label: "심의 검토·확인",
                detail:
                  "검증 Agent(Gemini Flash)가 RAG 룰셋 기반 심의 결과와 최종 결과물 확인",
              },
            ],
            caption: "5단계 파이프라인 구조도",
          },
          {
            type: "text",
            body: `레퍼런스 이미지에서 키워드를 추출하고, 목표에 맞춰 카피와 배경 이미지를 만들며, 준수 사항 검증 루프를 최대 3회 진행 후 최종 시안을 제공하는 5단계 파이프라인을 설계했습니다.
            결과물의 안정성을 위해 레퍼런스 키워드는 사용자 입력을 토대로 수정, 변경이 가능하고 최종 심의 검토 결과 점수와 함께 최종 결과물이 제공됩니다`,
          },
          {
            type: "gallery",
            images: [
              {
                src: "/finadgenUI1.webp",
                width: 1440,
                height: 1080,
                caption:
                  "초기화면입니다. 레퍼런스 이미지 여러장을 업로드할 수 있습니다",
              },
              {
                src: "/finadgenUI2.webp",
                width: 1440,
                height: 1080,
                caption:
                  "전체 이미지 분석 후 마케팅 키워드, 색상 구성 등의 정보로 나누어 제공합니다. 키워드 수정과 마케팅 목표를 설정할 수 있습니다",
              },
              {
                src: "/finadgenUI3.webp",
                width: 1440,
                height: 1080,
                caption:
                  "최종 결과물은 이미지와 카피로 나누어 제공되며, 준법 평가 점수와 위반 사항을 동시에 제공합니다",
              },
            ],
          },
        ],
      },

      /* ── API 낭비 제거 (backend) ── */
      {
        id: "api-optimization",
        heading: "초기 구조 불필요한 API 호출 개선",
        roles: ["backend"],
        layout: "simple",
        description:
          "생성 비용이 큰 이미지 생성이 카피 검토 실패 시 재호출되지 않도록 분리하고 반드시 최종 결과물이 나오도록 설정했습니다.",
        blocks: [
          {
            type: "flow",
            steps: [
              {
                label: "AI 카피 생성 · 이미지 생성",
                detail: "카피와 이미지를 동시 생성",
              },
              {
                label: "심의 검토 루프",
                detail:
                  "Max 3회 — copy_approved flag로 카피/이미지 재호출 분리",
              },
              {
                label: "최종 결과 도출",
                detail: "카피, 이미지, 심의 점수, 위반 사항 설명",
              },
            ],
            caption: "카피/이미지 생성 및 심의 검토 루프",
          },
          {
            type: "text",
            body: `초기 구조에서 카피 심의 검토 실패 시 카피 기반 이미지 생성도 재호출되는 문제가 있었습니다.
            카피와 이미지 생성을 분리하고, 카피 검증 통과 이후 이미지 생성이 일어나도록 설정하여 이미지 모델 호출을 줄였습니다(MAX 3회 호출 ⇒ 1회). 
            또한 copy_approved boolean flag를 도입하여 1회 카피 검증 통과 이후 이미지 생성 시 카피 생성을 재호출하지 않도록 명확히 분리했습니다. 
            `,
          },
          {
            type: "text",
            body: "또한 3회 이내 최종 심사가 실패하더라도 반드시 최종 결과물이 출력되도록 설정하여 결과물 출력을 보장하고, 최종 위반 사항을 점수와 위반 사항 설명으로 제공하도록 설정하여 사용자 판단을 도왔습니다",
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     004 — 아이돌 팬을 위한 용량 관리 앱 서비스 (Fanbyte)
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "004",

    title: "아이돌 팬을 위한 용량 관리 앱 서비스",

    tags: ["Swift", "SwiftUI", "SwiftData", "iOS", "App Store"],

    period: "2024.05 - 2025.01",
    lastModified: "2026-09-01",

    image: "/fanbyteHero.webp",

    description: `휴대폰 현재 용량을 향후 촬영 가능한 수로 치환하여 기준점을 제시하는 앱 서비스입니다.
    휴대폰 용량 측정 로직 테스트와 목표 용량 설정 화면을 담당했습니다.
    `,

    links: [
      {
        label: "Github",
        url: "https://github.com/Seon-U/2024-MC3-A12-Moon-Crystal",
      },
      {
        label: "Appstore",
        url: "https://apps.apple.com/kr/app/fanbyte-%EC%9A%A9%EB%9F%89-%EC%A0%95%EB%A6%AC-%EB%8F%84%EC%9A%B0%EB%AF%B8/id6608978832",
      },
    ],

    teamSize: 5,

    contributions: [
      {
        roleId: "ios",
        summary: "용량 측정 로직 검증 및 구현, 커스텀 슬라이더 UI 개발",
      },
      {
        roleId: "planner",
        summary: "유저 인터뷰 Pain Point 발굴, 최종 66명 사용자 확보",
      },
    ],

    sections: [
      /* ── 기획의도 (planner) ── */
      {
        id: "user-research",
        heading: "인터뷰, UT 토대로 기획 및 개선",
        roles: ["planner"],
        layout: "simple",
        description: `아이돌 팬 3인 심층 인터뷰를 토대로 목적(촬영)과 수단(휴대폰 용량 확보) 사이에 기준점 부재로 불안해하는 심리를 확인했습니다.
        이를 토대로 촬영량 기준 용량 안내를 기획했고, 개발 이후 팬 2인을 대상으로 UT를 거쳐 사용성을 개선했습니다`,
        blocks: [
          {
            type: "image",
            src: "/fanbyteResearch.webp",
            width: 1920,
            height: 1080,
            caption: "유저 인터뷰 핵심 발견 → 솔루션 구체화 → UT 결과",
          },
        ],
      },

      {
        id: "feature",
        heading: "주요 기능",
        layout: "simple",
        description: `현재 용량 기준, 혹은 목표 용량 기준을 선택하면 동시에 화질별 촬영 가능한 영상 길이, 사진 갯수로 환산하여 제공합니다.
        다이나믹 아일랜드 기능을 활용해 정리 시 현재 용량을 바로 확인할 수 있도록 하고, 
        지금까지 누적된 정리 용량을 최애를 위한 것으로 표현하여 사용자에게 정리에 대한 만족감을 제공합니다
        `,
        blocks: [
          {
            type: "image",
            src: "/fanbyteFeature.webp",
            width: 1440,
            height: 1080,
            caption:
              "용량 기준 슬라이더와 정리 안내 다이나믹 아일랜드, 리마인드 팝업",
          },
        ],
      },

      /* ── iOS 용량 측정 로직 검증 (ios) ── */
      {
        id: "storage-measurement",
        heading: "iOS 용량 측정 로직 검증 - 기기 테스트로 오차 원인 특정",
        roles: ["ios"],
        layout: "simple",
        description:
          "용량 측정 로직 계산값과 iOS 설정값이 일치하지 않자 실물 기기 테스트를 통해 기존 로직의 신뢰도를 판단했습니다",
        blocks: [
          {
            type: "image",
            src: "/fanbyteStorage.webp",
            width: 1920,
            height: 1080,
            caption: "설정앱 변화 vs 자체로직 변화 비교 그래프",
          },
          {
            type: "text",
            body: `앱, 사진, 영상을 삭제 이후 설정앱과 자체 로직 계산값 모두 지속적으로 변화하는 것을 확인했습니다. 정확한 테스트를 위해 1분 간격 Byte 단위 로깅을 하는 테스트 어플을 제작 후, 더미파일을 삭제하며 실물 기기 테스트를 진행했습니다. 
            종료 조건은 측정 종료 변동 안정화로, 별도 조정 없이도 0.02GB 변동이 지속적으로 관측되어 그 이하는 노이즈 값으로 정했습니다.`,
          },
          {
            type: "text",
            body: `테스트 결과, iOS 자체 최적화에 따라 최대 7분 내로 자체 로직과 설정값이 수렴하는 것을 파악했습니다. 
            '콘서트 전날 미리 정리하는 팬' 타겟에게 분 단위 지연은 무의미하기 완전 일치가 아닌 '유의미한 오차 없는 수렴'으로 기준을 재정의하여 실제 활용 케이스를 기준으로 로직이 활용가능하다 판단했습니다.`,
          },
        ],
      },

      /* ── 커스텀 슬라이더 (ios) ── */
      {
        id: "custom-slider",
        heading: "커스텀 슬라이더 구현",
        roles: ["ios"],
        layout: "split",
        description: `빠른 개발을 위해 1차적으로는 기본 컴포넌트를 활용하여 개발하되, 디자이너와 소통을 토대로 디자인 의도를 반영했습니다.
        이후, 최종 디자인 의도를 고려하여 명시되지 않은 인터랙션을 추가하여 UX를 개선했습니다`,
        blocks: [
          {
            type: "text",
            body: "1차 개발에서 기본 컴포넌트 활용하되 앱의 정체성과, 주목도 고려하여 앱의 포인트 컬러를 활용하고, 배경과 강한 대비를 주도록 설정했습니다",
          },
          {
            type: "image",
            src: "/fanbyteSlider1.webp",
            width: 700,
            height: 360,
          },
          {
            type: "text",
            body: "2차 개발에서는 디자인에 맞춰 GeometricReader로 이동 수치 기준 슬라이더 제작하고 소수점 단위 연속 이동으로 인해 정수 사이 조작감 하락하는 문제를 정수 단위 햅틱 피드백으로 스냅 포인트를 만들어 개선했습니다",
          },
          {
            type: "image",
            src: "/fanbyteSlider2.webp",
            width: 700,
            height: 360,
          },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     005 — 북한이탈주민을 위한 한국어 발음 학습 앱 (Peaceful)
     ═══════════════════════════════════════════════════════════════ */
  {
    id: "005",

    title: "북한이탈주민을 위한 남한어 학습 앱",

    tags: ["Swift", "SwiftUI", "AVFAudio", "iOS", "App Store"],

    period: "2024.08 - 2024.12",
    lastModified: "2026-09-01",

    image: "/peacefullHero.webp",

    description:
      "동음이의어와 표준어 발음을 제공하는 iOS 학습 앱 서비스입니다. 음성 로직과 개발 버전 관리 및 앱 배포를 담당했습니다.",

    teamSize: 3,

    contributions: [
      {
        roleId: "ios",
        summary: "단일 AudioManager Class 기반 음성 관리, 앱스토어 배포 관리",
      },
    ],

    sections: [
      /* ── 기획의도 ── */
      {
        id: "concept",
        heading: "남한 동음이의어, 발음 학습 기획",
        layout: "simple",
        blocks: [
          {
            type: "text",
            body: `유저 인터뷰와 리서치 결과 북한과 남한의 언어 차이로 인한 불편함을 겪고 있는 것을 나타났습니다. 
            이에 뜻에 큰 차이가 나는 동음이의어와 표준어 발음을 듣고 따라할 수 있는 학습 앱을 기획했습니다.`,
          },
        ],
      },

      /* ── AudioManager (ios) ── */
      {
        id: "audio-manager",
        heading: "단일 AudioManager Class 기반 음성 관리",
        roles: ["ios"],
        layout: "simple",
        description: `단일 AudioManager Class와 protocol 기반 확장으로 전체 화면에서 통일된 상태 관리를 구현했습니다`,
        blocks: [
          {
            type: "image",
            src: "/peacefullAudioManager.webp",
            width: 1200,
            height: 490,
            caption: "녹음 및 재생 흐름을 담당하는 AudioManager 구조.",
          },
          {
            type: "text",
            body: `프로토콜로 역할별로 확장을 분리하여 xcode 주석과 파일명 기반하여 빠른 이해가 가능하도록 구현했습니다.
            또한 기존 정의한 기본 기능을 조합하여 화면에 맞는 function을 재정의하여 잘못된 호출을 차단했습니다`,
          },
        ],
      },

      /* ── 배포 및 버전 관리 (ios) ── */
      {
        id: "deploy-management",
        heading: "앱 배포와 버전 관리",
        roles: ["ios"],
        layout: "feature",
        features: [
          {
            title: "상황에 맞는 Build Configuration 설정",
            description: `타겟 디바이스 설정, 프레임워크 최소 기준에 맞는 지원 버전 설정, 크레딧 정보를 설정 번들에 저장하는 등 기본 배포 설정 관리를 다양하게 활용했습니다. 
            배포 버전은 시멘틱 버전으로 관리하고 배포 메세지는 사용자에게 보여지는 만큼 깔끔하면서도 의미를 잘 전달하기 위해 매번 직접 작성했습니다
            `,
          },
          {
            title: "2인 협업에 맞는 간소화된 Git Flow",
            description: `
            간소화된 Commit Convention과 branch protection rule없이 빠른 협업을 진행했습니다.
            기본적으로 데일리 스크럼과 지속적 소통으로 품질관리가 가능했기 때문입니다. 
            그러나, main branch에 Git Tag 기반으로 release 버전 관리를 한 것은 개선이 필요하다고 느꼈습니다. 
            배포용 데이터에 들어가지 않아야 하는 테스트 코드, 주석을 제거하는 작업이 필요했기 때문에 
            다음에는 명시적으로 정리하는 페이즈를 만들고 프리커밋 체크리스트를 도입하는 것이 필요하다 느꼈습니다`,
          },
        ],
      },
    ],
  },
];
