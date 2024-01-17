import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  videoUploader: f({ image: { maxFileSize: "512MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const uploadedFile = await db.video.create({
          data: {
            key: file.key,
            name: file.name,
            url: file.url,
          },
        });

        return { fileId: uploadedFile.id };
      } catch (error) {
        console.error(error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
