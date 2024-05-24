import { Request, Response } from "express";
import User from "../schema/userSchema";

export const logoutHandler = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user?.loginToken) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  user.loginToken = "";
  await user.save();
  return res.status(200).json({});
};
