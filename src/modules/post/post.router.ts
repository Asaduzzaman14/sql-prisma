import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.insertInToDb);

router.get("/get-post", PostController.getAllPost);

export const PostRoutes = router;
