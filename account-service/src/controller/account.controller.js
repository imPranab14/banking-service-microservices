import z from "zod";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";

// create a new account 
async function handelCreateNewAccount(req, res) {
  console.log(req.body);

  const emailId=req.emailId

  console.log("emailId",emailId);
  


  //Api Response
  res.status(201).json({
    message: "create a new bank account",
    statusCode: 201,
  });
}




export { handelCreateNewAccount };
