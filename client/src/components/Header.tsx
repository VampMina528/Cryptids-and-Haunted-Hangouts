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
          <p style={{ marginTop: "0.5rem" }}>
            Already have your codename?{" "}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#ff4444",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowLoginModal(true);
                setWarningMessage(""); // Hide the warning when login opens
              }}
            >
              Click here to login
            </button>
          </p>
        </div>
      )}

      {(showCreateModal || showLoginModal) && (
        <div className="modal-overlay">
        <div className="modal-content">
          {showCreateModal && <JoinUsForm handleModalClose={() => setShowCreateModal(false)} />}
          {showLoginModal && <LoginForm handleModalClose={() => setShowLoginModal(false)} />}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              className="close-modal"
              onClick={() => {
                setShowCreateModal(false);
                setShowLoginModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </header>
  );
};

export default Header;