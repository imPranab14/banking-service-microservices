import { Router } from "express"
import { handelTransaction, handelTransfer,handelAllTransaction } from "../controller/transaction.controller.js";


const transactionRouter =Router()

transactionRouter.post('/transfer',handelTransfer)
transactionRouter.get('/list-transaction',handelAllTransaction)


//transactionRouter.get('/:transactionId',handelTransaction)


export  default transactionRouter;