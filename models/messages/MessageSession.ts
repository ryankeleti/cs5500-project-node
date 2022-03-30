/**
 * @file Defines the MessageSession type representing
 * a collection of messages
 */ 
import User from "../users/User";

/**
 * @typedef MessageSession Represents a messaging session between users.
 * @property {User[]} members Users in this chat session
 */
export default interface MessageSession {
    members: User[]
};
