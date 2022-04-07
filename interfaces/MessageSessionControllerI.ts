/**
 * @file Controller interface RESTful Web service API for messaging session resource
 */
import {Request, Response} from "express";

/**
 * @interface MessageSessionControllerI defines RESTful Web service API for messaging session resource.
 */
export default interface MessageSessionControllerI {
    findAllSessions (req: Request, res: Response) :void;
    findSessionsByUser (req: Request, res: Response): void;
    findSessionById (req: Request, res: Response): void;
    createSession (req: Request, res: Response): void;
    deleteSession (req: Request, res: Response): void;
};
