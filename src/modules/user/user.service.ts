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
  const result = await prisma.user.findMany({});
  return result;
};

export const UserService = {
  insertInToDb,
  insertOrUpate,
  getAllUsers,
};
