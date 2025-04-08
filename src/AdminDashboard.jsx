import React, { useState } from "react";
import "./AdminDashboard.css";
import Home from "./Home"
import Profile from "./Profile";
import TopNCustomer from "./TopNCustomer"
import GetActivity from "./GetActivity";
import ChangePassword from "./ChangePassword";

function AdminDashboard({ user, setUser, onLogout }) {

  const [activeComponent, setActiveComponent] = useState(null);
  const [showFundsMenu, setShowFundsMenu] = useState(false); // Toggle funds submenu
  const [showActivityMenu, setShowActivityMenu] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home user={user} onClose={() => setActiveComponent(null)} />;
      case "profile":
        return <Profile user={user} onClose={() => setActiveComponent(null)} />;
      case "changepassword":
        return <ChangePassword user = {user} setuser = {setUser} onClose={() => setActiveComponent(onLogout)} />
      case "topncustomer":
        return <TopNCustomer user={user} onClose={() => setActiveComponent(null)} />;
      case "activity":
        return <GetActivity user={user} onClose={() => setActiveComponent(null)} />;
      default:
        return <Home user={user} onClose={() => setActiveComponent(null)} />;

    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <h2>Welcome, {user.name}</h2>
        <p><strong>Admin ID:</strong> {user.userid}</p>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button className="btn" onClick={() => setActiveComponent("home")}>Home</button>
          <button className="btn" onClick={() => {
            setActiveComponent("profile");
            setShowActivityMenu(!showActivityMenu);
          }}>Profile</button>
          {showActivityMenu && (
            <div className="submenu">
              <button className="btn" onClick={() => setActiveComponent("activity")}>Activity History</button>
              <button className="btn" onClick={() => setActiveComponent("changepassword")}>Change Password</button>
            </div>
          )}
          <button className="btn" onClick={() => setShowFundsMenu(!showFundsMenu)}>Admin Operations</button>
          {showFundsMenu && (
            <div className="submenu">
              <button className="btn" onClick={() => setActiveComponent("topncustomer")}>Top N Customers</button>
            </div>
          )}
          {/* <button className="btn" onClick={() => setActiveComponent("transaction")}>Funds</button> */}
          <button className="btn logout" onClick={onLogout}>Logout</button>
        </div>
        <div className="content-area">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;