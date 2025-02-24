import { ChatMessage, User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/createUser.dto";


export interface UserServices {
    createUser (data: CreateUserDTO): Promise<void>;
    getUser (id: string): Promise<User>
    getAllUsers (): Promise<User[]>
}