"use client";

import { useEffect } from "react";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import {
  fromAttrKey,
  TRACK_ATTR,
  TRACK_PROP_PREFIX,
  track,
} from "@/lib/analytics/track";

/**
 * document 하나에서 [data-track] 요소의 클릭을 받아 이벤트로 보낸다.
 * - 컴포넌트마다 onClick을 달 필요가 없고, 서버 컴포넌트에도 속성만 붙이면 된다.
 * - preventDefault를 하지 않으므로 링크 동작(download, mailto, 새 탭)이 그대로 유지된다.
 *   (Umami 기본 data-umami-event는 같은 탭 링크를 가로채 location.href로 이동시켜 download 속성이 무시됨)
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest(`[${TRACK_ATTR}]`);
      if (!el) return;

      const event = el.getAttribute(TRACK_ATTR) as AnalyticsEventName;
      const props: Record<string, string> = {};
      for (const { name, value } of Array.from(el.attributes)) {
        if (name.startsWith(TRACK_PROP_PREFIX)) {
          props[fromAttrKey(name.slice(TRACK_PROP_PREFIX.length))] = value;
        }
      }
      // 속성은 trackAttrs()로만 만들어지므로 런타임 값은 이벤트 정의와 일치한다
      track(event, props as never);
    };

    // 휠 클릭(새 탭으로 열기)은 click이 아니라 auxclick으로 온다
    const onAuxClick = (e: MouseEvent) => {
      if (e.button === 1) onClick(e);
    };

    // capture 단계에서 받는다: 컴포넌트가 onClick에서 stopPropagation을 해도
    // (예: ProjectList의 외부 링크) document까지 올라오지 않아 이벤트가 빠지는 일을 막는다.
    // 기록만 하고 이벤트 흐름은 건드리지 않으므로 다른 핸들러 동작에는 영향이 없다.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAuxClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onAuxClick, true);
    };
  }, []);

  return null;
}
