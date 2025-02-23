import { User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/createUser.dto";


export interface UserServices {
    createUser (data: CreateUserDTO): Promise<void>;
    getAllUsers (): Promise<User[]>
}