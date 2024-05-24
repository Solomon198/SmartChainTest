import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../schema/userSchema";
import jsonwebtoken from "jsonwebtoken";
import env from "../utils/env";

export const signupHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const user = new User({
    hash,
    email,
  });

  const token = jsonwebtoken.sign({ id: user?._id }, env.PASSKEY, {
    expiresIn: "1h",
  });

  user.loginToken = token;

  await user.save();
  return res.status(201).json({ accessKey: token });
};
