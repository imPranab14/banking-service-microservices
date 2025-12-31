import { Router } from "express";

import verifyToken from "../config/verifyToken.js";
import {
  handelCreateNewAccount,
  handelDeleteBankAccount,
  handelListOfAccount,
  handelTransaction,
} from "../controller/account.controller.js";

const accountRouter = Router();

accountRouter.post("/account", verifyToken, handelCreateNewAccount);
accountRouter.get("/list", verifyToken, handelListOfAccount);
accountRouter.delete("/deleteAccount", verifyToken, handelDeleteBankAccount);

//intrenal transaction 
accountRouter.post('/internal/transaction',verifyToken,handelTransaction)

export default accountRouter;
