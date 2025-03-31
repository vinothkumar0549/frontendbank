import React, { useState } from "react";
import { useDepositMutation } from "./apislice";

function Deposit({ user, updatebalance, onClose }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [deposit, { isLoading }] = useDepositMutation();

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const response = await deposit({
        userid: String(user.userid),
        password: user.password,
        amount: String(amount),
      }).unwrap();
      console.log(response);
      updatebalance(response.balance);
      setMessage(response.message);
      setAmount(""); // Clear input field after successful withdrawal
      alert("Deposit Succesfully");
    } catch (err) {
      setError(err.data?.error || "Deposit failed. Try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Deposit Money</h3>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleDeposit} disabled={isLoading}>
          {isLoading ? "Processing..." : "Deposit"}
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Deposit;
