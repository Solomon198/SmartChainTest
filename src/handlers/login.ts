import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../schema/userSchema";
import jsonwebtoken from "jsonwebtoken";
import env from "../utils/env";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const credential = await User.findOne({ email });

  if (!credential) {
    return res.status(400).json({ message: "Invalid Credential" });
  }

  const isPasswordValid = bcrypt.compareSync(password, credential?.hash!);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Credential" });
  }
  console.log(credential._id, "ID for logout");

  const token = jsonwebtoken.sign({ id: credential?._id }, env.PASSKEY, {
    expiresIn: "1h",
  });

  credential.loginToken = token;
  await credential.save();

  return res.status(200).json({ accessKey: token });
};
