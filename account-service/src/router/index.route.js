import express, { json, Router } from "express"


const indexRouter =Router()

indexRouter.get('/health',(req,res)=>{
    res.status(200).json({
        "message":"account service is running"
    })
})

export  default indexRouter;