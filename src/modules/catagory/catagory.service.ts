import { Catagory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertInToDb = async (data: Catagory): Promise<Catagory> => {
  const result = await prisma.catagory.create({
    data,
  });

  return result;
};

export const CatagoryService = {
  insertInToDb,
};
