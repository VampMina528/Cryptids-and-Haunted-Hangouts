import mongoose, { Schema, model } from "mongoose";

const forumPostSchema = new Schema({
    codename: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    }, 
    {timestamps: true}
);

const ForumPost = model("ForumPost", forumPostSchema);

export default ForumPost;