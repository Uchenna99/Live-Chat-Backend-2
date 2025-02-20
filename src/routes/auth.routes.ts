import express from "express"
import { AuthController } from "../controllers/auth.controller";


const authRouter = express.Router();
const authController = new AuthController();


authRouter.post("/verifyEmail", authController.verifyOtp);

authRouter.post("/login", authController.loginUser);


export default authRouter;