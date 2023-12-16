import React from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-warning  p-2 sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div className="sidebar-brand-icon">
          <img className="w-50" src={Logo} alt="Digital House" />
        </div>
      </Link>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard - Tecno-Juy</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading text-info">Actions</div>

      {/* <!-- Nav Item - Pages --> */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/buscador">
          <i className="fas fa-fw fa-search text-danger "></i>
          <span className="text-dark">Buscador</span>
        </Link>
      </li>
      {/* <!-- Nav Item - Pages --> */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/rowproducts">
          <i className="fas fa-fw fa-folder text-danger"></i>
          <span className="text-dark">Row Products</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Charts --> */}
      <li className="nav-item">
        <Link className="nav-link" to="/contentrow">
          <i className="fas fa-fw fa-chart-area text-danger"></i>
          <span className="text-dark"> Content Row</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      <li className="nav-item">
        <Link className="nav-link" to="/table">
          <i className="fas fa-fw fa-table text-danger"></i>
          <span className="text-dark">Table</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block bg-dark" />
    </ul>
  );
}

export default Sidebar;
