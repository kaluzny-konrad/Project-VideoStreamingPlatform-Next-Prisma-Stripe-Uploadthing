import { db } from "@/db";
import { getAuthSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
  const session = await getAuthSession();
  const user = session?.user;

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
        courseId: "",
        videoName: file.name,
        subChapterId: "",
      },
    });

    return { fileId: uploadedFile.id };
  } catch (error) {
    console.error(error);
  }
};

const onImageUploadComplete = async ({
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
    const uploadedFile = await db.image.create({
      data: {
        key: file.key,
        url: file.url,
      },
    });

    return { fileId: uploadedFile.id };
  } catch (error) {
    console.error(error);
  }
};

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "512MB" } })
    .middleware(middleware)
    .onUploadComplete(onVideoUploadComplete),
  imageUploader: f({ image: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onImageUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
