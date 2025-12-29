import { Router } from "express";
import { handelLoginUser, handelUserRegister } from "../controller/auth.controller.js";


const authRouter=Router()

authRouter.post('/register',handelUserRegister)
authRouter.post('/login',handelLoginUser)



export default authRouter