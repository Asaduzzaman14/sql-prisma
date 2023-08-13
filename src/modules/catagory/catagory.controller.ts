import { Request, Response } from "express";
import { CatagoryService } from "./catagory.service";

const insertInToDb = async (req: Request, res: Response) => {
  try {
    const result = await CatagoryService.insertInToDb(req.body);
    res.send({
      success: true,
      message: "Catagory Added",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CatagoryController = {
  insertInToDb,
};
