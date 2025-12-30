import mongoose from "mongoose";


const mongodbConnection = async() => {
  console.log("process.env.MONOGO_DB_URL",process.env.MONOGO_DB_URL);
  try {
    const connect = await mongoose.connect(`${process.env.MONOGO_DB_URL}/${process.env.MONOGO_DB_NAME}`);
    console.log(`MongoDB Connected !! [${connect.connection.host}] [${connect.connection.name}]`);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};


export default mongodbConnection