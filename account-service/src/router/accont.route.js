import { Router } from "express";

import verifyToken from "../config/verifyToken.js";
import { handelCreateNewAccount, handelListOfAccount } from "../controller/account.controller.js";


const accountRouter=Router()

accountRouter.post('/account',verifyToken,handelCreateNewAccount)
accountRouter.get('/list',verifyToken,handelListOfAccount)
//accountRouter.post('/logout',verifyToken,handelLogout)



export default accountRouter