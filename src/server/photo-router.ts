import { TRPCError } from "@trpc/server";

import { privateProcedure, router } from "./trpc";
import { db } from "@/db";
import {
  PhotoAddToCourseValidator,
  PhotoDeleteValidator,
} from "@/lib/validators/photo";
import { utapi } from "./uploadthing";

export const photoRouter = router({
  addPhotoToCourse: privateProcedure
    .input(PhotoAddToCourseValidator)
    .mutation(async ({ input }) => {
      const { courseId, photoId } = input;

      const photo = await db.photo.update({
        where: {
          id: photoId,
        },
        data: {
          isMainPhoto: true,
          Courses: {
            connect: {
              id: courseId,
            },
          },
        },
      });

      return photo;
    }),

  deletePhoto: privateProcedure
    .input(PhotoDeleteValidator)
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const { user } = ctx;

      const photo = await db.photo.findFirst({
        where: {
          id,
        },
      });

      if (!photo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Photo not found",
        });
      }

      const isPhotoDeleted = await utapi.deleteFiles(photo.key);

      if (!isPhotoDeleted) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete photo",
        });
      }

      await db.photo.delete({
        where: {
          id,
        },
      });

      return {
        success: true,
      };
    }),
});
