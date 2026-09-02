import type { CodeBlock as CodeBlockData } from "@/lib/content/types";

/** Mac 스타일 코드 윈도우 */
export default function CodeBlock({ code, lang, filename }: CodeBlockData) {
  return (
    <div className="rounded-lg overflow-hidden border border-border/30 bg-[var(--gray-1000)] text-[var(--gray-200)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gray-900)] border-b border-[var(--gray-800)]">
        {/* Traffic lights */}
        <span className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </span>
        {filename && (
          <span className="ml-2 font-mono text-xs text-[var(--gray-600)]">
            {filename}
          </span>
        )}
        {!filename && lang && (
          <span className="ml-2 font-mono text-xs text-[var(--gray-600)] uppercase">
            {lang}
          </span>
        )}
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
