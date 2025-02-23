import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 25)
    password!: string;
}


export interface WS_User {
    socketId: string;
    user: JWT_User;
}

export interface JWT_User {
    id: string;
    name: string;
    role: Role;
    iat: number;
}
  