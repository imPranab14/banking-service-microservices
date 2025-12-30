import { Router } from "express";

import verifyToken from "../config/verifyToken.js";
import { handelCreateNewAccount } from "../controller/account.controller.js";


const accountRouter=Router()

accountRouter.post('/account',verifyToken,handelCreateNewAccount)
//accountRouter.post('/login',handelLoginUser)
//accountRouter.post('/logout',verifyToken,handelLogout)



export default accountRouter