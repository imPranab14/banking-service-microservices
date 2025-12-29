import z from "zod";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";


//Register Handeler
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


//Login Handeler
async function handelLoginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400), json({ message: "input field missing" });

  //Check Email
  const isEmail = await User.findOne({
    email: email,
  });

  //If email exits or not
  if (!isEmail) {
    return res.status(400).json({
      message: "email not exits",
    });
  }

  //Compare password
  const comparePassword = await bcrypt.compare(password, isEmail.password);

  //Valid password or not
  if (!comparePassword) res.status(400).json({ message: "Password not valid" });

  //Generated Token
  const token = await generatedToken(email);
  const tokenSaveRedis = await redisClient.setEx("token", 60 * 60, token);
  
//   const cookieParser= await cookieParser.signedCookie("sdfhsd","sdfsdf")
//   console.log("cookieParser",cookieParser);

  res.send({
    message: "ok",
    token,
  });
}

export { handelUserRegister, handelLoginUser };
