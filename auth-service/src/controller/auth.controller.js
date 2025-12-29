import z from "zod";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

async function handelUserRegister(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    res.status(400).json({ message: "input field missing" });

  //Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  const userPayload = await User.insertOne({
    name,
    email,
    password: hashPassword,
  });

  //Api Response
  res.status(201).json({
    message: "new user create successfully",
    user: {
      name: userPayload.name,
      email: userPayload.email,
    },
    statusCode: 201,
  });
}

export { handelUserRegister };
