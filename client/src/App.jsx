// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateProgram from "./pages/CreateProgram";
import RegisterClient from "./pages/RegisterClient";
import EnrollClient from "./pages/EnrollClient";
import SearchClient from "./pages/SearchClient";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap everything inside Dashboard */}
        <Route path="/" element={<Dashboard />}>
          {/* <Route index element={<h2 className="mt-5">Welcome to the Doctor Dashboard</h2>} /> */}
          <Route path="create-program" element={<CreateProgram />} />
          <Route path="register-client" element={<RegisterClient />} />
          <Route path="enroll-client" element={<EnrollClient />} />
          <Route path="search-client" element={<SearchClient />} />
          <Route path="client-profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
