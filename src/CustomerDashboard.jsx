import React, { useState } from "react";
import "./CustomerDashboard.css"; // Import the CSS file
import Withdraw from "./Withdraw";

function CustomerDashboard({ user, onLogout }) {
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome, {user.name}!</h2>

        <div className="account-info">
          <p>
            <strong>Account No:</strong> {user.accountno}
          </p>
          <p>
            <strong>Customer ID:</strong> {user.userid}
          </p>
          <p>
            <strong>Balance:</strong> &#8377; {user.balance}
          </p>
        </div>

        <div className="actions">
          <button
            className="btn withdraw"
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw
          </button>
          <button
            className="btn deposit"
            onClick={() => alert("Deposit function not implemented yet.")}
          >
            Deposit
          </button>
          <button
            className="btn transfer"
            onClick={() =>
              alert("Money transfer function not implemented yet.")
            }
          >
            Money Transfer
          </button>
          <button
            className="btn transactions"
            onClick={() =>
              alert("Print transactions function not implemented yet.")
            }
          >
            Print Transactions
          </button>
        </div>

        <button className="btn logout" onClick={onLogout}>
          Logout
        </button>
      </div>
      {showWithdraw && (
        <Withdraw user={user} onClose={() => setShowWithdraw(false)} />
      )}
    </>
  );
}

export default CustomerDashboard;

// import React from "react";

// function CustomerDashboard({ user, onLogout }) {
//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, {user.name}!</h2>
//       <p>Account No: {user.accountno}</p>
//       <p>Customer ID: {user.userid}</p>
//       <p>Balance: ${user.balance}</p>

//       <button onClick={() => alert("Withdraw function not implemented yet.")}>
//         Withdraw
//       </button>
//       <button onClick={() => alert("Deposit function not implemented yet.")}>
//         Deposit
//       </button>
//       <button
//         onClick={() => alert("Money transfer function not implemented yet.")}
//       >
//         Money Transfer
//       </button>
//       <button
//         onClick={() =>
//           alert("Print transactions function not implemented yet.")
//         }
//       >
//         Print Transactions
//       </button>

//       <button onClick={onLogout}>Logout</button>
//     </div>
//   );
// }

// export default CustomerDashboard;
