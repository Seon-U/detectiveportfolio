import type { SVGProps } from "react";
import { Mail } from "lucide-react";

type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

type SocialItem = {
  label: string;
  href: string;
  Icon: IconComponent;
  /** true면 새 탭에서 열림 (mailto 등은 false) */
  external?: boolean;
};

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

/** Tistory T 로고 — 가로 3도트 + 세로 줄기 2도트 */
function TistoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="12" cy="12.5" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
    </svg>
  );
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/Seon-U",
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:seonu.kim.kr@gmail.com",
    Icon: Mail,
  },
  {
    label: "Tistory",
    href: "https://brandofme.tistory.com",
    Icon: TistoryIcon,
    external: true,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1.5">
      {SOCIAL_ITEMS.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="inline-flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110 focus:outline-none bg-theme-toggle-background text-theme-toggle-foreground hover:bg-theme-toggle-hover-background hover:shadow-theme-toggle"
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
