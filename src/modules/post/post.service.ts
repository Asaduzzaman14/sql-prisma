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

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;
  console.log(take);

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
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
    const total = await tx.post.count();

    return { data: result, total };
  });
};

// const updatePost = async (id: number, partial: Post): Promise<Post> => {
//   const result = prisma.post.update({
//     where: {
//       id,
//     },
//     data: partial,
//   });

//   return result;
// };

const updatePost = async (
  id: number,
  paylode: Partial<Post>
): Promise<Post | number> => {
  const result =
    await prisma.$executeRaw` update posts set title= ${paylode.title} where id=${id} `;

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = prisma.post.delete({
    where: { id },
  });

  return result;
};

const learnAggregate = async () => {
  const result = prisma.post.aggregate({
    _avg: {
      authorId: true,
      catagoryId: true,
    },
    _count: {
      authorId: true,
    },
    _sum: {
      authorId: true,
    },
  });

  const groupResult = prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });

  return result;
};

export const PostService = {
  insertInToDb,
  getAllPost,
  updatePost,
  deletePost,
};
