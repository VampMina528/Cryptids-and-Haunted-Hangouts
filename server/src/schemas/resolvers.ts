import ForumPost from "../models/ForumPost.js";

const resolvers = {
    Query: {
        getAllForumPosts: async () => {
            return await ForumPost.find().sort({ createdAt: -1 });
        }
    },
    Mutation: {
        addForumPost: async (_parent: any, { codename, content }: any) => {
            const newPost = new ForumPost({ codename, content });
            return await newPost.save();
        },

        deleteForumPost: async (_parent: any, { id, codename }: any) => {
            const post = await ForumPost.findById(id);

            if (!post) throw new Error("Post not found.");
            if (post.codename !== codename) throw new Error("Unauthorized.");

            await ForumPost.findByIdAndDelete(id);
            return true;
        }
    }
};

export default resolvers;