import { Router } from "express";
import { handelLoginUser, handelLogout, handelUserRegister } from "../controller/auth.controller.js";
import verifyToken from "../config/verifyToken.js";


const authRouter=Router()

authRouter.post('/register',handelUserRegister)
authRouter.post('/login',handelLoginUser)
authRouter.post('/logout',verifyToken,handelLogout)



export default authRouter