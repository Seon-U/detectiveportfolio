import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import styles from "./learning-journey.module.css";
import Note from "./Note";

export default function LearningJourneySection() {
  return (
    <section
      id="intro"
      data-screen-label="02 Intro"
      className={cn("relative z-5 px-[6vw] pt-[10vh] pb-[8vh]")}
    >
      <SectionHeader
        sectionTitle={"Learning Journey"}
        title={
          <>
            Love to explore new way to
            <br />
            <em>connect</em> people and tech
          </>
        }
      />

      <div className="relative mx-auto h-180 max-w-7xl max-[1100px]:grid max-[1100px]:h-auto max-[1100px]:grid-cols-2 max-[1100px]:gap-7 max-[700px]:grid-cols-1">
        {/* RED STRING — decorative, hidden once the board collapses */}
        <svg
          className="pointer-events-none absolute inset-0 z-1 h-full w-full max-[1100px]:hidden"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="rough">
              <feTurbulence baseFrequency="0.02" numOctaves="2" />
              <feDisplacementMap in="SourceGraphic" scale="3" />
            </filter>
          </defs>
          <g
            stroke="var(--cork-string)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
            filter="url(#rough)"
          >
            {/* 1 → 2 */}
            <path d="M140,110 Q340,40 930,120" />

            {/* 2 → 3 */}
            <path d="M930,120 Q760,260 330,430" />

            {/* 3 → 4 */}
            <path d="M330,430 Q620,250 1040,360" />

            {/* 4 → 5(polaroid) */}
            <path d="M1040,360 Q760,520 610,620" />

            {/* 5 → 6 */}
            <path d="M610,620 Q760,640 980,590" />
          </g>
        </svg>

        <Note
          pin="topleft"
          className={cn("absolute top-0 left-0 max-w-[320px] -rotate-3")}
        >
          <div className="mb-3.5 flex items-center justify-between gap-2.5">
            <span className={cn(styles.stamp, "whitespace-nowrap")}>
              Origin
            </span>
            <span className={cn(styles.caseLabel, "whitespace-nowrap")}>
              No. 01
            </span>
          </div>
          <p>
            언어를 통해 사용자의 마음을 바꿔가는 데 관심이 있어 국어국문학을
            전공했습니다.
            <span className={styles.strike}>
              {" "}
              (졸업 주 전공은 그러나 문학사였습니다.)
            </span>
            언어와 사고의 흐름을 이해하는 것이 좋았습니다.
          </p>
          <p className={cn(styles.handNote, "mt-2")}>
            “Every UI is read before it is used."
          </p>
        </Note>

        <Note
          pin="topright"
          className={cn(
            "absolute top-7.5 right-15 max-w-[320px] rotate-[2.5deg]",
          )}
        >
          <div className="mb-3.5 flex items-center justify-between gap-2.5">
            <span
              className={cn(
                styles.stamp,
                styles.stampTeal,
                "whitespace-nowrap",
              )}
            >
              First System Curiosity
            </span>
            <span className={cn(styles.caseLabel, "whitespace-nowrap")}>
              No. 02
            </span>
          </div>
          <ul className={styles.ledger}>
            <li>
              <span className={styles.bullet}>✦</span> 국민연금공단에서 인턴
              진행
            </li>
            <li>
              <span className={styles.bullet}>✦</span> VBA로 프로그램 관심
              <br />
              (엑셀 매크로로 서류 적부 판단 자동화)
            </li>
            <li>
              <span className={styles.bullet}>✦</span> 국가 기관 전산망, ERP
              사용 기회
            </li>
            <li>
              <span className={styles.bullet}>✦</span> 대규모 시스템과 전산망,
              기술을 통한 문제 해결 관심
            </li>
          </ul>
        </Note>

        <Note
          className={cn(
            "absolute top-80 left-32.5 max-w-[320px] rotate-[-1.5deg]",
          )}
        >
          <div className="mb-3.5 flex items-center justify-between gap-2.5">
            <span
              className={cn(
                styles.stamp,
                styles.stampGold,
                "whitespace-nowrap",
              )}
            >
              Learning Experience
            </span>
            <span className={cn(styles.caseLabel, "whitespace-nowrap")}>
              No. 03
            </span>
          </div>
          <table className={styles.dossierTbl}>
            <tbody>
              <tr>
                <td>Apple Developer Academy</td>
                <td>
                  전체 6개 프로젝트,
                  <br /> IOS Native App 개발
                </td>
              </tr>
              <tr>
                <td>SeSac FullStack</td>
                <td>
                  프론트엔드 중심 풀스택, <br /> Next.js
                </td>
              </tr>
              <tr>
                <td>Digital Hanaro</td>
                <td>
                  Fintech, Spring <br /> 하나은행 관련 프로젝트
                </td>
              </tr>
            </tbody>
          </table>
        </Note>

        <Note
          className={cn(
            "absolute top-[270px] right-0 max-w-[320px] rotate-[3.2deg]",
          )}
        >
          <div className="mb-3.5 flex items-center justify-between gap-2.5">
            <span
              className={cn(
                styles.stamp,
                styles.stampAccent2,
                "whitespace-nowrap",
              )}
            >
              Project Experience
            </span>
            <span className={cn(styles.caseLabel, "whitespace-nowrap")}>
              No. 04
            </span>
          </div>
          <p>
            다양한 프로젝트 경험:{" "}
            <span className={styles.handNote}>
              핀테크 프로젝트 2건 기획, 앱 2건 배포
            </span>
            <br />
            국립국어원 인턴하면서 내부 웹 페이지 개발 과정 간접 경험, 현직
            은행원이 감독하는 프로젝트 진행, 앱 2건 배포
          </p>
          <p className={cn(styles.handNote, styles.handNoteSmall, "mt-2")}>
            <span className={styles.lore}>
              (지금까지 진행한 모든 프로젝트에서 기획도 동시 참여)
            </span>
          </p>
        </Note>

        <Note
          paperClassName={styles.polaroidPaper}
          className={cn(
            "absolute bottom-0 left-1/2 max-w-60 -translate-x-1/2 rotate-[-4deg] max-[1100px]:translate-x-0",
          )}
        >
          <div className={styles.polaroidImg} aria-hidden="true">
            <div className={styles.polaroidStripe} />
            <div className={cn(styles.polaroidStripe, styles.alt)} />
            <div className={styles.polaroidStripe} />
            <div className={cn(styles.polaroidCaption, styles.mono)}>
              EXHIBIT&nbsp;A · DESK · 23:14
            </div>
          </div>
          <p className={cn(styles.handNote, styles.handNoteSmall, "mt-2")}>
            사용자에게 필요한 것을 만들기 위한 공부 중...
          </p>
        </Note>

        <Note
          className={cn(
            "absolute bottom-[30px] right-[130px] max-w-[320px] rotate-[1.4deg]",
          )}
        >
          <div className="mb-3.5 flex items-center justify-between gap-2.5">
            <span className={cn(styles.stamp, "whitespace-nowrap")}>
              Closing Statement
            </span>
            <span className={cn(styles.caseLabel, "whitespace-nowrap")}>
              No. 06
            </span>
          </div>
          <p className={styles.closing}>
            만들다 만 프로덕트, 해결되지 못한 인터페이스, 아직 풀어내지 못한
            이야기가 있는 앱이 있다면,
            <br />
            <a href="mailto:seonu.kim.kr@gmail.com" className={styles.linkInk}>
              seonu.kim.kr@gmail.com
            </a>
          </p>
          <p className={cn(styles.handNote, styles.handNoteSmall, "mt-2")}>
            <span className={styles.lore}>(P.S. 언제나 커피챗 가능)</span>
          </p>
        </Note>
      </div>
    </section>
  );
}
