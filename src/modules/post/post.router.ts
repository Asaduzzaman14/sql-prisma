import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.patch("/update-post/:id", PostController.updatePost);

router.delete("/delete-post/:id", PostController.deletePost);

router.post("/create-post", PostController.insertInToDb);

router.get("/get-post", PostController.getAllPost);

export const PostRoutes = router;
