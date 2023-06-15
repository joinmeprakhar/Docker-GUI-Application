import { useState } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";

function DockerCard(props) {
  const navigate = useNavigate();
  const [cards] = useState([
    {
      title: "Quick Review",
      myroutepath: "/root",
      description: `Provides the necessary information about the container such as List of All Running Container, List of All Existing Container, Docker Volumes, Docker Images Information and Docker Network List etc.`,
    },
    {
      title: "Create Container",
      myroutepath: "/createcontainer",
      description: `This service helps to launch the Docker container over the targeted Host. Provide the unique name of the container to launch it on top of Docker Container.`,
    },
    {
      title: "Manage Container",
      myroutepath: "/managecontainer",
      description: `This service helps to manage docker containers. You can perform operations such as start container, stop container, delete container, restart container, and view container logs.`,
    },
    {
      title: "Create Network",
      myroutepath: "/managenetwork",
      description: `This service creates networks for containers to communicate with each other. The host and bridge networks are default networks that come with the installation of Docker Container.`,
    },
    {
      title: "Create Volume",
      myroutepath: "/managevolume",
      description: `Docker containers are used to run applications in an isolated environment. Docker volumes and bind mounts can help in preserving data between container runs.`,
    },
    {
      title: "Remove/Pull Images",
      myroutepath: "/manageimage",
      description: `This service helps to delete Docker images and download new images. Make sure the Docker image is not currently being used by any container before deleting it.`,
    },
    {
      title: "Logs/Inspect",
      myroutepath: "/container_logs",
      description: `This service helps to fetch the logs from the container and assists in debugging the contents of the container. It is helpful when deploying applications to the server.`,
    },
  ]);

  return (
    <div className="outer-container">
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <section>
              <div className="cards-container">
                {cards.map((card, i) => (
                  <div key={i} className="card">
                    <div className="image">
                      <img
                        src={require("../images/dockerimage.png")}
                        alt="docker"
                      />
                    </div>
                    <h2 className="title">{card.title}</h2>
                    <div className="desc">
                      <h4>{card.description}</h4>
                      <button
                        className="card-button"
                        onClick={() => navigate(`${card.myroutepath}`)}
                      >
                        <h4>Click Here</h4>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DockerCard;
