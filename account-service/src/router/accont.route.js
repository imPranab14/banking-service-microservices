import { Router } from "express";

import {
  handelAccountNumberCheck,
  handelCreateNewAccount,
  handelDeleteBankAccount,
  handelListOfAccount,
  handelTransaction,
  handelSlowResponse
} from "../controller/account.controller.js";

const accountRouter = Router();

accountRouter.post("/account",handelCreateNewAccount);
accountRouter.get("/list",handelListOfAccount);
accountRouter.delete("/deleteAccount",handelDeleteBankAccount);

//Check Valid Account 
accountRouter.get('/validation',handelAccountNumberCheck)

//Internal transaction 
accountRouter.post('/internal/transaction',handelTransaction)

//NOTE SLOW API 
 accountRouter.get("/slow",handelSlowResponse);

export default accountRouter;
