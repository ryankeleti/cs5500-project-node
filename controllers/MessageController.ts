/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message"
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI"

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/messages/session/:sid to create a new message instance for
 *     a message session</li>
 *     <li>GET /api/users/:uid/messages to retrieve all the message instances</li>
 *     <li>GET /api/users/:uid/messages/:mid to retrieve a particular message instance</li>
 *     <li>GET /api/users/:uid/messages/session/:sid to retrieve all messages for a given message session </li>
 *     <li>DELETE /api/users/:uid/messages/:mid to remove a particular message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessages);
            app.get("/api/users/:uid/messages/:mid", MessageController.messageController.findMessageById);
            app.get("/api/users/:uid/messages/session/:sid", MessageController.messageController.findMessagesInSession);
            app.post("/api/users/:uid/messages/session/:sid", MessageController.messageController.createMessage);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages from the database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then((messages: Message[]) => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the message that matches the message ID
     */
    findMessageById = (req: Request, res: Response) =>
        MessageController.messageDao.findMessageById(req.params.mid)
            .then((message: Message) => res.json(message));

    /**
     * Retrieves all messages from the database for a particular message session and returns
     * an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesInSession = (req: Request, res: Response) => {
        MessageController.messageDao.findMessagesInSession(req.params.sid)
            .then((messages: Message[]) => res.json(messages));
    }

    /**
     * @param {Request} req Represents request from client, including params and body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    createMessage = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;
        if (userId === "my") {
            res.sendStatus(503);
            return;
        }
        MessageController.messageDao.createMessage(userId, req.params.sid, req.body)
            .then((message: Message) => res.json(message));
    }


    /**
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};
