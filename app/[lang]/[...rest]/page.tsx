import { notFound } from "next/navigation";

// 루트 레이아웃이 [lang] 아래에 있어, 매칭되지 않는 경로를 여기서 받아야 레이아웃 안에서 404를 렌더링한다
export const dynamicParams = true;

export default function CatchAllPage() {
  notFound();
}
