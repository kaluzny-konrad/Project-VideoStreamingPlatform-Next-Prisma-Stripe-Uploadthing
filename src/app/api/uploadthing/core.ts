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

const onUploadComplete = async ({
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
        name: file.name,
        url: file.url,
        userId: metadata.userId,
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
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
