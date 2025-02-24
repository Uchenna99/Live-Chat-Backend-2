import express from "express"
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();
const userController = new UserController();


userRouter.post("/signup", userController.createUser);

userRouter.get("/getAllUsers", userController.getAllUsers);

userRouter.get("/getUser/:id", userController.getUser);


export default userRouter;