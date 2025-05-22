import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FORUM_POST, GET_ALL_FORUM_POSTS } from "../graphql/forumQueries";

const ForumPostForm = () => {
    const [content, setContent] = useState("");
    const codename = localStorage.getItem("cryptidCodename") || "";

    const [addPost] = useMutation(ADD_FORUM_POST, {
        refetchQueries: [{ query: GET_ALL_FORUM_POSTS }],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!codename) {
            alert("Please enter your codename before posting.");
            return;
        }

        if (content.trim()) {
            await addPost({ variables: { codename, content: content.trim() } });
            setContent("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="forum-post-form">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your latest encounter or thought... "
                required
                //this message can be changed at any point.
                />
        </form>
    );
};

export default ForumPostForm;