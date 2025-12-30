import express, { json, Router } from "express"


const indexRouter =Router()

indexRouter.get('/health',(req,res)=>{
    console.log("req auth health endpoint");
    res.status(200).json({
        "message":"account service is running"
    })
})

export  default indexRouter;