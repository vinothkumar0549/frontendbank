import React, { useEffect } from "react";
import { useGetactivityMutation, useGettransactionMutation } from "./apislice"; // Import RTK API slice
import "./GetTransaction.css";

const GetTransaction = ({ user, onClose }) => {
  const [getTransactions, { data, error, isLoading }] = useGettransactionMutation();

  useEffect(() => {
      getTransactions({
        userid: user.userid,
        password: user.password, // Ensure field matches backend
      });
  }, [user, getTransactions]);

  return (
    <div className="activity-container">
      <h2>User Activities</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      {data?.length > 0 ? (
        <div className="transaction-list-container">
          <ul className="transaction-list">
            <li className="transaction-item transaction-header">
              <div>Activity ID</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Account From</div>
              <div>Account To</div>
              <div>Date</div>
            </li>
            {data.map((transaction) => (
              <li className="transaction-item" key={transaction.activityid}>
                <div className="transaction-details">
                  <div>{transaction.activityid}</div>
                  <div>{transaction.activity}</div>
                  <div>{transaction.amount}</div>
                  <div>{transaction.accountfrom}</div>
                  <div>{transaction.accountto}</div>
                  <div>{transaction.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !isLoading && <p>No Transactions</p>
      )}
      
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default GetTransaction;
