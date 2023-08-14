import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertInToDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: data,
    include: {
      author: true,
      catagory: true,
    },
  });

  return result;
};

export const PostService = {
  insertInToDb,
};
