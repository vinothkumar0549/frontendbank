import React from "react";
import "./Profile.css";

function Home({ user }) {

  return (
    <div className="modal">
      <div className="modal-content">
        
      {user.role === "customer" && (<h3> Customer Details </h3>)}
      {user.role === "admin" && (<h3> Admin Details </h3>)}


        {user.role === "customer" && (
          <p><strong>Account No:</strong> {user.accountno}</p>
        )}

        <p><strong>User Id:</strong> {user.userid}</p>

        {/* <p>
          <strong>Mobile: {user.mobilenumber}</strong>
        </p>

        <p>
          <strong>Aadhaar: {user.aadhaar}</strong>
        </p> */}

      </div>
    </div>
  );
}

export default Home;
