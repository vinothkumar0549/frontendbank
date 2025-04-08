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
  const [validationErrors, setValidationErrors] = useState({});

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [logout] = useLogoutMutation();

  const toggleForm = () => setIsLogin(!isLogin);

  const validateInput = (name, value) => {
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = `${name} is required!`;
    } else {
      switch (name) {
        case "customerId":
          if (!/^\d{4}$/.test(value)) errorMessage = "Customer ID must be exactly 4 digits!";
          break;
        case "name":
          if (!/^[A-Za-z]+$/.test(value)) errorMessage = "Only alphabets (A-Z, a-z) are allowed!";
          break;
        case "mobilenumber":
          if (!/^\d{10}$/.test(value)) errorMessage = "Mobile number must be exactly 10 digits!";
          break;
        case "aadhaar":
          if (!/^\d{12}$/.test(value)) errorMessage = "Aadhaar number must be exactly 12 digits!";
          break;
          case "password":
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) {
              errorMessage = "Password must be 8-15 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)!";
            }
            break;
        default:
          break;
      }
    }
    return errorMessage;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidationErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(name === "password"){
      setValidationErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newErrors = {};
  let hasError = false;

  Object.keys(formData).forEach((key) => {
    // Only validate fields required for the current form mode
    if (isLogin && (key === "customerId" || key === "password")) {
      newErrors[key] = validateInput(key, formData[key]);
    } else if (!isLogin && key !== "customerId") {
      newErrors[key] = validateInput(key, formData[key]);
    }

    if (newErrors[key]) hasError = true;
  });

  setValidationErrors(newErrors);

  if (hasError) return; // stop if any errors exist
    // // Perform full validation on submit
    // const newErrors = {};
    // Object.keys(formData).forEach((key) => {
    //   newErrors[key] = validateInput(key, formData[key]);
    // });

    // setValidationErrors(newErrors);
    // console.log(formData)
    // // If any validation error exists, stop submission
    // if (Object.values(newErrors).some((errorMsg) => errorMsg)) return;

    try {
      if (isLogin) {
        const response = await login({
          userid: formData.customerId,
          password: formData.password,
        }).unwrap();
        setUser(response);
      } else {
        const response = await register({
          name: formData.name,
          password: formData.password,
          role,
          mobilenumber: formData.mobilenumber,
          aadhaar: formData.aadhaar,
        }).unwrap();
        alert("UserID: " + response.userId);
        setIsLogin(true);
        setFormData({ customerId: "", name: "", password: "", mobilenumber: "", aadhaar: "" });
      }
    } catch (error) {
      setError(error.data?.error || "An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ userid: String(user.userid), password: user.password }).unwrap();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (user) {
    return user.role === "customer" ? (
      <CustomerDashboard user={user} setuser = {setUser} onLogout={handleLogout} />
    ) : (
      <AdminDashboard user={user} setuser = {setUser} onLogout={handleLogout} />
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
                onBlur={handleBlur}
                required
              />
              <span className="error">{validationErrors.customerId}</span>
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
              <span className="error">{validationErrors.password}</span>
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
                onBlur={handleBlur}
                required
              />
              <span className="error">{validationErrors.name}</span>
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
              <span className="error">{validationErrors.password}</span>
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobilenumber"
                placeholder="Enter Mobile Number"
                value={formData.mobilenumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="error">{validationErrors.mobilenumber}</span>
            </div>
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input
                type="text"
                name="aadhaar"
                placeholder="Enter Aadhaar Number"
                value={formData.aadhaar}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="error">{validationErrors.aadhaar}</span>
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
          {isLogin ? (loginLoading ? "Logging in..." : "Login") : registerLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleForm}>{isLogin ? "Register" : "Login"}</button>
      </p>
      <style>
        {`
          .error {
            color: red;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
}

export default App;








// import { useState } from "react";
// import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "./apislice";
// import CustomerDashboard from "./CustomerDashboard";
// import AdminDashboard from "./AdminDashboard";
// import "./App.css";

// function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState("customer");
//   const [formData, setFormData] = useState({
//     customerId: "",
//     name: "",
//     password: "",
//     mobilenumber: "",
//     aadhaar: "",
//   });
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   const [login, { isLoading: loginLoading }] = useLoginMutation();
//   const [register, { isLoading: registerLoading }] = useRegisterMutation();
//   const [logout] = useLogoutMutation();

//   const toggleForm = () => setIsLogin(!isLogin);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       if (isLogin) {
//         const response = await login({
//           userid: formData.customerId,
//           password: formData.password,
//         }).unwrap();
//         setUser(response);
//         console.log(response);
//       } else {
//         const response = await register({
//           name: formData.name,
//           password: formData.password,
//           role,
//           mobilenumber: formData.mobilenumber,
//           aadhaar: formData.aadhaar,
//         }).unwrap();
//         alert("userid: " + response.userId);
//         setIsLogin(true);
//         setFormData({ customerId: "", name: "", password: "" });
//       }
//     } catch (error) {
//       setError(error.data?.error || "An error occurred");
//     }
//   };

//   const handleLogout = async () =>{
//     try {
//       await logout({userid: String(user.userid), password: user.password}).unwrap(); // Call logout API
//       setUser(null); // Reset user state
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
    
//   };
  

//   if (user) {
//     return user.role === "customer" ? (
//       <CustomerDashboard user={user} onLogout={handleLogout} />
//     ) : (
//       <AdminDashboard user={user} onLogout={handleLogout} />
//     );
//   }

//   return (
//     <div className="container">
//       <h2>{isLogin ? "Login" : "Register"}</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         {isLogin ? (
//           <>
//             <div className="form-group">
//               <label>Customer ID</label>
//               <input
//                 type="text"
//                 name="customerId"
//                 placeholder="Enter Customer ID"
//                 value={formData.customerId}
//                 onChange={handleChange}
//                 max={4}
//                 pattern="\d{4}" 
//                 title="Enter Four Digit Customer ID" 

//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 min={8}
//                 max={15}
//                 pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$"
//                 title="Must Contains A-Z, a-z, 0-9, @$!%*?&" 
//                 required
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 max={25}
//                 pattern="[A-Za-z]+"
//                 title="Only alphabets (A-Z or a-z) are allowed"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 min={8}
//                 max={15}
//                 pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$"
//                 title="Must Contains A-Z, a-z, 0-9, @$!%*?&" 
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Mobile Number</label>
//               <input
//                 type="text"
//                 name="mobilenumber"
//                 placeholder="Enter Mobile Number"
//                 value={formData.mobilenumber}
//                 onChange={handleChange}
//                 pattern="\d{10}"
//                 title="Enter Ten Digits Mobile Number"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Aadhaar Number</label>
//               <input
//                 type="text"
//                 name="aadhaar"
//                 placeholder="Enter Aadhaar Number"
//                 value={formData.aadhaar}
//                 onChange={handleChange}
//                 pattern="\d{12}"
//                 title="Enter Your Aadhaar Number"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Role</label>
//               <select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="customer">Customer</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//           </>
//         )}
//         <button type="submit" disabled={loginLoading || registerLoading}>
//           {isLogin
//             ? loginLoading
//               ? "Logging in..."
//               : "Login"
//             : registerLoading
//             ? "Registering..."
//             : "Register"}
//         </button>
//       </form>
//       <p className="toggle-text">
//         {isLogin ? "Don't have an account?" : "Already have an account?"}
//         <button onClick={toggleForm}>{isLogin ? "Register" : "Login"}</button>
//       </p>
//     </div>
//   );
// }

// export default App;
