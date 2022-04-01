/**
 * @file Controller RESTful Web service API for message sessions resource
 */
import MessageSessionDao from "../daos/MessageSessionDao";
import MessageSession from "../models/messages/MessageSession"
import {Express, Request, Response} from "express";
import MessageSessionControllerI from "../interfaces/MessageSessionControllerI";

/**
 * @class MessageSessionController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/sessions to create a new message session instance </li>
 *     <li>GET /api/users/:uid/sessions to retrieve all the message session instances</li>
 *     <li>GET /api/sessions/:sid to retrieve a particular message session instance</li>
 *     <li>DELETE /api/sessions/:sid to remove a particular message session instance</li>
 * </ul>
 * @property {MessageSessionDao} messageSessionDao Singleton DAO implementing message CRUD operations
 * @property {MessageSessionController} messageSessionController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageSessionController implements MessageSessionControllerI {
    private static messageSessionDao: MessageSessionDao = MessageSessionDao.getInstance();
    private static messageSessionController: MessageSessionController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageSessionController
     */
    public static getInstance = (app: Express): MessageSessionController => {
        if (MessageSessionController.messageSessionController === null) {
            MessageSessionController.messageSessionController = new MessageSessionController();
            app.get("/api/users/:uid/sessions", MessageSessionController.messageSessionController.findSessionsByUser);
            app.get("/api/sessions/:sid", MessageSessionController.messageSessionController.findSessionById);
            app.post("/api/users/:uid/sessions", MessageSessionController.messageSessionController.createSession);
            app.delete("/api/sessions/:sid", MessageSessionController.messageSessionController.deleteSession);
        }
        return MessageSessionController.messageSessionController;
    }

    private constructor() {}

    /**
     * Retrieves all message sessions for a user from the database and returns an array of message sessions.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findSessionsByUser = (req: Request, res: Response) =>
        MessageSessionController.messageSessionDao.findSessionsByUser(req.params.uid)
            .then((messageSessions: MessageSession[]) => res.json(messageSessions));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter sid identifying the primary key of the message session to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the message session that matches the message session ID
     */
    findSessionById = (req: Request, res: Response) =>
        MessageSessionController.messageSessionDao.findSessionById(req.params.sid)
            .then((messageSession: MessageSession) => res.json(messageSession));

    /**
     * @param {Request} req Represents request from client, including params and body
     * containing the JSON object for the new message session to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message session that was inserted in the
     * database
     */
    createSession = (req: Request, res: Response) => {
        MessageSessionController.messageSessionDao.createSession(req.body)
            .then((messageSession: MessageSession) => res.json(messageSession));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter sid identifying the primary key of the message session to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message session was successful or not
     */
    deleteSession = (req: Request, res: Response) =>
        MessageSessionController.messageSessionDao.deleteSession(req.params.sid)
            .then((status) => res.send(status));
};
