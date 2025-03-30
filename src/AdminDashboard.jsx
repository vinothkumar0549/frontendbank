import React from "react";
import "./AdminDashboard.css";
function AdminDashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      <h2>Admin: {user.name}</h2>
      <p>Admin Customer ID: {user.userid}</p>

      <button
        onClick={() =>
          alert("Get Top N Customers function not implemented yet.")
        }
      >
        Get Top N Customers
      </button>
      <button
        onClick={() =>
          alert("Print Transactions function not implemented yet.")
        }
      >
        Print Transactions
      </button>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
