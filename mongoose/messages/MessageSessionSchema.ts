/**
 * @file Implements mongoose schema to CRUD
 * documents in the messages session collection
 */
import mongoose from "mongoose";
import MessageSession from "../../models/messages/MessageSession";
import UserSchema from "../users/UserSchema";

const MessageSessionSchema = new mongoose.Schema<MessageSession>({
    members: {type: [UserSchema], default: [], unique:false}
}, {collection: "message_sessions"});
export default MessageSessionSchema;
