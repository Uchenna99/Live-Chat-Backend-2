import { IsString } from "class-validator";


export class MessageDTO {
    @IsString()
    userId!: string;

    @IsString()
    name!: string;

    @IsString()
    message!: string;
}