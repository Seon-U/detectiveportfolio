import type { TextBlock as TextBlockData } from "@/lib/content/types";

export default function TextBlock({ body }: TextBlockData) {
  return (
    <p className="font-pretendard text-lg leading-relaxed text-foreground/85 max-w-[740px] break-keep">
      {body}
    </p>
  );
}
