import { PrismaClient } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database...");
  const mockedImage = process.env.SEED_MOCKED_IMAGE!;
  const mockedMovie = process.env.SEED_MOCKED_MOVIE!;

  const seed = await createSeedClient({
    models: {
      photo: {
        data: {
          key: () => "seeded",
          url: () => mockedImage,
        },
      },
      video: {
        data: {
          key: () => "seeded",
          url: () => mockedMovie,
        },
      },
    },
  });

  console.log("resetDatabase...");
  await seed.$resetDatabase(); // eslint-disable-line
  console.log("resetDatabase Done!");

  const userId = process.env.SEED_INITIAL_USER_ID!;
  const userName = process.env.SEED_INITIAL_USER_NAME!;
  const userEmail = process.env.SEED_INITIAL_USER_EMAIL!;
  const userUserName = process.env.SEED_INITIAL_USER_USERNAME!;
  const userImage = process.env.SEED_INITIAL_USER_IMAGE!;
  const now = new Date();

  console.log("prisma.user.create...");
  const user = await prisma.user.create({
    data: {
      id: userId,
      name: userName,
      email: userEmail,
      username: userUserName,
      image: userImage,
      emailVerified: now,
    },
  });
  console.log("prisma.user.create Done!");

  console.log("prisma.category.create...");
  const category = await prisma.category.create({
    data: {
      name: "Test",
      slug: "test",
    },
  });
  console.log("prisma.category.create Done!");

  console.log("prisma.category.create...");
  const photo = await prisma.photo.create({
    data: {
      key: "seeded",
      url: mockedImage,
      fileName: "test.jpg",
    },
  });
  console.log("prisma.category.create Done!");

  const priceId = process.env.SEED_MOCKED_STRIPE_PRICE_ID!;
  const stripeProductId = process.env.SEED_MOCKED_STRIPE_PRODUCT_ID!;

  console.log("prisma.course.create...");
  const course = await prisma.course.create({
    data: {
      name: "Test",
      description: "Test",
      price: 10,
      creatorId: userId,
      priceId,
      stripeProductId,

      Categories: {
        connect: {
          slug: category.slug,
        },
      },
      Photos: {
        connect: {
          id: photo.id,
        },
      },
    },
  });
  console.log("prisma.course.create Done!");

  console.log("prisma.course.create...");
  const chapter = await prisma.chapter.create({
    data: {
      name: "Test",
      courseId: course.id,
    },
  });
  console.log("prisma.course.create Done!");

  console.log("prisma.course.update...");
  await prisma.course.update({
    where: {
      id: course.id,
    },
    data: {
      ChapterIdsOrder: [chapter.id],
    },
  });
  console.log("prisma.course.update Done!");

  console.log("prisma.subChapter.create...");
  const subChapter = await prisma.subChapter.create({
    data: {
      name: "Test",
      courseId: course.id,
    },
  });
  console.log("prisma.subChapter.create Done!");

  console.log("prisma.video.create...");
  await prisma.video.create({
    data: {
      key: "seeded",
      fileName: "test.mp4",
      url: mockedMovie,
      SubChapter: {
        connect: {
          id: subChapter.id,
        },
      },
    },
  });
  console.log("prisma.video.create Done!");

  console.log("prisma.chapter.update...");
  await prisma.chapter.update({
    where: {
      id: chapter.id,
    },
    data: {
      SubChapterIdsOrder: [subChapter.id],
    },
  });
  console.log("prisma.chapter.update Done!");

  console.log("Database seeded successfully!");

  process.exit();
};

main();
