import jwt from "jsonwebtoken";
import redisClient from "./redis.js";

 async function verifyToken(req, res, next) {
  //Get Token from url header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "invalid authorization header" });
  }
 

  try {
     //Verify Token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //Get Redis Token
    const getRedisToken= await redisClient.get(token)


    // console.log("getRedisToken",getRedisToken);
    // console.log("verifyJWTToken", decode);

    req.token=token
    req.emailId=decode?.emailId
    next();
  } catch (error) {
    console.log("Token verify error", error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export default verifyToken;
