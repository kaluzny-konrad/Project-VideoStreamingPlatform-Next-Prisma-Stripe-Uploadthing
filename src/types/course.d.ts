import { Course } from "@prisma/client";

export type CourseOnList = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  publicatedAt: string;
  categoryId: string;
  stats: CourseStats;
};

export type CourseStats = {
    views: number;
    reviews: number;
    rating: number;
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
  stats: CourseStats;
  reviews: CourseReview[];
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
  stats: CourseStats;
}