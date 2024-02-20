import mongoose from "mongoose";
import env from "dotenv"
import { ApiError } from "../utils/apiError.js";
env.config();
const connectDb = async () => {
  try {
    await mongoose.connect(
     process.env.MONGODB_URL
    );
    console.log("Mongodb Connected");
  } catch (error) {
    throw new ApiError(500,'Failed to Connect Db',error);
  }
}

export default connectDb;
