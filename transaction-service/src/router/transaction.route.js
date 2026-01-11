import { Router } from "express"
import { handelTransaction, handelTransfer } from "../controller/transaction.controller.js";


const transactionRouter =Router()

transactionRouter.post('/transfer',handelTransfer)
transactionRouter.get('/:transactionId',handelTransaction)

export  default transactionRouter;