import ForumPostForm from '../components/ForumPostForm';
import ForumPostList from '../components/ForumPostList';
import { useNavigate } from 'react-router-dom';
import Auth from '../context/AuthContext';

const ForumsPage = () => {
    const navigate = useNavigate();
    const codename = Auth.getCodename();

    const handleLogout = () => {
        Auth.logout();
    };

    return (
        <div className="forums forums-wrapper">
            {codename && (
                <p className="codename-display">
                    Logged in as: <strong>{codename}</strong>
                </p>
            )}
            <div className="forum-nav-buttons">
                <button onClick={() => navigate("/")} className="view-detail-button">
                    ⬅ Back to Homepage
                </button>
                <button onClick={handleLogout} className="view-detail-button logout-button">
                    Logout
                </button>
            </div>

            <ForumPostForm />
            <ForumPostList />
        </div>
    )
};

export default ForumsPage;