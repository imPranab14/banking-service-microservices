import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  email: {
    type: "String",
  },
  password: {
    //type: "Sting",
  },
});

const User = mongoose.model("Usre", userSchema);
export { User };
