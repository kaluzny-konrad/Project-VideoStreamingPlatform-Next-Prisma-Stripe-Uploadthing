import { Chapter, SubChapter } from "@prisma/client";

export type ChaptersFullState = {
  id: string;
  courseId: string;
  chapterIdsOrder: string[];
  Chapters: Chapter[];
  SubChapters: SubChapter[];
};
