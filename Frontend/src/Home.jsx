import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <section id="header" style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', marginTop: '12em' }}>
      <div style={{ margin: '0 auto', width: '90%', padding: '0 5%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ flex: '0 0 50%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
              Grow your business with <strong style={{ fontWeight: 'bold' }}>Docker Application</strong>
            </h1>
            <h2 style={{ marginTop: '20px', textAlign: 'center', textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>We are a team of talented developers making websites</h2>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <NavLink
                to="/service"
                style={{
                  padding: '15px 15px',
                  textShadow: "2px 2px 4px rgba(0, 0, 0)",
                  background: '#3498db',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0)',
                  transition: 'background 0.3s',
                  fontSize: '20px',
                }}
                activeStyle={{ background: 'darkblue' }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgb(3, 98, 129)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3498db';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0)';
                }}
              >
                Get Started
              </NavLink>
            </div>
          </div>
          <div style={{ flex: '0 0 50%', padding: '20px' }}>
            <img src={require('./images/dockerimage.png')} style={{ width: '100%', height: '100%' }} alt="Docker" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
