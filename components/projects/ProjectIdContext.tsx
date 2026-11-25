"use client";

import { createContext, useContext } from "react";

/**
 * 상세 페이지의 프로젝트 id. 콘텐츠 블록(YouTube, 갤러리)이 분석 이벤트에 id를 넣을 때 쓴다.
 * 블록 데이터 타입에 id를 추가하지 않고 ProjectDetail에서 한 번만 제공한다.
 */
const ProjectIdContext = createContext("");

export const ProjectIdProvider = ProjectIdContext.Provider;

export function useProjectId() {
  return useContext(ProjectIdContext);
}
