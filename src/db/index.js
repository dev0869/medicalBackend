import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import env from "dotenv";
env.config();
const connectDb = asyncHandler(async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb Connected");
    next();
  } catch (error) {
    console.log(error);
  }
});

export default connectDb;
