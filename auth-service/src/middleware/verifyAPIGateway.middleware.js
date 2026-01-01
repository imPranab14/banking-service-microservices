function verifyGatewayToken(req, res, next) {
  const token = req.headers;
  console.log("internal_token",token);
  if (!token){
    return res.status(403).send({ message: "not token" });
  }
  if (token != process.env.INTERNAL_SERVICE_TOKEN){
    return  res.status(403).send({ message: "Forbidden – Internal access only" });
  }
   
  next();
}
export default verifyGatewayToken;
