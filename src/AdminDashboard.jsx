import React, { useState } from "react";
import "./CustomerDashboard.css";
import Profile from "./Profile";
import TopNCustomer from "./TopNCustomer"
import GetActivity from "./GetActivity";
import TopnCustomer from "./TopNCustomer";
function CustomerDashboard({ user, onLogout }) {
  const [balance, setBalance] = useState(String(user.balance));
  const [activeComponent, setActiveComponent] = useState(null);
  const [showFundsMenu, setShowFundsMenu] = useState(false); // Toggle funds submenu

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "topncustomer":
        return <TopNCustomer user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "activity":
        return <GetActivity user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      default:
        return <Profile user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;

    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <h2>Welcome, {user.name}</h2>
        <p><strong>Customer ID:</strong> {user.userid}</p>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button className="btn" onClick={() => setActiveComponent("profile")}>Profile</button>
          <button className="btn" onClick={() => setShowFundsMenu(!showFundsMenu)}>Funds</button>
          {showFundsMenu && (
            <div className="submenu">
              <button className="btn" onClick={() => setActiveComponent("topncustomer")}>Top N Customers</button>
              <button className="btn" onClick={() => setActiveComponent("activity")}>Activity History</button>
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

export default CustomerDashboard;