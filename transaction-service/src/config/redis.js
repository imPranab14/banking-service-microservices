import { createClient } from "redis";
import logger from "./logger.js";



const redisClient=  createClient({ url: "redis://localhost:6379" });


const redisConnect = async () => {
  try {
    await redisClient.connect();
    logger.info("Redis Connected !")
  } catch (error) {
    console.log("Redis connection error", error);
  }
};
//redisConnect();

export default redisConnect