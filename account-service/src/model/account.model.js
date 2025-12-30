import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    // id: {
    //   type: Number,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["savings", "current"],
      default: "savings",
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  { timeseries: true }
);

const account = mongoose.model("Account", accountSchema);

export default account;
