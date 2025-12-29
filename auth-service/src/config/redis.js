import { createClient } from "redis";



const redisClient=  createClient({ url: "redis://localhost:6379" });


const redisConnect = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.log("Redis connection error", error);
  }
};
redisConnect();

export default redisClient