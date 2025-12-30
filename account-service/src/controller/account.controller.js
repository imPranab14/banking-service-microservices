import z from "zod";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import account from "../model/account.model.js";
import generatedAccountNumber from "../config/uniqueAccountNumber.js";

// create a new account
async function handelCreateNewAccount(req, res) {
  const { accountType } = req?.body;

  //check account exits or not
  try {
    const findUser = await account.findOne({
      email: req.emailId,
      accountType: accountType,
    });
    if (findUser) {
      return res.status(400).json({
        message: `${accountType} account already present`,
        data: findUser,
      });
    }
    //create a account payload
    const createAccountPayload = {
      email: req.emailId,
      accountNumber: generatedAccountNumber(accountType),
      accountType: accountType,
      accountStatus: "active",
      balance: 0,
      currency: "INR",
    };
    
    //Save database
    const savedAccount = await account.insertOne(createAccountPayload);

    //Api Response
    res.status(201).json({
      message: "create a new bank account",
      date: savedAccount,
      statusCode: 201,
    });
  } catch (error) {
    console.error("Create account error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export { handelCreateNewAccount };
