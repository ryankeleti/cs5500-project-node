/**
 * @file Controller interface RESTful Web service API for messaging resource
 */
import {Request, Response} from "express";

/**
 * @interface MessageControllerI defines RESTful Web service API for messaging resource.
 */
export default interface MessageControllerI {
    findAllMessages (req: Request, res: Response): void;
    findMessageById (req: Request, res: Response): void;
    createMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    findMessagesInSession (req: Request, res: Response): void;
};
