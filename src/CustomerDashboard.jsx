import React, { useState } from "react";
import "./CustomerDashboard.css";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import MoneyTransfer from "./MoneyTransfer";
import GetActivity from "./GetActivity";

function CustomerDashboard({ user, onLogout }) {
  const [balance, setBalance] = useState(String(user.balance));
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "withdraw":
        return <Withdraw user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "deposit":
        return <Deposit user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "transfer":
        return <MoneyTransfer user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "activity":
        return <GetActivity user={user} onClose={() => setActiveComponent(null)} />;
      default:
        return <p>Select an operation from the left.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <h2>Welcome, {user.name}!</h2>
        <p><strong>Account No:</strong> {user.accountno}</p>
        <p><strong>Customer ID:</strong> {user.userid}</p>
        <p><strong>Balance:</strong> &#8377; {balance}</p>
        <p><strong>Mobile Number: </strong>{user.mobilenumber}</p>
        <p><strong>Aadhaar No: </strong>{user.aadhaar}</p>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button className="btn" onClick={() => setActiveComponent("withdraw")}>Withdraw</button>
          <button className="btn" onClick={() => setActiveComponent("deposit")}>Deposit</button>
          <button className="btn" onClick={() => setActiveComponent("transfer")}>Money Transfer</button>
          <button className="btn" onClick={() => setActiveComponent("activity")}>Print Transactions</button>
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