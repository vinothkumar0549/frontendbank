import React, { useState } from "react";
import "./CustomerDashboard.css";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import MoneyTransfer from "./MoneyTransfer"
import GetActivity from "./GetActivity";

function CustomerDashboard({ user, onLogout }) {

  const [balance , setBalance] = useState(String(user.balance));
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showMoneytransfer, setShowMoneytransfer] = useState(false);
  const [showGetActivity, setShowGetActivity] = useState(false);

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
            <strong>Balance:</strong> &#8377; {balance}
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
            onClick={() => setShowDeposit(true)}
          >
            Deposit
          </button>
          <button
            className="btn transfer"
            onClick={() => setShowMoneytransfer(true)}
          >
            Money Transfer
          </button>
          <button
            className="btn transactions"
            onClick={() => setShowGetActivity(true)}
          >
            Print Transactions
          </button>
        </div>

        <button className="btn logout" onClick={onLogout}>
          Logout
        </button>
      </div>
      {showWithdraw && (
        <Withdraw user={user} updatebalance= {setBalance} onClose={() => setShowWithdraw(false)} />
      )}
      {showDeposit && (
        <Deposit user={user} updatebalance= {setBalance} onClose={() => setShowDeposit(false)} />
      )}
      {showMoneytransfer && (
        <MoneyTransfer user={user} updatebalance= {setBalance} onClose={() => setShowMoneytransfer(false)} />
      )}
      {showGetActivity && (
        <GetActivity user={user} onClose={() => setShowGetActivity(false)} />
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
