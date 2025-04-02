
import { useState } from "react";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "./apislice";
import CustomerDashboard from "./CustomerDashboard";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    password: "",
    mobilenumber: "",
    aadhaar: "",
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [logout] = useLogoutMutation();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        const response = await login({
          userid: formData.customerId,
          password: formData.password,
        }).unwrap();
        setUser(response);
        console.log(response);
      } else {
        const response = await register({
          name: formData.name,
          password: formData.password,
          role,
          mobilenumber: formData.mobilenumber,
          aadhaar: formData.aadhaar,
        }).unwrap();
        alert("userid: " + response.userId);
        setIsLogin(true);
        setFormData({ customerId: "", name: "", password: "" });
      }
    } catch (error) {
      setError(error.data?.error || "An error occurred");
    }
  };

  const handleLogout = async () =>{
    try {
      await logout({userid: String(user.userid), password: user.password}).unwrap(); // Call logout API
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Logout failed", error);
    }
    
  };
  

  if (user) {
    return user.role === "customer" ? (
      <CustomerDashboard user={user} onLogout={handleLogout} />
    ) : (
      <AdminDashboard user={user} onLogout={handleLogout} />
    );
  }

  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="text"
                name="customerId"
                placeholder="Enter Customer ID"
                value={formData.customerId}
                onChange={handleChange}
                max={4}
                pattern="\d{4}" 
                title="Enter Four Digit Customer ID" 

                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                min={8}
                max={15}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$"
                title="Must Contains A-Z, a-z, 0-9, @$!%*?&" 
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                max={25}
                pattern="[A-Za-z]+"
                title="Only alphabets (A-Z or a-z) are allowed"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                min={8}
                max={15}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$"
                title="Must Contains A-Z, a-z, 0-9, @$!%*?&" 
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobilenumber"
                placeholder="Enter Mobile Number"
                value={formData.mobilenumber}
                onChange={handleChange}
                pattern="\d{10}"
                title="Enter Ten Digits Mobile Number"
                required
              />
            </div>
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input
                type="text"
                name="aadhaar"
                placeholder="Enter Aadhaar Number"
                value={formData.aadhaar}
                onChange={handleChange}
                pattern="\d{12}"
                title="Enter Your Aadhaar Number"
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" disabled={loginLoading || registerLoading}>
          {isLogin
            ? loginLoading
              ? "Logging in..."
              : "Login"
            : registerLoading
            ? "Registering..."
            : "Register"}
        </button>
      </form>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleForm}>{isLogin ? "Register" : "Login"}</button>
      </p>
    </div>
  );
}

export default App;
