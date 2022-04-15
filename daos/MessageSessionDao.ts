/**
 * @file Implements DAO manages storage of messages sessions. Uses mongoose MessageSessionModel to
 * integrate with MongoDB
 */
import MessageSessionDaoI from "../interfaces/MessageSessionDaoI";
import MessageSessionModel from "../mongoose/messages/MessageSessionModel";
import MessageSession from "../models/messages/MessageSession";
import UserDao from "../daos/UserDao";
import mongoose from "mongoose";

/**
 * @class MessageSessionDao Implements Data Access Object managing data storage
 * of Message Session
 * @property {MessageSessionDao} messageSessionDao Private single instance of MessageSessionDao
 */
export default class MessageSessionDao implements MessageSessionDaoI {
    private static messageSessionDao: MessageSessionDao | null = null;

    /**
     * Singleton DAO Instance
     * @returns messageSessionDao
    */
    public static getInstance = (): MessageSessionDao => {
        if (MessageSessionDao.messageSessionDao === null) {
            MessageSessionDao.messageSessionDao = new MessageSessionDao();
        }
        return MessageSessionDao.messageSessionDao;
    }

    private constructor() {}

    /**
     * Uses MessageSessionModel to retrieve all message sessions created in the MongoDB database
     * @returns Promise To be notified when the message sessions are retrieved from
     * database
     */
    findAllSessions = async (): Promise<MessageSession[]> =>
        MessageSessionModel.find();

    /**
     * Uses MessageSessionModel to retrieve all message sessions for a given user
     * @returns Promise To be notified when the message sessions are retrieved from
     * database
     */
    findSessionsByUser = async (uid: string): Promise<MessageSession[]> =>
        MessageSessionModel.find({members: {$elemMatch: {_id: uid}}}).exec();

    /**
     * Uses MessageSessionModel to retrieve message session
     * @param sid message session id for the session to be retrieved
     * @returns Promise To be notified when the message session is retrieved from
     * database
     */
    findSessionById = async (sid: string): Promise<any> => {
        if (mongoose.isValidObjectId(sid)) {
            return MessageSessionModel.findById(sid).exec();
        }
    }

    /**
     * Creates a new message session
     * @param {string} uid1 User id of first user
     * @param {string} uid2 User id of second user
     * @returns Promise To be notified when message session is created
     */
    createSession = async (session: MessageSession): Promise<MessageSession> =>
        MessageSessionModel.create(session);


    /**
     * Adds a user to a message session if not already a member
     * @param {string} sid MessageSession id
     * @param {string} inviter User id of inviter. Must belong to sid
     * @param {string} invitee User id being invited
     * @returns Promise To be notified when message session is created
     */
    addUserToSession = async (sid: string, inviter: string, invitee: string): Promise<any> => {
        if (mongoose.isValidObjectId(sid)
            && mongoose.isValidObjectId(inviter)
            && mongoose.isValidObjectId(invitee)) {
            if (await MessageSessionModel.exists({_id: sid, members: {$elemMatch: {_id: inviter}}})) {
                if (await MessageSessionModel.exists({_id: sid, members: {$elemMatch: {_id: invitee}}})) {
                    return null;
                }
                const newMember = await UserDao.getInstance().findUserById(invitee);
                MessageSessionModel.updateOne(
                   {_id: sid},
                   {$push: {members: newMember}}).exec();
            }
        }
    }

    /**
     * Removes message session from the database
     * @param {string} sid Message session id of the session
     * @returns Promise To be notified when message session is removed from the database
     */
    deleteSession = async (sid: string): Promise<any> =>
        MessageSessionModel.deleteOne({_id: sid});
}
