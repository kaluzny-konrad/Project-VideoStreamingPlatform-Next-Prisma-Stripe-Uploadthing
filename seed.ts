import { PrismaClient } from "@prisma/client";
import { createSeedClient } from "@snaplet/seed";

const prisma = new PrismaClient();

const main = async () => {
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

  await seed.$resetDatabase();

  const userId = process.env.SEED_INITIAL_USER_ID!;
  const userName = process.env.SEED_INITIAL_USER_NAME!;
  const userEmail = process.env.SEED_INITIAL_USER_EMAIL!;
  const userUserName = process.env.SEED_INITIAL_USER_USERNAME!;
  const userImage = process.env.SEED_INITIAL_USER_IMAGE!;
  const now = new Date();

  await prisma.user.create({
    data: {
      id: userId,
      name: userName,
      email: userEmail,
      username: userUserName,
      image: userImage,
      emailVerified: now,
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Test",
      slug: "test",
    },
  });

  const photo = await prisma.photo.create({
    data: {
      key: "seeded",
      url: mockedImage,
    },
  });

  const priceId = process.env.SEED_MOCKED_STRIPE_PRICE_ID!;
  const stripeProductId = process.env.SEED_MOCKED_STRIPE_PRODUCT_ID!;

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

  await prisma.chapter.create({
    data: {
      name: "Test",
      courseId: course.id,
    },
  });

  console.log("Database seeded successfully!");

  process.exit();
};

main();
