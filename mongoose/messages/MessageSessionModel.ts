/**
 * @file Implements mongoose model to CRUD
 * documents in the messages session collection
 */
import mongoose from "mongoose";
import MessageSessionSchema from "./MessageSessionSchema";

const MessageSessionModel = mongoose.model("MessageSessionModel", MessageSessionSchema);
export default MessageSessionModel;