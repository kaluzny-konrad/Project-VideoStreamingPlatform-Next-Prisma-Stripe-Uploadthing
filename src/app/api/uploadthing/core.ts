import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
  const user = await currentUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  return { userId: user.id };
};

const onVideoUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  try {
    const uploadedFile = await db.video.create({
      data: {
        key: file.key,
        fileName: file.name,
        url: file.url,
      },
    });

    return { uploadedFile };
  } catch (error) {
    console.error(error);
  }
};

const onPhotoUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  try {
    const uploadedFile = await db.photo.create({
      data: {
        key: file.key,
        fileName: file.name,
        url: file.url,
      },
    });

    return { uploadedFile };
  } catch (error) {
    console.error(error);
  }
};

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "512MB" } })
    .middleware(middleware)
    .onUploadComplete(onVideoUploadComplete),
  photoUploader: f({ image: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onPhotoUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
