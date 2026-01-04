import jwt from "jsonwebtoken";

function internalToken(tergetService) {
  const jwtToken = jwt.sign(
    //JWT Paylode
    {
      issuer: process.env.INTERNAL_JWT_ISSUER,
      sub: "gateway",
      serviceName: tergetService,
      scope: ["internal"],
    },
    //JWT Secret
    process.env.GATEWAY_JWT_SECRET,
    { expiresIn: '30m' }
  );
  return jwtToken;
}

export default internalToken;
