import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.jsx"; // Ensure this is the correct store import
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </Provider>
);
