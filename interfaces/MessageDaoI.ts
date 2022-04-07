import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessages(): Promise<Message[]>;
    findAllMessagesSentByUser(uid: string): Promise<Message[]>;
    findMessageById(mid: string): Promise<Message>;
    findMessagesInSession(sid: string): Promise<Message[]>;
    createMessage(uid: string, sid: string, message: Message): Promise<Message>;
    deleteMessage(mid: string): Promise<any>;
};
