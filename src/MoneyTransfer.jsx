import React, { useState } from "react";
import { useMoneytransferMutation } from "./apislice";

function MoneyTransfer({ user, updatebalance, onClose }) {
  const [amount, setAmount] = useState("");
  const [receiverid, setReceiverid] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [moneytransfer, { isLoading }] = useMoneytransferMutation();

  const handleMoneyTransfer = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const response = await moneytransfer({
        userid: String(user.userid),
        receiverid: receiverid,
        password: user.password,
        amount: String(amount),
      }).unwrap();
      console.log(response);
      updatebalance(response.balance);
      setMessage(response.message);
      setAmount(""); // Clear input field after successful withdrawal
      alert("MoneyTransfer Succesfully");
    } catch (err) {
      setError(err.data?.error || "MoneyTransfer failed. Try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Deposit Money</h3>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <input
          type="text"
          placeholder="Enter Receiver Id"
          value={receiverid}
          onChange={(e) => setReceiverid(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button onClick={handleMoneyTransfer} disabled={isLoading}>
          {isLoading ? "Processing..." : "MoneyTransfer"}
        </button>
        <br />
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default MoneyTransfer;
