import express from "express"
import { MessageController } from "../controllers/message.controller";


const messageRouter = express.Router();
const messageController = new MessageController();


messageRouter.post("/newMessage", messageController.createMessage);

messageRouter.post("/editMessage", messageController.editMessage);

messageRouter.get("/getMessages/:room", messageController.getMessages);

messageRouter.delete("/delete/:id", messageController.deleteMessage);


export default messageRouter;