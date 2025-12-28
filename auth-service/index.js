import express from "express";
import redisClient from "./src/config/redis.js";
import mongodbConnection from "./src/config/mongodb.js";


const app = express();


//MongoDb Connection Function
mongodbConnection()


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
  console.log("auth service running on 3001");
});
