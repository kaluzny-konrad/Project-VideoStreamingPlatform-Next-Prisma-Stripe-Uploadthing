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
  addVideoToCourse: privateProcedure
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

      const updatedVideo = await db.video.update({
        where: {
          id: videoId,
        },
        data: {
          SubChapter: {
            connect: {
              id: subChapterId,
            },
          },
        },
        include: {
          SubChapter: true,
        },
      });

      return updatedVideo;
    }),

  deleteVideo: privateProcedure
    .input(DeleteVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const { user } = ctx;

      const video = await db.video.findUnique({
        where: {
          id,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      if (video.key === "seeded") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete seeded video",
        });
      }

      const isVideoDeleted = await utapi.deleteFiles(video.key);

      if (!isVideoDeleted) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete video",
        });
      }

      await db.video.delete({
        where: {
          id,
        },
      });

      return video;
    }),

  editVideo: privateProcedure
    .input(VideoEditValidator)
    .mutation(async ({ input, ctx }) => {
      const { id, name } = input;
      const { user } = ctx;

      const video = await db.video.findUnique({
        where: {
          id,
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
          id,
        },
        data: {
          videoName: name,
        },
      });

      return updatedVideo;
    }),
});
