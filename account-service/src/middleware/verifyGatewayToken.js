function verifyGatewayToken(req, res, next) {
  const token = req.headers["x-internal-token"];
  if (!token) {
    return res.status(403).send({ message: "Forbidden – Missing gateway token" });
  }

  if (token != process.env.INTERNAL_SERVICE_TOKEN) {
    return res
      .status(403)
      .send({ message: "Forbidden – Internal access only" });
  }
  next();
}

export default verifyGatewayToken;
