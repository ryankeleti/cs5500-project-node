/**
 * @file Implements DAO manages storage of messages. Uses mongoose MessageModel to
 * integrate with MongoDB
*/
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
*/
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Singleton DAO Instance
     * @returns MessageDao
    */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all messages
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessages = async (): Promise<Message[]> =>
        MessageModel
            .find()
            .populate("message")
            .exec();

    /**
     * Uses MessageModel to retrieve all messages
     * @param mid message id for the message to be retrieved
     * @returns Promise To be notified when the message is retrieved from
     * database
     */
    findMessageById = async (mid: string): Promise<any> =>
        MessageModel
            .findById(mid)
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * in given session
     * @param {string} sid session id
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findMessagesInSession = async (sid: string): Promise<Message[]> =>
        MessageModel
            .find({_id: sid})
            .populate("message")
            .exec();
    /**
     * Inserts new message instance into the database
     * @param {string} uid User id of sender of the message
     * @param {string} sid Message Session id
     * @param {Message} message Message to be sent
     * @returns Promise To be notified when message is inserted into the database
     */
    createMessage = async (uid: string, sid: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, sender: uid, session: sid});

     /**
     * Removes message from the database
     * @param {string} mid Message id of the message
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}
