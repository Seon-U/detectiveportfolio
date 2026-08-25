/** cases, posts 등 콘텐츠 타입에서 공유하는 기본 타입 */

export type ImageRef = {
  src: string;
  width: number;
  height: number;
};

export type ContentSection = {
  heading: string;
  body: string;
  image?: ImageRef & {
    caption: string;
  };
};
