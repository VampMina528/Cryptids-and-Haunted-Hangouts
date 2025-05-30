import Cryptid from "../models/Cryptid.js";
import ForumPost from "../models/ForumPost.js";
import User from "../models/User.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface Context {
    user?: {
        id: string;
        codename: string;
        email: string,
    }
}

const resolvers = {
    Query: {
        getAllForumPosts: async (_parent: unknown, _args: unknown) => {
            return await ForumPost.find().sort({ createdAt: -1 });
        },

        getCryptidById: async (_parent: unknown, { id }: { id: string }) => {
            return await Cryptid.findById(id)
        },

        getAllCryptids: async (_parent: unknown, _args: unknown) => {
            return Cryptid.find()

        }
    },
    Mutation: {
        addUser: async (_parent: unknown, { input }: {input: { codename: string; email: string; password: string } }) => {
            const { codename, email, password } = input  
            const user = await User.create({ codename, email, password });
            const token = signToken(user);
            return { token, user };
          },
      
          loginUser: async (_parent: unknown, { codename, password }: { codename: string; password: string }) => {
            const user = await User.findOne({ codename });
      
            if (!user) {
              throw new AuthenticationError('Invalid codename');
            }
      
            const isPwCorrect = await user.isCorrectPassword(password); 
            if (!isPwCorrect) {
              throw new AuthenticationError('Invalid password');
            }
      
            const token = signToken(user);
            return { token, user };
          },

        addForumPost: async (_parent: any, { input }: { input: { content: string } }, context: Context) => {
            if (!context.user) throw new AuthenticationError("Must be logged in to add post.")
            const newPost = new ForumPost({ 
            codename: context.user.codename,
            content: input.content,
            user: context.user.id 
            });
            return await newPost.save();
        },

        updateForumPost: async (_parent: any, { id, content }: { id: string, content: string}, context: Context) => {

            const post = await ForumPost.findById(id);
            
            if (!context.user) throw new AuthenticationError("Must be logged in to add post.")
            if (!post) throw new Error("Post not found.");
            if (post.codename !== context.user?.codename) throw new Error("Unauthorized.");

            post.content = content

            await post.save();
            return post;
        },

        deleteForumPost: async (_parent: any, { id }: { id: string }, context: Context) => {
            const post = await ForumPost.findById(id);

            if (!post) throw new Error("Post not found.");
            if (post.codename !== context.user?.codename) throw new Error("Unauthorized.");

            await ForumPost.findByIdAndDelete(id);
            return true;
        }
    }
};

export default resolvers;