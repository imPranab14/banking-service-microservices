import express from "express"


const app=express()
app.get('/register',(req,res)=>{
    res.status(200).json({
        message:"response from auth service"
    })
})



app.listen(3001,()=>{
    console.log("auth service running on 3001");
})