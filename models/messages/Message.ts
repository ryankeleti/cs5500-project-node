/**
 * @file Defines the Message type representing
 * a private message.
 */
import User from "../users/User";
import MessageSession from "./MessageSession";

/**
 * @typedef Message Represents a private message
 * @property {string} message Message content
 * @property {User} sender User sending the message
 * @property {Date} timestamp Date the message was sent
 * @property {MessageSession} session Which session the message belongs to
 */
export default interface Message {
    message: string,
    sender: User,
    timestamp: Date,
    session: MessageSession
};
