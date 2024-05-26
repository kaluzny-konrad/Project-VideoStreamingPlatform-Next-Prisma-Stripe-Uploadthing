import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { privateProcedure, router } from "./trpc";
import { db } from "@/db";
import {
  ConnectVideoWithCourseValidator,
  DeleteVideoValidator,
  VideoEditValidator,
} from "@/lib/validators/video";
import { utapi } from "./uploadthing";

export const videoRouter = router({
  getVideo: privateProcedure
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

      return video;
    }),

  connectVideoWithCourse: privateProcedure
    .input(ConnectVideoWithCourseValidator)
    .mutation(async ({ input, ctx }) => {
      const { videoId, subChapterId } = input;
      const { user } = ctx;

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

      return video;
    }),

  deleteVideoFromCourse: privateProcedure
    .input(DeleteVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { subChapterId, videoId } = input;
      const { user } = ctx;

      // Ensure the course exists
      const subChapter = await db.subChapter.findUnique({
        where: {
          id: subChapterId,
        },
      });

      if (!subChapter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Sub Chapter not found",
        });
      }

      // Ensure the video exists
      const video = await db.video.findUnique({
        where: {
          id: videoId,
          subChapterId: subChapterId,
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

      return video;
    }),

  editVideo: privateProcedure
    .input(VideoEditValidator)
    .mutation(async ({ input, ctx }) => {
      const { subChapterId, videoId, name } = input;
      const { user } = ctx;

      const subChapter = await db.subChapter.findUnique({
        where: {
          id: subChapterId,
        },
      });

      if (!subChapter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Sub Chapter not found",
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
