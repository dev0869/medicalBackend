import { Router } from "express";
import { loginController, Verify,logout, registerController, generateAccessToken, generatecookie } from "../controllers/auth.controllers.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
export const authRoute = Router();

authRoute.post("/user/register", registerController);
authRoute.post("/user/login", loginController);
authRoute.post("/user/logout",verifyJwt, logout);
authRoute.post("/user/Verify",verifyJwt, Verify);
authRoute.post("/user/refreshAccessToken",verifyJwt, generateAccessToken);
authRoute.post("/user/cookie", generatecookie);






