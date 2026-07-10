import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Notes from "./pages/Notes.jsx";
import TenantSignup from "./pages/TenantSignup.jsx";
import TenantLogin from "./pages/TenantLogin.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* for signup */}
        <Route
          path="/SignUp"
          element={
            token ? (
              <Navigate to="/Notes" />
            ) : (
              <SignUp handleLogin={handleLogin} />
            )
          }
        />

        {/* {Login} */}
        <Route
          path="/Login"
          element={
            token ? (
              <Navigate to="/Notes" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        {/* Signup Tenant */}
        <Route
          path="/TenantSignUp"
          element={
            token ? (
              <Navigate to="/Notes" />
            ) : (
              <TenantSignup handleLogin={handleLogin} />
            )
          }
        />
        {/* Login-Tenant */}
        <Route
          path="/TenantLogin"
          element={
            token ? (
              <Navigate to="/Notes" />
            ) : (
              <TenantLogin handleLogin={handleLogin} />
            )
          }
        />

        {/* Notes section */}
        <Route
          path="/Notes"
          element={
            token ? (
              <Notes token={token} user={user} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
