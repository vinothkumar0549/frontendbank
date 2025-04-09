import React, { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import Home from "./Home"
import Profile from "./Profile";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import MoneyTransfer from "./MoneyTransfer";
import GetTransaction from "./GetTransaction";
import GetActivity from "./GetActivity";
import ChangePassword  from "./ChangePassword";
//import App from "./App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function CustomerDashboard({ user, setUser, onLogout }) {
  const [balance, setBalance] = useState(String(user.balance));
  const [activeComponent, setActiveComponent] = useState(null);
  const [showFundsMenu, setShowFundsMenu] = useState(false); // Toggle funds submenu
  const [showActivity, setShowActivity] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [changepassword, setchangepassword] = useState (false);

  // useEffect(() => {
  //   if (user.transactioncount % 5 === 0 && user.transactioncount !== 0) {
  //     setchangepassword(true);
  //   } else {
  //     setchangepassword(false);
  //   }
  // }, []);

  const renderComponent = () =>{
    switch (activeComponent) {
      // case "main":
      //   return <App />
      case "home":
        return <Home user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "profile":
        return <Profile user={user} balance = {balance} onClose={() => setActiveComponent(null)} />;
      case "changepassword":
        return <ChangePassword user = {user} setuser = {setUser} onClose={() => setActiveComponent(onLogout)} />
      case "withdraw":
        return <Withdraw user={user} setchangepassword= {setchangepassword} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "deposit":
        return <Deposit user={user} setchangepassword= {setchangepassword} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "moneytransfer":
        return <MoneyTransfer user={user} setchangepassword= {setchangepassword} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "transaction":
        return <GetTransaction user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;
      case "activity":
        return <GetActivity user = {user} updatebalance = {setBalance} onClose={() => setActiveComponent(null)} />
      default:
        return <Home user={user} updatebalance={setBalance} onClose={() => setActiveComponent(null)} />;

    }
  };

  const toggleBalance = () => {
    setShowBalance(true);

    // Hide balance after 5 seconds
    setTimeout(() => {
      setShowBalance(false);
    }, 5000);
  };

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <h2>Welcome, {user.name}</h2>
        <p><strong>Customer ID: </strong> {user.userid}</p>
        <p>
          <strong>Balance: ₹ </strong>  
          <span style={{display: "inline-flex"}}>
            {showBalance ? ` ${balance} ` : "******"}
            <button onClick={toggleBalance} 
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0", marginLeft: "10px" }}
            >
            <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />
            </button>
          </span>
        </p>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button className="btn" onClick={() => setActiveComponent("home")}>Home</button>
          <button className="btn" onClick={() => {
            setActiveComponent("profile");
            setShowActivity(!showActivity);
          }}>Profile</button>
          {showActivity && (
            <div className="submenu">
              <button className="btn" onClick={() => setActiveComponent("activity")}>Activity History</button>
              <button className="btn" onClick={() => setActiveComponent("changepassword")}>Change Password</button>
            </div>
          )}
          <button className="btn" onClick={() => setShowFundsMenu(!showFundsMenu)}>Funds</button>
          {showFundsMenu && (
            <div className="submenu">
              <button className="btn" disabled={changepassword} onClick={() => setActiveComponent("withdraw")}>Withdraw</button>
              <button className="btn" disabled={changepassword} onClick={() => setActiveComponent("deposit")}>Deposit</button>
              <button className="btn" disabled={changepassword} onClick={() => setActiveComponent("moneytransfer")}>Money Transfer</button>
              <button className="btn" onClick={() => setActiveComponent("transaction")}>Transaction History</button>
              {/* <button className="btn" onClick={() => setActiveComponent("activity")}>Activity History</button> */}
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