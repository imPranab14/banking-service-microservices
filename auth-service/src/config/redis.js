import { createClient } from "redis";



const redisClient=  createClient({ url: "redis://localhost:6379" });
console.log("redisClient",redisClient);

const redisConnect = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log("Redis connection error", error);
  }
};
redisConnect();

export default redisClient