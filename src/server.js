import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import logger from "./config/logger.js";
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 3000;

//Request logging
app.use((req,res,next)=>{
    logger.debug(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
})


//Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({status: "ok",});
});

app.listen(port, () => {
  console.log(`Server running ${port}`);
});
