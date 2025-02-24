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


    public getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const allUsers = await this.userServices.getAllUsers();
            res.status(StatusCodes.CREATED).json(allUsers);
        } catch (error) {
            next(error);
        }
    };


    public getRoomMessages = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as string;
            const messages = await this.userServices.getRoomMessages(data);
            res.status(StatusCodes.CREATED).json(messages);
        } catch (error) {
            next(error);
        }
    };


    public getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const id = req.params.id;
            const user = await this.userServices.getUser(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
}