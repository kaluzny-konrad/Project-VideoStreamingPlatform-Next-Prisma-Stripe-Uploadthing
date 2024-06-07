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

  const userId = process.env.SEED_INITIAL_USER_ID;
  const userName = process.env.SEED_INITIAL_USER_NAME;
  const userEmail = process.env.SEED_INITIAL_USER_EMAIL;
  const userUserName = process.env.SEED_INITIAL_USER_USERNAME;
  const userImage = process.env.SEED_INITIAL_USER_IMAGE;
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

  // await seed.category((x) => x(1));
  // await seed.course((x) => x(2));

  console.log("Database seeded successfully!");

  process.exit();
};

main();
