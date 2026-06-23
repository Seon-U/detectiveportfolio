export type ImageRef = {
  src: string;
  width: number;
  height: number;
};

export type CaseSection = {
  heading: string;
  body: string;
  image?: ImageRef & {
    caption: string;
  };
};

export type Case = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "ONGOING" | "SOLVED" | "PENDING";
  date: string;
  image: string;
  images?: ImageRef[];
  description: string;
  projectUrl?: string;
  sections: CaseSection[];
};
