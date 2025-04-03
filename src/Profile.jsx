import React, { useState } from "react";
import "./Profile.css";
import { useUpdateuserprofileMutation } from "./apislice"; // Import RTK Query Mutation

function Profile({ user }) {
  const [updateprofile, { isLoading }] = useUpdateuserprofileMutation();

  const [editableFields, setEditableFields] = useState({
    mobilenumber: user.mobilenumber,
    aadhaar: user.aadhaar,
  });

  const [isEditing, setIsEditing] = useState({
    mobilenumber: false,
    aadhaar: false,
  });

  // Handle input change
  const handleChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = async (field) => {
    if (isEditing[field]) {
      if (field === "mobilenumber" && !/^\d{10}$/.test(editableFields.mobilenumber)) {
        alert("Mobile number must be exactly 10 digits!");
        return;
      }
      if (field === "aadhaar" && !/^\d{12}$/.test(editableFields.aadhaar)) {
        alert("Aadhaar number must be exactly 12 digits!");
        return;
      }
  
      try {
        await updateprofile({
          userid: user.userid,
          password: user.password,
          [field]: editableFields[field],
        }).unwrap();
      } catch (err) {
        console.error(err.data?.error || "Internal Server Error");
      }
    }
  
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>User Profile</h3>
        {user.role === "customer" && (
          <p><strong>Account No:</strong> {user.accountno}</p>
        )}        
        <p><strong>Customer Id:</strong> {user.userid}</p>

        {/* Mobile Number Field */}
        <p>
          <strong>Mobile:</strong>
          {isEditing.mobilenumber ? (
            <input
              type="text"
              value={editableFields.mobilenumber}
              onChange={(e) => handleChange("mobilenumber", e.target.value)}
              pattern="\d{10}"
              title="Enter Ten Digits Mobile Number"
            />
          ) : (
            editableFields.mobilenumber
          )}
          <button className="edit-btn" onClick={() => toggleEdit("mobilenumber")} disabled={isLoading}>
            {isEditing.mobilenumber ? "Save" : "Edit"}
          </button>
        </p>

        {/* Aadhaar Field */}
        <p>
          <strong>Aadhaar:</strong>
          {isEditing.aadhaar ? (
            <input
              type="text"
              value={editableFields.aadhaar}
              onChange={(e) => handleChange("aadhaar", e.target.value)}
              pattern="\d{12}"
              title="Enter Your Aadhaar Number"
            />
          ) : (
            editableFields.aadhaar
          )}
          <button className="edit-btn" onClick={() => toggleEdit("aadhaar")} disabled={isLoading}>
            {isEditing.aadhaar ? "Save" : "Edit"}
          </button>
        </p>

        {/* <button className="close-btn" onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
}

export default Profile;
