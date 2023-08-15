import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertInToDb = async (data: User) => {
  const result = await prisma.user.create({
    data: data,
  });

  return result;
};

const insertOrUpate = async (data: Profile) => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }
  const result = await prisma.profile.create({
    data: data,
  });
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.$queryRaw`select * from users`;

  return result;
};

// const getAllUsers = async () => {
//   const result = await prisma.user.findMany({
//     // select: {
//     //   email: true,
//     //   name:true
//     // },
//     include: {
//       profile: true,
//     },
//   });
//   return result;
// };

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  });
  return result;
};

export const UserService = {
  insertInToDb,
  insertOrUpate,
  getAllUsers,
  getUserById,
};
