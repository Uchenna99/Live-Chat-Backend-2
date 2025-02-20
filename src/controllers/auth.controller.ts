import { NextFunction, Request, Response } from "express";
import { AuthServicesImpl } from "../services/implementation/auth.services.impl";
import { VerifyOtpDTO } from "../dtos/verifyOtp.dto";
import { LoginDTO } from "../dtos/login.dto";



export class AuthController {
    private authServices: AuthServicesImpl;

    constructor() {
        this.authServices = new AuthServicesImpl();
    };


    public verifyOtp = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as VerifyOtpDTO;
            await this.authServices.verifyOtp(data);
            res.status(200).json({message: "OTP verified successfully"});
        } catch (error) {
            next(error);
        }
    };


    public loginUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as LoginDTO;
            const accessToken = await this.authServices.loginUser(data);
            res.status(200).json(accessToken);
        } catch (error) {
            
        }
    };
}