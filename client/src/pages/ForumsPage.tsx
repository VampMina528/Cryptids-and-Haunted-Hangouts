import ForumPostForm from "../components/ForumPostForm";
import ForumPostList from "../components/ForumPostList";

const ForumsPage = () => {
    return (
        <div className="forums">
            <ForumPostForm />
            <ForumPostList />
        </div>
    );
};

export default ForumsPage;