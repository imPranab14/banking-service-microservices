import express from "express";
import dotenv from "dotenv";
dotenv.config()
import redisClient from "./src/config/redis.js";
import mongodbConnection from "./src/config/mongodb.js";
import indexRouter from "./src/router/index.route.js";
import authRouter from "./src/router/auth.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import verifyGatewayToken from "./src/middleware/verifyAPIGateway.middleware.js";

const app = express();
// Increase body size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


//Verify Gateway Token
app.use(verifyGatewayToken)
//MongoDb Connection Function
mongodbConnection()

//Import Router
app.use('/',indexRouter)
app.use('/',authRouter)



const port =process.env.PORT 
app.listen(port, () => {
  console.log(`Auth service running on ${port}`);
});
