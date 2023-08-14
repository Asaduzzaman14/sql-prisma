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

const getAllPost = async (options: any): Promise<Post[]> => {
  const { sortBy, sortOrder, searchTerm } = options;

  const result = await prisma.post.findMany({
    include: {
      author: true,
      catagory: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });

  return result;
};

export const PostService = {
  insertInToDb,
  getAllPost,
};
