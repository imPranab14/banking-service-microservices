import express from "express";
import cors from "cors";
import helmet from "helmet"
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(helmet())
app.use(cors())


const port =process.env.PORT || 3000

app.get('/health',(req,res)=>{
    res.json({
        massage:"ok"
    })
})

app.listen(port,()=>{
    console.log(`Server running ${port}`)
})