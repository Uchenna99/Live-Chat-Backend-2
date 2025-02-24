import { IsNotEmpty, IsString } from "class-validator";


export class MessageDTO {
    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsString()
    text!: string;

}


export class EditMessageDTO {
    @IsNotEmpty()
    @IsString()
    messageId!: string;

    @IsNotEmpty()
    @IsString()
    text!: string;

}