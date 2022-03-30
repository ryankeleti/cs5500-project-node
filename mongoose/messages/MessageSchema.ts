/**
 * @file Implements mongoose schema to CRUD
 * documents in the messages collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
    timestamp: {type: Date, default: Date.now},
    session: {type: Schema.Types.ObjectId, ref: "MessageSession"}
}, {collection: "messages"});
export default MessageSchema;