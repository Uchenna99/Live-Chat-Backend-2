import { ChatMessage } from "@prisma/client";
import { MessageDTO, EditMessageDTO } from "../../dtos/message.dto";
import { MessageServices } from "../message.services";
import { db } from "../../config/db.config";



export class MessageServicesImpl implements MessageServices {

    async createMessage(data: MessageDTO): Promise<ChatMessage> {
        const newMessage = await db.chatMessage.create({ data, include: {user: true} });
        return newMessage;
    }


    async editMessage(data: EditMessageDTO): Promise<ChatMessage> {
        const findMessage = await db.chatMessage.findUnique({
            where: {id: data.messageId}
        });
        if(!findMessage) {
            throw new Error("Message not found");
        }
        const editedMessage = await db.chatMessage.update({
            where: {id: findMessage.id},
            data: {text: data.text},
            include: {user: true}
        });
        return editedMessage;
    }

    
    async getMessages(room: string): Promise<ChatMessage[]> {
        const messages = await db.chatMessage.findMany({
            where: {room},
            include: {user: true}
        });
        return messages;
    }

}