import { StatusCodes } from "http-status-codes";
import { db } from "../../config/db.config";
import { LoginDTO } from "../../dtos/login.dto";
import { VerifyOtpDTO } from "../../dtos/verifyOtp.dto";
import { CustomError } from "../../utils/customError.utils";
import { AuthServices } from "../auth.services";
import { comparePassword } from "../../utils/password.utils";
import { welcomeEmail } from "../../otp/emailSetup";
import jwt from "jsonwebtoken"



export class AuthServicesImpl implements AuthServices {

    async verifyOtp(data: VerifyOtpDTO): Promise<void> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });

        if(!findUser) {
            throw new CustomError(StatusCodes.NOT_FOUND, "Email not found");
        }
        if(findUser.verified) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Email is already verified");
        }
        if(!findUser.otp || !findUser.otpExpiry) {
            throw new CustomError(StatusCodes.NOT_FOUND, "No OTP is available for this user");
        }

        const validOtp = await comparePassword(data.otp, findUser.otp);
        if(!validOtp) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid OTP");
        }

        const expiredOtp = findUser.otpExpiry < new Date();
        if(expiredOtp) {
            throw new CustomError(StatusCodes.BAD_REQUEST, "OTP has expired")
        }

        await db.user.update({
            where: {email: findUser.email},
            data: {
                verified: true,
                otp: null,
                otpExpiry: null
            }
        });

        await welcomeEmail({
            to: findUser.email,
            subject: "Welcome to Live Chat",
            name: findUser.name
        });
    }


    async loginUser(data: LoginDTO): Promise<{ accessToken: string; }> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if(!findUser) {
            throw new CustomError(401, "Invalid email or password");
        }

        const validPassword = await comparePassword(data.password, findUser.password);
        if(!validPassword) {
            throw new CustomError(401, "Invalid email or password");
        }

        const accessToken = this.generateAccessToken(findUser.id, findUser.name, findUser.role, findUser.thumbnail);

        return { accessToken };
    }


    generateAccessToken( userId: string, name: string, role: string, thumb: string ): string {
        return jwt.sign({id: userId, name: name, role: role, thumbnail: thumb}, process.env.JWT_SECRET || '')
    };
    
}