import { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
    codename: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const ForumPost = model("ForumPost", forumPostSchema);

export default ForumPost;