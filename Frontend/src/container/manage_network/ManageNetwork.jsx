import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function ManageNetwork(props) {
  const [displayMessage, setDisplayMessage] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(FormData);
  };
  const message = (data) => {
    if (data.status == 200) {
      setDisplayMessage(
        <>
          <div className="success-msg">
            <i className="fa fa-check"> <h1>{data.network_status}</h1></i>
          </div>
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
          <div className="error-msg">
            <i className="fa fa-close"> <h1>{data.network_status}</h1></i>
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

  const handleSubmit = async (event) => {
    setDisplayMessage(<></>);
    setIsLoading(true);
    event.preventDefault();
    await fetch(`${props.apiurl}/manage_network`, {
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
      <h1>Create Network</h1>
      <h3>This service creates the network for containers so containers can communicate with each other. host and bridge network is default network comes at time of instalation of Docker Container.</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <label htmlFor="name">Choose Action  <sup style={{ color: 'red' }}>*</sup></label> <br />

            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageNetwork1" value="create_network" />
              <label class="form-check-label" for="manageNetwork1">
                Create Network
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="manageNetwork2" value="delete_network" />
              <label class="form-check-label" for="manageNetwork2">
                Delete Network
              </label>
            </div>

            <div className="column">
              <label htmlFor="subject">Network Name <sup style={{ color: 'red' }}>*</sup></label><br />
              <input
                type="text"
                name="network_name"
                onChange={handleInputChange}
                style={{ fontSize: '15px' }}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      {isLoading ? <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop> : isLoading}
    </div>
  );
}

export default ManageNetwork;
