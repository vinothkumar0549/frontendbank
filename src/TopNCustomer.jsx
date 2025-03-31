import React, { useEffect } from "react";
import { useTopncustomerMutation } from "./apislice"; // Import RTK API slice
import "./TopNCustomer.css";

const TopnCustomer = ({ user, onClose }) => {
  const [topncustomer, { data, error, isLoading }] = useTopncustomerMutation();

  useEffect(() => {
      topncustomer({
        userid: String(user.userid),
        password: user.password,
        "no": "1"
      });
  }, [user, topncustomer]);

  return (
    <div className="user-container">
      <h2>Top Customers</h2>
      {isLoading && <p>Loading...</p>}
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
