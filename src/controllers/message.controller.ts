import { NextFunction, Request, Response } from "express";
import { MessageServicesImpl } from "../services/implementation/message.services.impl";
import { EditMessageDTO, MessageDTO } from "../dtos/message.dto";



export class MessageController {
    private messageServices: MessageServicesImpl;

    constructor() {
        this.messageServices = new MessageServicesImpl();
    };

    public createMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as MessageDTO;
            const newMessage = await this.messageServices.createMessage(data);
            res.status(201).json(newMessage);
        } catch (error) {
            next(error);
        }
    };

    public editMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const data = req.body as EditMessageDTO;
            const editedMessage = await this.messageServices.editMessage(data);
            res.status(200).json(editedMessage);
        } catch (error) {
            next(error);
        }
    };

    public getMessages = async (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const room = req.params.room
            const messages = await this.messageServices.getMessages(room);
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    };
}