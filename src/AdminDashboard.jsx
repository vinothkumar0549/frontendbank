import React ,{useState} from "react";
import "./AdminDashboard.css";
import GetActivity from "./GetActivity"

function AdminDashboard({ user, onLogout }) {

  const [showGetActivity, setShowGetActivity] = useState(false);
  
  return (
    <>
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
        onClick={() => setShowGetActivity(true)}
      >
        Print Transactions
      </button>

      <button onClick={onLogout}>Logout</button>
    </div>
    {showGetActivity && (
      <GetActivity user={user} onClose={() => setShowGetActivity(false)} />
    )}
    </>
  );
}

export default AdminDashboard;
