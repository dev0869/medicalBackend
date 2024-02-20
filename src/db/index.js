import mongoose from "mongoose";
import env from "dotenv"
env.config();
const connectDb = async () => {
  try {
    await mongoose.connect(
     process.env.MONGODB_URL
    );
    console.log("Mongodb Connected");
  } catch (error) {
console.log(error);  }
}

export default connectDb;
