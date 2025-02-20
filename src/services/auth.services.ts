import { LoginDTO } from "../dtos/login.dto";
import { VerifyOtpDTO } from "../dtos/verifyOtp.dto";



export interface AuthServices {
    verifyOtp (data: VerifyOtpDTO): Promise<void>;
    loginUser (data: LoginDTO): Promise<{ accessToken: string }>;
}