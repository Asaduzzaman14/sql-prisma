import express from "express";
import { CatagoryController } from "./catagory.controller";

const router = express.Router();

router.post("/create-catagory", CatagoryController.insertInToDb);

export const CatagoryRouter = router;
