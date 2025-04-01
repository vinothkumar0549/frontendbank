import React, { useState } from "react";
import { useWithdrawMutation } from "./apislice";

function Withdraw({ user,updatebalance, onClose }) {
  const [amount, setAmount] = useState("");
  // const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [withdraw, { isLoading }] = useWithdrawMutation();

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setError(null);
    // setMessage(null);

    try {
      const response = await withdraw({
        userid: String(user.userid),
        password: user.password,
        amount: String(amount),
      }).unwrap();
      console.log(response);
      updatebalance(response.balance);
      // setMessage(response.message);
      setAmount(""); // Clear input field after successful withdrawal
      alert("withdraw Succesfully");
    } catch (err) {
      setError(err.data?.error || "Withdrawal failed. Try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Withdraw Money</h3>
        {error && <p className="error-message">{error}</p>}
        {/* {message && <p className="success-message">{message}</p>} */}

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button onClick={handleWithdraw} disabled={isLoading}>
          {isLoading ? "Processing..." : "Withdraw"}
        </button>
        <br />
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Withdraw;
