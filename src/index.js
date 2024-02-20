import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { authRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(connectDb);
app.use(cookieParser());
app.use("/api", authRoute);

app.listen(port, () => {
  console.log(`Server is litening on http://localhost:${port}  /`);
});
