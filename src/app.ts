import express, { Application } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON data

app.use("/api/v1/user", UserRoutes);

export default app;
