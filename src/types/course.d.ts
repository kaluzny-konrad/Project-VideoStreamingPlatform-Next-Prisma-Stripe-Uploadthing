import { Course } from "@prisma/client";

export type CourseOnList = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  publicatedAt: string;
  categoryId: string;
};

export type CourseStatsInList = {
    views: number;
    comments: number;
}