export type CaseSection = {
  heading: string;
  body: string;
  image?: {
    src: string;
    caption: string;
  };
};

export type Case = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "ONGOING" | "SOLVED" | "HOLDED";
  date: string;
  image: string;
  images?: string[];
  description: string;
  projectUrl?: string;
  sections: CaseSection[];
};
