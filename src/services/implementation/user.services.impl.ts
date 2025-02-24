import { StatusCodes } from "http-status-codes";
import { db } from "../../config/db.config";
import { CreateUserDTO } from "../../dtos/createUser.dto";
import { CustomError } from "../../utils/customError.utils";
import { UserServices } from "../user.services";
import { generateOtp } from "../../utils/otp.utils";
import { hashPassword } from "../../utils/password.utils";
import { sendOtpEmail } from "../../otp/emailSetup";
import { ChatMessage, User } from "@prisma/client";



export class UserServicesImpl implements UserServices {
    async createUser(data: CreateUserDTO): Promise<void> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if(findUser) {
            throw new CustomError(StatusCodes.CONFLICT, "Sorry, this email is already taken");
        }
        const newUser = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: await hashPassword(data.password)
            }
        });
        
        const otp = generateOtp();
        const hashedOtp = await hashPassword(otp);
        await sendOtpEmail({
            to: data.email,
            subject: "Verify your email",
            otp: otp,
        });
        await db.user.update({
            where: {email: data.email},
            data: {
                otp: hashedOtp,
                otpExpiry: this.generateOtpExpiration()
            }
        });
    }
    
    
    async getAllUsers(): Promise<User[]> {
        const allUsers = await db.user.findMany();
        return allUsers;
    }


    async getUser(id: string): Promise<User> {
        const user = await db.user.findUnique({
            where: {id}
        });
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }
    
    
    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    };
    
}