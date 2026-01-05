import z from "zod";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";
import { LoginSchema } from "../schema/auth.schema.js";
import { ApiError } from "../util/ApiError.js";

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
  //Zod Validation
  const data = LoginSchema.safeParse(req.body);
  try {
    if (!data.success) {
      res
        .status(400)
        .send(new ApiError(400, "Validation error", data?.error._zod.def));
    }
    const { email, password } = data?.data;
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
    if (!comparePassword)
      res.status(400).json({ message: "Password not valid" });

    //Generated Token
    const token = await generatedToken(email);
    //Redis Token Expiers in 1hour
    const tokenSaveRedis = await redisClient.setEx(
      `token-${email}`,
      60 * 60,
      token
    );

    if (tokenSaveRedis != "OK")
      res.status(500).json({ message: "Failed to save token in redis client" });

    //Set Cookies in header
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      secure: true, // use true in production (HTTPS)
    });

    res.send({
      success: true,
      message: "Login successfully",
      data: {
        name: isEmail?.name,
        email: isEmail?.email,
        accessToken: token,
        tokenType: "Bearer",
      },
      status: 200,
    });
  } catch (error) {
    console.log("Login Service Error", error);
    res.status(500).send(new ApiError(500, "Intrenal Server Error", error));
  }
}

//Logout Handeler
async function handelLogout(req, res) {
  //Delete form redis
  //After successfully delete redis return 1

  const deleteRedis = await redisClient.del(
    `token-${req.headers["x-user-email"]}`
  );
  console.log("deleteRedis", !deleteRedis);
  if (!deleteRedis) {
    return res.status(500).send({
      message: "Logout completed with warnings",
      details: "Failed to delete token from Redis",
    });
  }
  //Delete form cookies
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
}

export { handelUserRegister, handelLoginUser, handelLogout };
