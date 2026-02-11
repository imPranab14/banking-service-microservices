import z from "zod";
import bcrypt from "bcrypt";
import generatedToken from "../config/generatedToken.js";
import redisClient from "../config/redis.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import account from "../model/account.model.js";
import generatedAccountNumber from "../config/uniqueAccountNumber.js";
import { de } from "zod/v4/locales";

// create a new bank account
async function handelCreateNewAccount(req, res) {
  const { accountType } = req?.body;
  //console.log("req.headers",req.headers);
  //get user form req header
  const userEmail = req.headers["x-user-email"];

  //check account exits or not
  try {
    const findUser = await account.findOne({
      email: userEmail,
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
      email: userEmail,
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

//list of bank account
async function handelListOfAccount(req, res) {
  //get user form req header
  const userEmail = req.headers["x-user-email"];
  //check account exits or not
  try {
    const findUser = await account.find({
      email: userEmail,
    });
    if (findUser) {
      return res.status(200).json({
        message: `list of account`,
        data: findUser,
      });
    } else {
      return res.status(200).json({
        message: `no account present `,
      });
    }
  } catch (error) {
    console.error("list of account error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

//delete user bank account
async function handelDeleteBankAccount(req, res) {
  const accountNumder = req.query?.accountNumber;
  //if account number not enter
  if (!accountNumder)
    res.status(400).json({ message: "Account number is required" });

  //account not exists in database
  const findAccount = await account.findOne({
    accountNumber: accountNumder,
  });
  if (!findAccount)
    res.status(400).json({ message: "Account not exists in db" });

  //Delete form database
  const deleteAccountNumber = await account.deleteOne({
    accountNumber: accountNumder,
  });

  //Api Response
  res.status(200).send({
    message: "Account deleted successfully",
    data: deleteAccountNumber,
  });
}

//Internal transaction
async function handelTransaction(req, res) {
  const { accountNumber, amount, type } = req?.body;

  //if input fields is missing
  if (!accountNumber || !amount || !type)
    res.status(400).json({ message: "Required input fields are missing" });

  const convertIntoTwoDecimal = amount.toFixed(0);

  console.log("convertIntoTwoDecimal", convertIntoTwoDecimal);
  //db call
  try {
    //Check the account number
    const accountDetails = await account.findOne({
      accountNumber: accountNumber,
    });
    if (!accountDetails) res.send({ message: "not a valid account number" });

    //debit balance
    if (type.toLowerCase() === "debit") {
      console.log(
        "accountDetails.balance > convertIntoTwoDecimal",
        accountDetails.balance >= convertIntoTwoDecimal,
        accountDetails.balance,
        convertIntoTwoDecimal,
      );
      if (accountDetails.balance > convertIntoTwoDecimal) {
        //if balence is zero
        const debitAmount = await account.findOneAndUpdate(
          { accountNumber: accountNumber },
          { $inc: { balance: -convertIntoTwoDecimal } },
          { new: true },
        );
        return res.status(200).json({
          message: "amount debit successfully",
          data: {
            account: accountNumber,
            balance: debitAmount,
          },
        });
      } else {
        res.send({
          message: "insufficient balance",
        });
      }
    }
    //credit balance
    else if (type.toLowerCase() === "credit") {
      const creditAmount = await account.findOneAndUpdate(
        { accountNumber: accountNumber },
        { $inc: { balance: convertIntoTwoDecimal } },
        { new: true },
      );

      return res.status(200).json({
        message: "amount credit successfully",
        data: creditAmount,
      });
    } else {
      return res.status(200).json({
        message: "acconut typr error",
      });
    }
  } catch (error) {
    console.error("transaction failed:", error);
    return res.status(500).json({
      message: "transaction failed",
    });
  }
}

//Account validation check
async function handelAccountNumberCheck(req, res) {
  console.log("Valid_Account_Number--");
  const { accountNumber } = req?.query;

  try {
    //Check DB
    const checkAccountNumber = await account.findOne({
      accountNumber: accountNumber,
    });
    //if account not exist
    if (!checkAccountNumber) {
      return res.status(404).send({
        message: "account not found",
      });
    }

    //Custom 5 seconde delay
    new Promise((resolve, reject) => {
      setTimeout(() => {
        res.status(200).send({
          status: checkAccountNumber?.accountStatus,
          email: checkAccountNumber?.email,
        });
        resolve();
      }, 5 * 1000);
    });

    // res.status(200).send({
    //   status:checkAccountNumber?.accountStatus,
    //   email:checkAccountNumber?.email
    // })
  } catch (error) {
    console.log("Account number find error", error);
    res.status(500).send({
      message: "Failed find account number ",
    });
  }
}

//Slow Response
async function handelSlowResponse(req, res) {
  //Check the account number
  try {
    const accountDetails = await account.findOne({
      accountNumber: 172026178013987,
    });
    //5 sec delay response
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(res.status(200).send(accountDetails));
      }, 5 * 1000);
    });
  } catch (error) {
    console.log("Slow api error", error);
  }
}
export {
  handelCreateNewAccount,
  handelListOfAccount,
  handelDeleteBankAccount,
  handelTransaction,
  handelAccountNumberCheck,
  handelSlowResponse,
};
