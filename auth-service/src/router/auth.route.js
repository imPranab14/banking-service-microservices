import { Router } from "express";
import { handelLoginUser, handelLogout, handelUserRegister } from "../controller/auth.controller.js";



const authRouter=Router()

authRouter.post('/register',handelUserRegister)
authRouter.post('/login',handelLoginUser)
authRouter.post('/logout',handelLogout)



export default authRouter