import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import JoinUsForm from './CreateCodename';
import LoginForm from './LoginForm';

const Header = () => {
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleForumClick = () => {
    const token = localStorage.getItem("id_token");
    const codename = localStorage.getItem("cryptidCodename");

    if (!token || !codename) {
      setWarningMessage('🕯️ You must Join Us before entering the forum.');
      return;
  }
  
    setWarningMessage("");
    navigate("/forums");
  };

   return (
    <header className="site-header">
      <h1 className="flicker site-title">Creepy Cryptids & Haunted Hangouts</h1>
      <p className="header-subtitle">
        Explore spine-chilling creatures and the haunted places they stalk. Choose your cryptid, uncover local legends, and prepare for an eerie journey through myth, mystery, and madness...
      </p>

      <div className="header-buttons">
        <button onClick={() => setShowCreateModal(true)}>Join Us</button>
        <button onClick={handleForumClick}>Forum</button>
      </div>

      {warningMessage && (
        <div className="forum-warning">
          <p className="warning-text">{warningMessage}</p>
          <p className="forum-options">
            Already have your codename?{" "}
            <button className="link-button" onClick={() => {
              setShowLoginModal(true);
              setWarningMessage("");
            }}>
              Click here to login
            </button>
          </p>
          <p className="forum-options">
            Or{" "}
            <button className="link-button" onClick={() => setWarningMessage("")}>
              Close this message
            </button>
          </p>
        </div>
      )}

      {(showCreateModal || showLoginModal) && (
        <div className="modal-overlay">
        <div className="modal-content">
          {showCreateModal && <JoinUsForm handleModalClose={() => setShowCreateModal(false)} />}
          {showLoginModal && <LoginForm handleModalClose={() => setShowLoginModal(false)} />}
          </div>
        </div>
    )}
    </header>
  );
};

export default Header;