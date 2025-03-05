import { ChatMessage } from "@prisma/client";
import { EditMessageDTO, MessageDTO } from "../dtos/message.dto";



export interface MessageServices {
    createMessage (data: MessageDTO): Promise<ChatMessage>;
    editMessage (data: EditMessageDTO): Promise<ChatMessage>;
    getMessages (room: string): Promise<ChatMessage[]>;
    deleteMessage (id: string): Promise<void>;
}