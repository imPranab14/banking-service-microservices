import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

async function generatedToken(emailId) {
  //Check Email
  const isEmail = await User.findOne({
    email: emailId,
  });
  //If email exits or not
  if (!isEmail) {
    return res.status(400).json({
      message: "email not exits",
    });
  }

  //Generated Token
  const token = jwt.sign({ emailId: emailId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}
export default generatedToken;
