import { Router } from "express";

import {
  handelCreateNewAccount,
  handelDeleteBankAccount,
  handelListOfAccount,
  handelTransaction,
} from "../controller/account.controller.js";

const accountRouter = Router();

accountRouter.post("/account",handelCreateNewAccount);
accountRouter.get("/list",handelListOfAccount);
accountRouter.delete("/deleteAccount",handelDeleteBankAccount);

//intrenal transaction 
accountRouter.post('/internal/transaction',handelTransaction)

export default accountRouter;
