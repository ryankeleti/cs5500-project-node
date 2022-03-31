import MessageSession from "../models/messages/MessageSession";
import User from "../models/users/User"

/**
 * @file Declares API for Message Session related data access object methods
 */
export default interface MessageSessionDaoI {
    findAllSessions():Promise<MessageSession[]>;
    findSessionById(sid : string): Promise<any>;
    createSession(uid1: string, uid2: string): Promise<MessageSession>;
    deleteSession(sid: string): Promise<any>;
};