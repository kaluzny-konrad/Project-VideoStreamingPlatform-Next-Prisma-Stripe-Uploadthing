// import { PrismaClient } from "@prisma/client";
// import { createSeedClient } from "@snaplet/seed";

// const prisma = new PrismaClient();

// const seed = async () => {
//   try {
//     const seed = await createSeedClient();

//     await seed.$resetDatabase(); // eslint-disable-line

//     const userId = process.env.SEED_INITIAL_USER_ID;
//     const userName = process.env.SEED_INITIAL_USER_NAME;
//     const userEmail = process.env.SEED_INITIAL_USER_EMAIL;
//     const userUserName = process.env.SEED_INITIAL_USER_USERNAME;
//     const userImage = process.env.SEED_INITIAL_USER_IMAGE;
//     const now = new Date();

//     await prisma.user.create({
//       data: {
//         id: userId,
//         name: userName,
//         email: userEmail,
//         username: userUserName,
//         image: userImage,
//         emailVerified: now,
//       },
//     });

//     console.log("Database reseted successfully!");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//     process.exit();
//   }
// };

// seed();
