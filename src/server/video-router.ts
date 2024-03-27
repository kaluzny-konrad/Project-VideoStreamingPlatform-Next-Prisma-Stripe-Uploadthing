import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import {
  AddVideoValidator,
  DeleteVideoValidator,
  VideoEditValidator,
} from "@/lib/validators/video";
import { utapi } from "./uploadthing";
import { z } from "zod";
import { VideoOnList, VideoToWatch } from "@/types/video";

export const videoRouter = router({
  getVideosIncludedInCourse: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { courseId } = input;
      const { user } = ctx;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          VideosIncluded: true,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      const videosOnList: Array<VideoOnList> = course.VideosIncluded.map(
        (video) => {
          const videoOnList: VideoOnList = {
            id: video.id,
            name: video.videoName,
          };
          return videoOnList;
        }
      );

      return videosOnList;
    }),

  getVideoToWatch: privateProcedure
    .input(
      z.object({
        subChapterId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { subChapterId } = input;
      const { user } = ctx;

      const video = await db.video.findUnique({
        where: {
          subChapterId: subChapterId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      const videoToWatch: VideoToWatch = {
        id: video.id,
        name: video.videoName,
        url: video.url,
      };

      return videoToWatch;
    }),

  addVideoToCourse: privateProcedure
    .input(AddVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId, subChapterId } = input;
      const { user } = ctx;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      const video = await db.video.findUnique({
        where: {
          id: videoId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      await db.subChapter.update({
        where: {
          id: subChapterId,
        },
        data: {
          Video: {
            connect: {
              id: videoId,
            },
          },
        },
      });

      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          VideosIncluded: {
            connect: {
              id: videoId,
            },
          },
        },
      });

      return video;
    }),

  deleteVideoFromCourse: privateProcedure
    .input(DeleteVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId } = input;
      const { user } = ctx;

      // Ensure the course exists
      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      // Ensure the video exists
      const video = await db.video.findUnique({
        where: {
          id: videoId,
          courseId: courseId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      await db.video.delete({
        where: {
          id: videoId,
        },
      });

      utapi.deleteFiles(video.fileName);

      const updatedCourse = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      return updatedCourse;
    }),

  editVideo: privateProcedure
    .input(VideoEditValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId, name } = input;
      const { user } = ctx;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      const video = await db.video.findUnique({
        where: {
          id: videoId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      const updatedVideo = await db.video.update({
        where: {
          id: videoId,
        },
        data: {
          videoName: name,
        },
      });

      return updatedVideo;
    }),
});
