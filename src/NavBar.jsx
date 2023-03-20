import React from "react";
import { NavLink } from "react-router-dom";
import './css/NavBar.css';

const Navbar = () => {
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <nav style={{background: "black"}} className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid color">
                <NavLink className="navbar-brand" to="/">
                  <h1 style={{ color: "white" }}>Docker GUI Application</h1>
                </NavLink>
                <button
                style={{background: "white"}}
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >

                  <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink activeClassName="menu_active" exact className="nav-link active" aria-current="page" to="/"><h2 className="nav-menu-color">Home</h2></NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink activeClassName="menu_active" className="nav-link" to="/service"><h2 className="nav-menu-color">Services</h2></NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink activeClassName="menu_active" className="nav-link" to="/about"><h2 className="nav-menu-color">About</h2></NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink activeClassName="menu_active" className="nav-link" to="/contact"><h2 className="nav-menu-color">Contact</h2></NavLink>
                    </li>
                  </ul>

                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;