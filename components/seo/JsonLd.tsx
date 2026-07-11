/**
 * `<` 이스케이프는 JSON-LD 값에 "</script>"가 섞여 스크립트가 조기 종료되는 것을 막기 위함.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD는 <script> raw 삽입이 표준 방식이며 데이터는 서버에서 직접 생성한 값만 사용
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
