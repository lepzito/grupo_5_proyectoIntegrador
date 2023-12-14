import "./app.css";
import FotoPerfil from "./assets/images/user.png";
import Sidebar from "./components/Sidebar/Sidebar";

import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import ContentRowView from "./views/ContentRowView";
import RowProductsView from "./views/RowProductsView";
import TableView from "./views/Table";
import Buscador from "./views/Buscador";

function App() {
  return (
    <div id="wrapper">
      {/* <!-- Sidebar --> */}
      <Sidebar />
      {/* <!-- End of Sidebar --> */}

      {/* <!-- Content Wrapper --> */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar --> */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">
              {/* <!-- Nav Item - Alerts --> */}
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="alertsDropdown"
                >
                  <i className="fas fa-bell fa-fw"></i>
                  {/* <!-- Counter - Alerts --> */}
                  <span className="badge badge-danger badge-counter"></span>
                </a>
              </li>

              {/* <!-- Nav Item - Messages --> */}
              <li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="messagesDropdown"
                >
                  <i className="fas fa-envelope fa-fw"></i>
                  {/* <!-- Counter - Messages --> */}
                  <span className="badge badge-danger badge-counter"></span>
                </a>
              </li>

              <div className="topbar-divider d-none d-sm-block"></div>

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="userDropdown"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    Administrador
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src={FotoPerfil}
                    alt="Jordan Walke - Creador de React"
                    width="60"
                  />
                </a>
              </li>
            </ul>
          </nav>
          {/* <!-- End of Topbar --> */}

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/contentrow" element={<ContentRowView />} />
            <Route path="/rowproducts" element={<RowProductsView />} />
            <Route path="/table" element={<TableView />} />

            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </div>

        {/* <!-- Footer --> */}
        <Footer />

        {/* <!-- End of Footer --> */}
      </div>
      {/* <!-- End of Content Wrapper --> */}
    </div>
  );
}

export default App;
