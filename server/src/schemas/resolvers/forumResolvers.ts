import ForumPost from "../../models/ForumPost.js";

const ForumResolvers = {
    Query: {
        getAllForumPosts: async () => {
            return await ForumPost.find().sort({ createdAt: -1 });
        }
    },
    Mutation: {
        addForumPost: async (_parent: any, { codename, content }: any) => {
            const newPost = new ForumPost({ codename, content });
            return await newPost.save();
        }
    }
};

export default ForumResolvers;