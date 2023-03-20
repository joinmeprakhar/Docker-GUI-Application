import { useState } from "react";
import './card.css';
import { useNavigate } from "react-router-dom";

function DockerCard(props) {
  const navigate = useNavigate();
  // const myroute = props.myroutepath.toString();
  const [cards] = useState([
    {
      title: "Quick Review",
      myroutepath: "/root",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta nam vero sapiente eius fugit distinctio
      pariatur? A, molestias.`,

    },
    {
      title: "Create Container",
      myroutepath: "/createcontainer",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta`,
    },
    {
      title: "Manage Container",
      myroutepath: "/managecontainer",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta dolor sit amet consectetur adipisicing elit.`,
    },
    {
      title: "Create Network",
      myroutepath: "/managenetwork",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta`,
    },
    {
      title: "Create Volume",
      myroutepath: "/managevolume",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta nam vero sapiente eius fugit distinctio
      pariatur? A, molestias.`,
    },
    
    {
      title: "Remove/Pull Images",
      myroutepath: "/manageimage",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      perspiciatis soluta dolor sit amet consectetur adipisicing elit.`,
    },
    
  ]);
  return (
    <div className="container-fluid nav_bg">
      <div className="row">
        <div className="col-12 mx-auto">
          <section>
            <div className="container">
              <div className="cards">
                {cards.map((card, i) => (
                  <div key={i} className="card">
                    <div className="image">
                      <img src={require('../images/dockerimage.png')} alt="docker" />
                    </div>
                    <h2 className="title">{card.title}</h2>
                    <div className="desc">
                      <h4>{card.description}</h4>
                      <button onClick={() => navigate(`${card.myroutepath}`)}><h4>Click Here</h4></button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DockerCard;