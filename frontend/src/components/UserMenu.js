import { useState } from "react";

const UserMenu = ({ user, onRentalHistoryClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="user-menu">
      {/* User Icon */}
      <img
        src="/user-icon.png"
        alt="User"
        className="user-icon"
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="dropdown-menu">
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
          <button onClick={onRentalHistoryClick}>View Rental History</button>
          <button>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
