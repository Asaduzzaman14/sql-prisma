import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertInToDb = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const result = await UserService.insertInToDb(req.body);
    res.send({
      success: true,
      message: "user created SuccessFully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const inserOrUpdate = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpate(req.body);
    res.send({
      success: true,
      message: "Profile created/update SuccessFully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.send({
      success: true,
      message: "All Users",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  insertInToDb,
  inserOrUpdate,
  getUsers,
};
