import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3>Powered by Docker GUI Application</h3>
      <p>
        Docker is an open platform for developing, shipping, and running
        applications. It enables seamless deployment and management of
        containers, allowing you to build and scale your applications with ease.
      </p>
      <p>
        Visit the <a href="https://www.docker.com/">Docker website</a> to learn
        more.
      </p>
      <p>
        &copy; {new Date().getFullYear()} Docker GUI Application All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
