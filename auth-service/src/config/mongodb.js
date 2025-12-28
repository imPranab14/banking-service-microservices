import mongoose from "mongoose";


const mongodbConnection = async() => {
  try {
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/local");
    console.log(`\n MongoDB Connected !! ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};


export default mongodbConnection