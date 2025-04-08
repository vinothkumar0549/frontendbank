import React, { useState } from 'react';
import { useChangepasswordMutation } from './apislice';

const ChangePassword = ({ user, setuser, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [changepassword, { isLoading }] = useChangepasswordMutation();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate strength
    if (!passwordRegex.test(newPassword)) {
      setError(
        'Password must be 8-15 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (confirmPassword === user.password){
      setError('Old and New Password is Same');
      return;
    }

    try {
      const response = await changepassword({
        userid: String(user.userid),
        oldpassword: user.password,
        newpassword: confirmPassword,
      }).unwrap();
      console.log(response.newpassword);
      setSuccess(true);
      alert('Password Changed Successfully');
      setTimeout(() => {
        onClose(); // this will change the view in App.jsx
      }, 1000);
    
    } catch (err) {
        console.log(user);
      setError(err.data?.error || 'Change Password failed. Try again.');
    }
  };

  return (
    <div className="change-password-form p-4 rounded shadow bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      {success ? (
        <p className="text-green-600">Password updated successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              pattern={passwordRegex.source}
              title="8-15 characters with at least one lowercase, one uppercase, one number, and one special character."
            />
          </div>
          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              pattern={passwordRegex.source}
              title="8-15 characters with at least one lowercase, one uppercase, one number, and one special character."
            />
          </div>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? 'Processing...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
