import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ALL_FORUM_POSTS } from "../graphql/queries";
import { ADD_FORUM_POST } from "../graphql/mutations"

const ForumPostForm = () => {
    const [content, setContent] = useState("");
    const [showForm, setShowForm] = useState(true);
    const codename = localStorage.getItem("cryptidCodename") || "";

    // Simple client-side profanity filter
    const badWords = ["shit", "fuck", "cunt", "bitch"];

    const containsProfanity = (text: string) => {
        return badWords.some((word) =>
        text.toLowerCase().includes(word)
        );
    };

    const [addPost] = useMutation(ADD_FORUM_POST, {
        refetchQueries: [{ query: GET_ALL_FORUM_POSTS }],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!codename) {
            alert("Please enter your codename before posting.");
            return;
        }

        if (containsProfanity(content)) {
            alert("Please avoid using these words...it might upset the cryptids...");
            return;
        }

        if (content.trim()) {
            await addPost({ variables: { codename, content: content.trim() } });
            setContent("");
            setShowForm(false);
        }

        if (!codename) {
            return (
                <div className="forum-warning">
                    <p className="warning-text">🕯️ In order to post you must <strong>JOIN US</strong>. 🕯️</p>
                </div>
            );
        }
    };

    return (
        <>
            {showForm ? (
                <form onSubmit={handleSubmit} className="forum-post-form">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your latest encounter or thought... "  // This message can be changed at any point.
                        required
                    />
                    <div className="forum-buttons">
                        <button type="submit">Post</button>
                        <button
                            type="button"
                            onClick={() => {
                                if (content.trim()) {
                                    const confirmCancel = window.confirm("Are you sure you want to cancel this post?");
                                    if (!confirmCancel) return;
                                }
                                setContent("");
                                setShowForm(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button onClick={()=> setShowForm(true)}>Write a new post</button>
            )}
        </>
    );
};

export default ForumPostForm;