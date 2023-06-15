import React, { useState } from "react";
import About_Home from "./content/About_Home";
import About_Docker from "./content/About_Docker";
import About_Docker_architecture from "./content/About_Docker_architecture";
import About_Conclusion from "./content/About_Conclusion";

function About() {
  const [containerClicked, setContainerClicked] = useState(true);
  const [dockerClicked, setDockerClicked] = useState(false);
  const [dockerArchClicked, setDockerArchClicked] = useState(false);
  const [conclusionClicked, setConclusionClicked] = useState(false);

  const handleInputChange = (event) => {
    if(event == 'containerClicked'){
      setContainerClicked(true);
      setDockerClicked(false);
      setDockerArchClicked(false);
      setConclusionClicked(false);
    }
    else if(event == 'dockerClicked'){
      setContainerClicked(false);
      setDockerClicked(true);
      setDockerArchClicked(false);
      setConclusionClicked(false);
    }
    else if(event == 'dockerArchClicked'){
      setContainerClicked(false);
      setDockerClicked(false);
      setDockerArchClicked(true);
      setConclusionClicked(false);
    }
    else {
      setContainerClicked(false);
      setDockerClicked(false);
      setDockerArchClicked(false);
      setConclusionClicked(true);
    }
  };

  return (
    <div className='sidebarContainer'>
      <div >
        <a className={containerClicked ? 'active' : ''} onClick={() => handleInputChange('containerClicked')} ><h4>What are Containers ?</h4></a>
        <a className={dockerClicked ? 'active' : ''} onClick={() => handleInputChange('dockerClicked')} ><h4>What is Docker ?</h4></a>
        <a className={dockerArchClicked ? 'active' : ''} onClick={() => handleInputChange('dockerArchClicked')} ><h4>Docker architecture</h4></a>
        <a className={conclusionClicked ? 'active' : ''} onClick={() => handleInputChange('conclusionClicked')} ><h4>Conclusion</h4></a>

      </div>
      <div class="content"  >
        {containerClicked && <About_Home /> }
        {dockerClicked && <About_Docker />}
        {dockerArchClicked && <About_Docker_architecture /> }
        {conclusionClicked && <About_Conclusion />}
      </div>
    </div>
  )
}

export default About
