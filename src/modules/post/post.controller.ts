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

const getAllPost = async (req: Request, res: Response) => {
  try {
    const options = req.query;
    console.log(options);

    const result = await PostService.getAllPost(options);
    res.send({
      success: true,
      message: "Post Get SuccessFully",
      data: result.data,
      total: result.total,
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id, body);
  try {
    const result = await PostService.updatePost(Number(id), body);
    res.send({
      success: true,
      message: "Post Updated SuccessFully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await PostService.deletePost(Number(id));
    res.send({
      success: true,
      message: "Post Deleted SuccessFully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  insertInToDb,
  getAllPost,
  updatePost,
  deletePost,
};
