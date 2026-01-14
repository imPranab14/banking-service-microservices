import z from "zod";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
//import channel from "../config/rabbimq.js"
import connectRabbitMQ from "../config/rabbimq.js";

//Register Handle
async function handelUserRegister(req, res) {
  //Zod Validation
  const data = RegisterSchema.safeParse(req?.body);
  try {
    if (!data.success) {
      return res
        .status(400)
        .send(new ApiError(400, "input field missing", data.error._zod.def));
    }
    const { name, email, password } = data.data;
    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    const saveData = await User.insertOne({
      name,
      email,
      password: hashPassword,
    });
    //rabbitmq
    const channel = await connectRabbitMQ();
    //queue name
    const queueName = "register_queue";
    const createQueue = await channel.assertQueue(queueName, {
      durable: true,
    });
    console.log("Register Queue Info", createQueue);

    //send to raddit mq
    await channel.sendToQueue(
      queueName,
      Buffer.from(
        JSON.stringify({
          name,
          email,
        })
      ),
      {
        persistent: true,
      }
    );

    //register api response
    res.status(201).json(
      new ApiResponse(201, "new user create successfully", {
        name: saveData.name,
        email: saveData.email,
      })
    );
  } catch (error) {
    console.log("Register Service Error", error);
    res.status(500).send(new ApiError(500, "Intrenal Server Error", error));
  }
}

//Login Handle
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
      res.status(400).json(new ApiResponse(400, "Password Not Valid"));

    //Generated Token
    const token = await generatedToken(email);
    //Redis Token EXpire in 1hour
    const tokenSaveRedis = await redisClient.setEx(
      `token-${email}`,
      60 * 60,
      token
    );
    if (tokenSaveRedis != "OK")
      res
        .status(500)
        .json(
          res
            .status(400)
            .json(new ApiResponse(400, "Failed to save token in redis client"))
        );
    //Set Cookies in header
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      secure: false, // use true in production (HTTPS)
    });

    //Login successfully json response
    res.status(200).send(
      new ApiResponse(200, "Login successfully", {
        name: isEmail?.name,
        email: isEmail?.email,
        accessToken: token,
        tokenType: "Bearer",
      })
    );
  } catch (error) {
    console.log("Login Service Error", error);
    res.status(500).send(new ApiError(500, "Internal Server Error", error));
  }
}

//Logout Logout
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
