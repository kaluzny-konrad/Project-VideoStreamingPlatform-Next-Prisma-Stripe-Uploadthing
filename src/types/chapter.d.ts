import { Chapter, SubChapter } from "@prisma/client";

export type ChaptersFullState = {
  id: string;
  courseId: string;
  ChapterIdsOrder: string[];
  Chapters: Chapter[];
  SubChapters: SubChapter[];
};
