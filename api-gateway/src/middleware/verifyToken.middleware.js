import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

async function verifyToken(req, res, next) {
  //public end ponit
  const publicRoutes = [
    "/health",
    "/api/v1/auth/login",
    "/api/v1/auth/register",
  ];
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  //Get Token from url header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send({ success: "false", message: "invalid authorization header" });
  }
  try {
    //Verify Token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    //Check token in redis
    const redisToken = await redisClient.get("token");

    //if token not in redis
    if (!redisToken) {
      return res.status(401).json({
        success: "false",
        message: "Token is revoked or expired",
      });
    }
    //Attach data to request header
    req.headers["x-user-email"] = decode.emailId;
    //req.headers["x-internal-token"]=process.env.INTERNAL_SERVICE_TOKEN
    next();
  } catch (error) {
    console.log("Token verify error", error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export default verifyToken;
