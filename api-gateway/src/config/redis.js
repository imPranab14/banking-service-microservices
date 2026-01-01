import { createClient } from "redis";
import logger from "./logger.js";

const redisClient=  createClient({ url: process.env.REDIS_URL });
const redisConnect = async () => {
  try {
    await redisClient.connect();
    logger.info("Redis Connected")
  } catch (error) {
    console.log("Redis connection error", error);
  }
};
redisConnect();

export default redisClient