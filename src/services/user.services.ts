import { CreateUserDTO } from "../dtos/createUser.dto";


export interface UserServices {
    createUser (data: CreateUserDTO): Promise<void>;
}