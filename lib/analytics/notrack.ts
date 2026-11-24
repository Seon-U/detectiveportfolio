/**
 * 내 방문 제외 — `?notrack=1`로 들어오면 이 브라우저를 Umami 집계에서 뺀다.
 * `?notrack=0`이면 다시 집계한다. 처리한 뒤에는 주소에서 notrack 파라미터를 지운다.
 *
 * Umami 스크립트는 로드 직후 첫 페이지뷰를 보내므로, 그보다 먼저 실행되어야 한다.
 * 그래서 React 효과(useEffect)가 아니라 beforeInteractive 인라인 스크립트로 넣는다.
 * `umami.disabled`는 Umami가 직접 읽는 localStorage 키다. 쿠키가 아니고, 이 브라우저에만 적용된다.
 */
export const NOTRACK_SCRIPT = `(function(){try{
var p=new URLSearchParams(location.search),v=p.get("notrack");
if(v===null)return;
if(v==="0")localStorage.removeItem("umami.disabled");
else localStorage.setItem("umami.disabled","1");
p.delete("notrack");
var q=p.toString();
history.replaceState(history.state,"",location.pathname+(q?"?"+q:"")+location.hash);
}catch(e){}})();`;
