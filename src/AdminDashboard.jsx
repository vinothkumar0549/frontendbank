import React, { useState } from "react";
import "./CustomerDashboard.css";
import GetActivity from "./GetActivity";
import TopnCustomer from "./TopNCustomer";

function AdminDashboard({ user, onLogout }) {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "topncustomer":
        return <TopnCustomer user={user} onClose={() => setActiveComponent(null)} />;
      case "activity":
        return <GetActivity user={user} onClose={() => setActiveComponent(null)} />;
      default:
        return <p>Select an operation from the left.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <h2>Welcome, {user.name}</h2>
        <p><strong>Account No:</strong> {user.accountno}</p>
        <p><strong>Customer ID:</strong> {user.userid}</p>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button className="btn" onClick={() => setActiveComponent("topncustomer")}>Top N Customers</button>
          <button className="btn" onClick={() => setActiveComponent("activity")}>Print Activity</button>
          <button className="btn logout" onClick={onLogout}>Logout</button>
        </div>
        <div className="content-area">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;


// import React ,{useState} from "react";
// import "./AdminDashboard.css";
// import GetActivity from "./GetActivity"
// import TopNCustomer from "./TopNCustomer"
// function AdminDashboard({ user, onLogout }) {

//   const [showGetActivity, setShowGetActivity] = useState(false);
//   const [showTopNCustomer, setShowTopNCustomer] = useState(false);
  
//   return (
//     <>
//     <div className="dashboard-container">
//       <h2>Admin: {user.name}</h2>
//       <p>Admin Customer ID: {user.userid}</p>

//       <button
//         onClick={() => setShowTopNCustomer(true)}
//       >
//         Get Top N Customers
//       </button>
//       <button
//         onClick={() => setShowGetActivity(true)}
//       >
//         Print Transactions
//       </button>

//       <button onClick={onLogout}>Logout</button>
//     </div>
//     {showGetActivity && (
//       <GetActivity user={user} onClose={() => setShowGetActivity(false)} />
//     )}
//     {showTopNCustomer && (
//       <TopNCustomer user={user} onClose={() => setShowTopNCustomer(false)} />
//     )}
//     </>
//   );
// }

// export default AdminDashboard;
