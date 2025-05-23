import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_FORUM_POSTS, DELETE_FORUM_POST } from "../graphql/forumQueries";

const ForumPostList = () => {
    const { data, loading, error } = useQuery(GET_ALL_FORUM_POSTS);

    const [deletePost] = useMutation(DELETE_FORUM_POST, {
        refetchQueries: [{ query: GET_ALL_FORUM_POSTS }],
    });

    const codename = localStorage.getItem("cryptidCodename");

    if (loading) return <p>Loading spooky chatter... </p>;
    if (error) return <p>Error loading forum posts</p>;

    return (
        <div className="forum-post-list">
            <h2>The Believers & Naysayer Forums</h2>
            {data.getAllForumPosts.map((post: any) => (
                <div key={post.id} className="forum-post">
                    <p><strong>{post.codename}:</strong> {post.content}</p>
                    <small>{new Date(post.createdAt).toLocaleString()}</small>

                    {post.codename === codename && (
                        <button
                            className="delete-button"
                            onClick={() => {
                                const confirmDelete = window.confirm("Delete this post?");
                                if (confirmDelete) {
                                    deletePost({ variables: { id: post.id } });
                                }
                            }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ForumPostList;