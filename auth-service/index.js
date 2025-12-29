import express from "express";
import dotenv from "dotenv";
dotenv.config()
import redisClient from "./src/config/redis.js";
import mongodbConnection from "./src/config/mongodb.js";
import indexRouter from "./src/router/index.route.js";
import authRouter from "./src/router/auth.route.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded())


//MongoDb Connection Function
mongodbConnection()

//Import Router
app.use('/',indexRouter)
app.use('/',authRouter)


app.get("/register", async (req, res) => {
  const clientRes = await redisClient.ping();
  console.log("ping redis", clientRes);
  await redisClient.set("name", "pranab");
  const value = await redisClient.get("name");
  console.log("value", value);
  res.status(200).json({
    message: "response from auth service",
  });
});

app.listen(3001, () => {
  console.log("Auth service running on 3001");
});
