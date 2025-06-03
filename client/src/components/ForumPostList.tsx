import { useState, useEffect } from "react"
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_FORUM_POSTS } from '../graphql/queries';
import { DELETE_FORUM_POST, UPDATE_FORUM_POST } from '../graphql/mutations';

const ForumPostList = () => {
    const { data, loading, error } = useQuery(GET_ALL_FORUM_POSTS);

    const [deletePost] = useMutation(DELETE_FORUM_POST, {
        //refetchQueries: [{ query: GET_ALL_FORUM_POSTS }],
        update(cache, { data }, { variables }) {
            if (!variables?.id) return

            const existing = cache.readQuery<{ getAllForumPosts: any[] }>({
                query: GET_ALL_FORUM_POSTS
            });

            if (existing?.getAllForumPosts) {
                cache.writeQuery({
                    query: GET_ALL_FORUM_POSTS,
                    data: {
                        getAllForumPosts: existing.getAllForumPosts.filter(
                            (post) => post.id !== variables?.id
                        )
                    }
                })
            }
        }
    });

    const [updatePost] = useMutation(UPDATE_FORUM_POST, {
        update(cache, { data }) {
            if (!data?.updateForumPost) return;
    
            const existing = cache.readQuery<{ getAllForumPosts: any[] }>({
                query: GET_ALL_FORUM_POSTS,
            });
    
            if (existing?.getAllForumPosts) {
                cache.writeQuery({
                    query: GET_ALL_FORUM_POSTS,
                    data: {
                        getAllForumPosts: existing.getAllForumPosts.map(post =>
                            post.id === data.updateForumPost.id
                                ? data.updateForumPost
                                : post
                        ),
                    },
                });
            }
        }
    });

    const [editingPostId, setEditingPostId] = useState<string | null>(null)
    const [editedContent, setEditedContent] = useState("")

    const [codename, setCodename] = useState<string | null>(null);
    useEffect(() => {
        const storedCodename = localStorage.getItem("cryptidCodename");
        console.log("loaded codenam from localStorage:", storedCodename)
        setCodename(storedCodename);
    }, []);
    
    if (loading) return <p>Loading spooky chatter... </p>;
    if (error) return <p>Error loading forum posts</p>;

    const handleEdit = (postId: string, currentContent: string) => {
        setEditingPostId(postId)
        setEditedContent(currentContent);
    }

    const handleSave = async (postId: string) => {
        await updatePost({ variables: { id: postId, content: editedContent } });
        setEditingPostId(null)
        setEditedContent("")
    }

    return (
        <div className="forum-post-list">
            <h2>The Believers & Naysayer Forums</h2>
            {data.getAllForumPosts.map((post: any) => (
                <div key={post.id} className="forum-post">
                    <strong>{post.codename}:</strong>
                    {editingPostId === post.id ? (
                        <>
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <button onClick={() => handleSave(post.id)}>Save</button>
                            <button onClick={() => setEditingPostId(null)}>Cancel</button>
                        </>
                        
                    ) : (
                        <p>{post.content}</p>
                    )}

                    <small>
                        {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown date"}
                        </small>

                    {post.codename === codename && (
                        <>
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
                            {editingPostId !== post.id && (
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(post.id, post.content)}
                                >
                                    Edit
                                </button>
                            )}
                        </>
                        
                    )}
                </div>
            ))}
        </div>
    );
};

export default ForumPostList;