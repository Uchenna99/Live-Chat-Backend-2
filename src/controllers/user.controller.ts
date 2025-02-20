import { NextFunction, Request, Response } from "express";
import { UserServicesImpl } from "../services/implementation/user.services.impl";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { StatusCodes } from "http-status-codes";



export class UserController {
    private userServices: UserServicesImpl;

    constructor() {
        this.userServices = new UserServicesImpl();
    };


    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as CreateUserDTO;
            await this.userServices.createUser(data);
            res.status(StatusCodes.CREATED).json({message: "User created successfully"});
        } catch (error) {
            next(error);
        }
    };
}