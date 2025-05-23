import { useNavigate } from "react-router-dom";
import { useState } from "react";
import JoinUsForm from "./CreateCodename";

const Header = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleForumClick = () => {
    const token = localStorage.getItem("id_token");
    const codename = localStorage.getItem("cryptidCodename");

    if (!token || !codename) {
      setWarningMessage('🕯️ You must Join Us before entering the forum.');
      return;
  };
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
        </div>
      )}

    {showCreateModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <JoinUsForm handleModalClose={() => setShowCreateModal(false)} />
            <button className="close-modal" onClick={() =>setShowCreateModal(false)}>Close</button>
        </div>
      </div>
    )}
    </header>
  );
};

export default Header;



// **Optional <Styling>

// .forum-warning {
//   margin-top: 1rem;
//   padding: 1rem;
//   background-color: rgba(128, 0, 0, 0.2);
//   border: 2px solid crimson;
//   color: white;
//   text-align: center;
//   font-family: 'Creepster', cursive;
//   animation: flicker-glow 2s infinite;
// }

// .warning-text {
//   font-size: 1.2rem;
// }

// @keyframes flicker-glow {
//   0% { text-shadow: 0 0 4px crimson; }
//   50% { text-shadow: 0 0 10px red; }
//   100% { text-shadow: 0 0 4px crimson; }
// }
// </Styling>
