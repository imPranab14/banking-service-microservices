import { Router } from "express"
import { handelTransfer } from "../controller/transaction.controller.js";


const transactionRouter =Router()

transactionRouter.post('/transfer',handelTransfer)

export  default transactionRouter;