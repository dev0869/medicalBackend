
import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { authRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import os from "node:os";
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
app.use(cookieParser());
app.use("/api", authRoute);

connectDb()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is litening on http://localhost:${port}  /`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
