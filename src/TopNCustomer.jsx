import React, { useState } from "react";
import { useTopncustomerMutation } from "./apislice";
import "./TopNCustomer.css";

const TopnCustomer = ({ user, onClose }) => {
  const [topncustomer, { data, error, isLoading }] = useTopncustomerMutation();
  const [no, setNo] = useState(""); 
  const handleSubmit = () => {
    if (no.trim() === "") return; 
    topncustomer({
      userid: String(user.userid),
      password: user.password,
      no: String(no), 
    });
  };

  return (
    <div className="user-container">
      <h2>Top Customers</h2>

      {/* Input for 'no' value */}
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter N"
          value={no}
          onChange={(e) => setNo(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Top N"}
        </button>
      </div>

      {error && <p className="error">Error: {error.message}</p>}
      {data?.length > 0 ? (
        <div className="user-list-container">
          <ul className="user-list">
            <li className="user-item transaction-header">
              <div>User ID</div>
              <div>Name</div>
              <div>Account No</div>
              <div>Balance</div>
            </li>
            {data.map((user) => (
              <li className="user-item" key={user.userid}>
                <div className="user-details">
                  <div>{user.userid}</div>
                  <div>{user.name}</div>
                  <div>{user.accountno}</div>
                  <div>{user.balance}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !isLoading && <p>No Users</p>
      )}

      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default TopnCustomer;




