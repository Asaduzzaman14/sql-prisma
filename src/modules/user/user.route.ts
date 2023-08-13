import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.insertInToDb);
router.post("/create-profile", UserController.inserOrUpdate);
router.get("/all-users", UserController.getUsers);
router.get("/:id", UserController.getUser);

export const UserRoutes = router;
