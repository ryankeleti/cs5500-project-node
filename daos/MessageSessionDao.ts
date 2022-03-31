/**
 * @file Implements DAO manages storage of messages sessions. Uses mongoose MessageSessionModel to
 * integrate with MongoDB
*/
import MessageSessionDaoI from "../interfaces/MessageSessionDaoI";
import MessageSessionModel from "../mongoose/messages/MessageSessionModel";
import MessageSession from "../models/messages/MessageSession";
import User from "../models/users/User";

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

    private constructor() {
    }

    /**
     * Uses MessageSessionModel to retrieve all messages sessions
     * @returns Promise To be notified when the message sessions are retrieved from
     * database
     */
    findAllSessions = async (): Promise<MessageSession[]> =>
        MessageSessionModel.find().exec();

    /**
     * Uses MessageSessionModel to retrieve message session
     * @param sid message session id for the session to be retrieved
     * @returns Promise To be notified when the message session is retrieved from
     * database
     */
    findSessionById = async (sid: string): Promise<any> =>
        MessageSessionModel.findById(sid).exec();

    /**
     * creates new message session between two users
     * @param {string} uid1 User id of first user
     * @param {string} uid2 User id of second user
     * @returns Promise To be notified when message session is created
     */
    createSession = async (uid1: string, uid2: string): Promise<MessageSession> =>
        MessageSessionModel.create({members: [uid1, uid2]});

    /**
     * Removes message session from the database
     * @param {string} sid Message session id of the session
     * @returns Promise To be notified when message session is removed from the database
     */
    deleteSession = async (sid: string): Promise<any> =>
        MessageSessionModel.deleteOne({_id: sid});
}
