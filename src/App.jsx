
import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./apislice";
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
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

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
        }).unwrap();
        alert("userid: " + response.userId);
        setIsLogin(true);
        setFormData({ customerId: "", name: "", password: "" });
      }
    } catch (error) {
      setError(error.data?.error || "An error occurred");
    }
  };

  if (user) {
    return user.role === "customer" ? (
      <CustomerDashboard user={user} onLogout={() => setUser(null)} />
    ) : (
      <AdminDashboard user={user} onLogout={() => setUser(null)} />
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
