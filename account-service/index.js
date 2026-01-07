import express from "express";
import dotenv from "dotenv";
dotenv.config()
import redisClient from "./src/config/redis.js";
import mongodbConnection from "./src/config/mongodb.js";
import indexRouter from "./src/router/index.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import accountRouter from "./src/router/accont.route.js";
import verifyGatewayToken from "./src/middleware/verifyGatewayToken.js";
import connectRabbitMQ from "./src/config/rabbitmq.js";
import registerConsumer from "./src/utils/registerConsumer.js";

const app = express();
// Increase body size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//MongoDb Connection Function
mongodbConnection()
//rabbit mq connection
connectRabbitMQ()
//Verify Internal Gateway Token
app.use(verifyGatewayToken)

//Register consumer
registerConsumer()

//Import Router
app.use('/',indexRouter)
app.use('/',accountRouter)

app.get('/test',(req,res)=>{
  res.send({
    message:"test route is running"
  })
})



const port=process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Account service running on ${port}`);
});
