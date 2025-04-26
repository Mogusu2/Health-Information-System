import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";


function Dashboard() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <i className="bi bi-hospital-fill fs-4"></i> 
            <span>Health Info System</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/create-program"><i className="bi bi-folder-plus me-2"></i>Create Program</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register-client"><i className="bi bi-person-plus me-2"></i>Register Client</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/enroll-client"><i className="bi bi-person-check me-2"></i>Enroll Client</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search-client"><i className="bi bi-search me-2"></i>Search Client</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="dashboard-header text-center py-5 animate__animated animate__fadeInDown">
        <h1 className="display-5 fw-bold">
          <i className="bi bi-clipboard2-pulse me-2 text-primary"></i>
          Welcome to the Doctor's Dashboard
        </h1>
        <p className="lead text-muted">Manage client data, programs, and more with ease.</p>
      </header>

      <div className="container mt-4 animate__animated animate__fadeInUp">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;