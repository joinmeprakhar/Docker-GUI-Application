import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import './ManageContainer.css';

function ManageContainer(props) {
  const [displayMessage, setDisplayMessage] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const message = (data) => {
    if (data.status == 200) {
      setDisplayMessage(
        <>
          <div className="success-msg">
            <i className="fa fa-check"> <h1>{data.container_status}</h1></i>
          </div>
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
          <div className="error-msg">
            <i className="fa fa-close"> <h1>{data.container_status}</h1></i>
          </div>
        </>
      );
    }

    else {
      setDisplayMessage(
        <>
          <div className="info-msg">
            <i className="fa fa-info-circle"></i>
            <h1>API is not responding</h1>
          </div>
        </>
      );
    }

  }

  const ListContainerInfoAPI = () => {
    fetch(`${props.apiurl}/list_container`)
      .then(response => response.json())
      .then(data => {
        console.log("This runs == " + data[0].container_name);
        setData(data);
      })
      .catch(error => console.error(error));

  }
  useEffect(() => {
    ListContainerInfoAPI();
  }, [])

  const handleSubmit = async (event) => {
    setDisplayMessage(<></>);
    setIsLoading(true);
    event.preventDefault();
    await fetch(`${props.apiurl}/manage_container`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        message(data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error:", error);
        setDisplayMessage(
          <>
            <div className="info-msg">
              <i className="fa fa-info-circle"></i>
              <h1>API is not responding</h1>
            </div>
          </>
        );
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      {<h1>{displayMessage}</h1>}
      <h1>Manage Container</h1>
      <h3>This service helps to manage docker container where you can do following operations such as start container, stop container, delete container, restart container and container logs etc.</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <label htmlFor="name">Choose Action  <sup style={{ color: 'red' }}>*</sup></label> <br />

            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageContainer1" value="man_start_container" />
              <label class="form-check-label" for="manageContainer1">
                Start Container
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageContainer2" value="man_stop_container" />
              <label class="form-check-label" for="manageContainer2">
                Stop Container
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageContainer3" value="man_delete_container" />
              <label class="form-check-label" for="manageContainer3">
                Delete Container
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageContainer4" value="man_restart_container" />
              <label class="form-check-label" for="manageContainer4">
                Restart Container
              </label>
            </div>
            <div className="column">
              <label htmlFor="subject">Container Name <sup style={{ color: 'red' }}>*</sup></label><br />
              <div  style={{ fontSize: '20px' }}>
                <select onChange={handleInputChange} name="container_name" style={{ bottom: '0' }}>
                  <option>Choose Name</option>
                  {
                    data.map((curElem) => {
                      return (
                        <option value={curElem.container_name}>{curElem.container_name}</option>
                      );
                    })
                  }
                </select>
              </div>

            </div>
          </div>

        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {isLoading ? <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop> : isLoading}
      </div>

    </div>
  );
}

export default ManageContainer;
