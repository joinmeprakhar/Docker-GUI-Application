import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        marginBottom: '4px',
        flexWrap: 'nowrap',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '100%',
        height: '80px',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', // Blackish shadow effect
        position: 'relative', // Z-axis change
        zIndex: '1', // Z-axis change
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
        <NavLink
          className="link"
          to="/"
          style={{
            textDecoration: 'none',
            color: 'black',
            transition: 'color 0.3s',
          }}
          activeClassName="active"
        >
          <h1
            style={{
              color: 'black',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              fontSize: '26px', // Font size changed to h2
            }}
          >
            Docker GUI Application
          </h1>
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && (
          <>
            <button
              className="navbar-toggle"
              onClick={handleMenuToggle}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px',
                marginLeft: '20px',
              }}
            >
              <span className="navbar-toggle-icon" style={{ color: 'black', fontSize: '24px' }}>
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </span>
            </button>

            {isMenuOpen && (
              <ul
                className="nav"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  listStyle: 'none',
                  margin: '0',
                  padding: '0',
                  backgroundColor: 'white',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  top: '80px',
                  left: '0',
                  width: '100%',
                  zIndex: '2', // Z-axis change
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                <li className="nav-item">
                  <NavLink
                    exact
                    className="nav-link"
                    activeClassName="active"
                    to="/root"
                    onClick={handleMenuToggle}
                    style={{
                      padding: '10px',
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'color 0.3s',
                      fontSize: '24px', // Font size changed to h2
                    }}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/service"
                    onClick={handleMenuToggle}
                    style={{
                      padding: '10px',
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'color 0.3s',
                      fontSize: '24px', // Font size changed to h2
                    }}
                  >
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/about"
                    onClick={handleMenuToggle}
                    style={{
                      padding: '10px',
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'color 0.3s',
                      fontSize: '24px', // Font size changed to h2
                    }}
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/contact"
                    onClick={handleMenuToggle}
                    style={{
                      padding: '10px',
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'color 0.3s',
                      fontSize: '24px', // Font size changed to h2
                    }}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}

        {!isMobile && (
          <ul
            className="nav"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              listStyle: 'none',
              margin: '0',
              padding: '0',
            }}
          >
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/root"
                style={{
                  padding: '10px',
                  paddingRight: '20px',
                  textDecoration: 'none',
                  color: 'black',
                  transition: 'color 0.3s',
                  fontSize: '24px', // Font size changed to h2
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/service"
                style={{
                  padding: '10px',
                  paddingRight: '20px',
                  textDecoration: 'none',
                  color: 'black',
                  transition: 'color 0.3s',
                  fontSize: '24px', // Font size changed to h2
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/about"
                style={{
                  padding: '10px',
                  paddingRight: '20px',
                  textDecoration: 'none',
                  color: 'black',
                  transition: 'color 0.3s',
                  fontSize: '24px', // Font size changed to h2
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/contact"
                style={{
                  padding: '10px',
                  textDecoration: 'none',
                  color: 'black',
                  transition: 'color 0.3s',
                  fontSize: '24px', // Font size changed to h2
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Hover Color Style */}
      <style>
        {`
          .link:hover > h1 {
            color: #3498db !important;
          }

          .nav-link:hover {
            color: #3498db !important;
          }

          .nav-link.active {
            color: #3498db !important;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
