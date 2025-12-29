import { Router } from "express";
import { handelUserRegister } from "../controller/auth.controller.js";


const authRouter=Router()

authRouter.post('/register',handelUserRegister)



export default authRouter