import ForumPostForm from '../components/ForumPostForm';
import ForumPostList from '../components/ForumPostList';
import Auth from '../context/AuthContext';

const ForumsPage = () => {
    const codename = Auth.getCodename();

    return (
        <div className="forums forums-wrapper">
            {codename && (
                <p className="codename-display">
                    Logged in as: <strong>{codename}</strong>
                </p>
            )}
            
            <ForumPostForm />
            <ForumPostList />
        </div>
    )
};

export default ForumsPage;