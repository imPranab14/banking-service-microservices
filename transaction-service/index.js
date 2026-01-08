import express from "express";
import dotenv from "dotenv";
dotenv.config()
import redisClient from "./src/config/redis.js";
import indexRouter from "./src/router/index.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import verifyGatewayToken from "./src/middleware/verifyGatewayToken.js";
import connectRabbitMQ from "./src/config/rabbitmq.js";
import redisConnect from "./src/config/redis.js";
import logger from "./src/config/logger.js";
import transactionRouter from "./src/router/transaction.route.js";
import connectMSSQL from "./src/config/mssql.js";

const app = express();
// Increase body size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


//RabbitMQ connection
connectRabbitMQ()

//Redis Connection
redisConnect()

//Verify Internal Gateway Token
app.use(verifyGatewayToken)

//MSSQL Connected
connectMSSQL()


//Import All Router
//Index Router
app.use('/',indexRouter)
//Transaction Router
app.use('/',transactionRouter)

app.get('/test',(req,res)=>{
  res.send({
    message:"test route is running"
  })
})



const port=process.env.PORT || 3003
app.listen(port, () => {
  logger.info(`Transation service running on ${port}`)
});
