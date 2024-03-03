import { Course } from "@prisma/client";

export type CourseOnList = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  publicatedAt: string;
  categoryId: string;
};

export type CourseStatsInList = {
    views: number;
    comments: number;
}

export type CourseOnMarketplace = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  publicatedAt: string;
  creatorId: string;
  stripeProductId: string;
  imageId: string;
}

export type CourseCreatorInfo = {
  id: string;
  name: string;
  avatarUrl: string;
}

export type CourseWatch = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  publicatedAt: string;
  creatorId: string;
  imageId: string;
  categoryId: string;
}