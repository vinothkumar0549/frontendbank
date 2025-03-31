import React ,{useState} from "react";
import "./AdminDashboard.css";
import GetActivity from "./GetActivity"
import TopNCustomer from "./TopNCustomer"
function AdminDashboard({ user, onLogout }) {

  const [showGetActivity, setShowGetActivity] = useState(false);
  const [showTopNCustomer, setShowTopNCustomer] = useState(false);
  
  return (
    <>
    <div className="dashboard-container">
      <h2>Admin: {user.name}</h2>
      <p>Admin Customer ID: {user.userid}</p>

      <button
        onClick={() => setShowTopNCustomer(true)}
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
    {showTopNCustomer && (
      <TopNCustomer user={user} onClose={() => setShowTopNCustomer(false)} />
    )}
    </>
  );
}

export default AdminDashboard;
