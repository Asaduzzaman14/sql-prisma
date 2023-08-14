import { Request, Response } from "express";
import { PostService } from "./post.service";

const insertInToDb = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const result = await PostService.insertInToDb(req.body);
    res.send({
      success: true,
      message: "Post created SuccessFully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  insertInToDb,
};
