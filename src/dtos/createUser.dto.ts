import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
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