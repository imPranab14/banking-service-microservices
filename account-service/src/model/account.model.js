import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  id: {
    type: "number",
  },
  accountNumber: {
    type: "number",
    min: 15,
    max: 15,
    required: true,
  },
  accountType: {
    type: "number",
  },
  accountStatus: {
    type: "string",
  },
  balance: {
    type: "number",
  },
  currrency: {
    type: "string",
  },
});

const account = mongoose.model("Account", accountSchema);

export default account;
