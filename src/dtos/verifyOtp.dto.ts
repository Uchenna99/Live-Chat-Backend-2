import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class VerifyOtpDTO {

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    otp!: string;
}