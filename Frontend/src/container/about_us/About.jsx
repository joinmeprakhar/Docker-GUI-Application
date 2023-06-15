import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import About_Home from "./content/About_Home";
import About_Docker from "./content/About_Docker";
import About_Docker_architecture from "./content/About_Docker_architecture";
import About_Conclusion from "./content/About_Conclusion";

function About() {
  const [containerClicked, setContainerClicked] = useState(true);
  const [dockerClicked, setDockerClicked] = useState(false);
  const [dockerArchClicked, setDockerArchClicked] = useState(false);
  const [conclusionClicked, setConclusionClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector(".sidebar");
      const content = document.querySelector(".content");
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      if (window.innerWidth >= 700) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const sidebarTop = Math.max(navbarHeight - scrollTop, 0);

        sidebar.style.top = `${sidebarTop}px`;
        content.style.marginTop = `${sidebarTop}px`;
      } else {
        sidebar.style.top = "0";
        content.style.marginTop = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (event) => {
    if (event === "containerClicked") {
      setContainerClicked(true);
      setDockerClicked(false);
      setDockerArchClicked(false);
      setConclusionClicked(false);
    } else if (event === "dockerClicked") {
      setContainerClicked(false);
      setDockerClicked(true);
      setDockerArchClicked(false);
      setConclusionClicked(false);
    } else if (event === "dockerArchClicked") {
      setContainerClicked(false);
      setDockerClicked(false);
      setDockerArchClicked(true);
      setConclusionClicked(false);
    } else {
      setContainerClicked(false);
      setDockerClicked(false);
      setDockerArchClicked(false);
      setConclusionClicked(true);
    }
  };

  return (
  <div className="sidebarContainer">
  <div className="sidebar">
    <a
      className={containerClicked ? "active" : ""}
      onClick={() => handleInputChange("containerClicked")}
      style={{ marginTop: "100px" }}
    >
      <h4>What are Containers?</h4>
    </a>
        <a
          className={dockerClicked ? "active" : ""}
          onClick={() => handleInputChange("dockerClicked")}
        >
          <h4> <style></style> What is Docker?</h4>
        </a>
        <a
          className={dockerArchClicked ? "active" : ""}
          onClick={() => handleInputChange("dockerArchClicked")}
        >
          <h4>Docker Architecture</h4>
        </a>
        <a
          className={conclusionClicked ? "active" : ""}
          onClick={() => handleInputChange("conclusionClicked")}
        >
          <h4>Conclusion</h4>
        </a>
      </div>
      <div className="content">
        {containerClicked && <About_Home />}
        {dockerClicked && <About_Docker />}
        {dockerArchClicked && <About_Docker_architecture />}
        {conclusionClicked && <About_Conclusion />}
      </div>
    </div>
  );
}

export default About;
