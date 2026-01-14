import jwt from "jsonwebtoken";

function verifyGatewayToken(req, res, next) {
 console.log("Gateway Token",req.headers); 
  const token = req.headers["jwt-internal-token"];
  if (!token) {
    return res
      .status(403)
      .send({ message: "Forbidden – Missing Gateway Token" });
  }
   //Verify JWT Token
  try {
    const decode = jwt.verify(token, process.env.GATEWAY_JWT_SECRET);
    //if token valid
    if (
      decode.issuer.toLowerCase() === "api_gateway" &&
      decode.serviceName.toLowerCase() === "auth service"
    ) {
      next();
    }
    //invalid token
    else {
      res.status(403).send({
        message: "Api Gateway token verification failed",
      });
    }
  } catch (error) {
    console.error("Internal JWT verification failed:", error);
    res.status(403).send({
      message: "Forbidden -Internal JWT verification failed",
    });
  }
}

export default verifyGatewayToken;
