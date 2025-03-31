import React, { useEffect } from "react";
import { useGetactivityMutation } from "./apislice"; // Import RTK API slice
import "./GetActivity.css";

const GetActivity = ({ user, onClose }) => {
  const [getActivities, { data, error, isLoading }] = useGetactivityMutation();

  useEffect(() => {
      getActivities({
        userid: user.userid,
        password: user.password, // Ensure field matches backend
      });
  }, [user, getActivities]);

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
              <div>Date and Time</div>
            </li>
            {data.map((activity) => (
              <li className="transaction-item" key={activity.activityid}>
                <div className="transaction-details">
                  <div>{activity.activityid}</div>
                  <div>{activity.activity}</div>
                  <div>{activity.amount}</div>
                  <div>{activity.accountfrom}</div>
                  <div>{activity.accountto}</div>
                  <div>{activity.date}</div>
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

export default GetActivity;
