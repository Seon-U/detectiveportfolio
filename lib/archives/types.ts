export type ArchiveCategory = "Notes" | "Experiments";

export type ImageRef = {
  src: string;
  width: number;
  height: number;
};

export type ArchiveSection = {
  heading: string;
  body: string;
  image?: ImageRef & {
    caption: string;
  };
};

export type Archive = {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: ArchiveCategory;
  description: string;
  image?: ImageRef;
  sections: ArchiveSection[];
  pinnedQuote?: {
    body: string;
    attribution: string;
  };
};
