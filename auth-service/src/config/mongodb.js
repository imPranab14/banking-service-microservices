import mongoose from "mongoose";


const mongodbConnection = async() => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`);
    console.log(`MongoDB Connected !! [${connect.connection.host}] [${connect.connection.name}]`);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};


export default mongodbConnection