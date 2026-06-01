export type ArchiveCategory = "Notes" | "Experiments";

export type ArchiveSection = {
  heading: string;
  body: string;
  image?: {
    src: string;
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
  image?: string;
  sections: ArchiveSection[];
  pinnedQuote?: {
    body: string;
    attribution: string;
  };
};
