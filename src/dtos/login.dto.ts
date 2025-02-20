import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";



export class LoginDTO {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 25)
    password!: string;
}