import React, { useState } from "react";
import './CreateContainer.css';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function CreateContainer(props) {
  const [displayMessage, setDisplayMessage] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("myFormData: ", formData);
  };

  const message = (data) => {
    if (data.status == 200) {
      setDisplayMessage(
        <>
          <div className="success-msg">
            <i className="fa fa-check"> <h1>{data.container_creation}</h1></i>
          </div>
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
         <div className="error-msg">
            <i className="fa fa-close"> <h1>{data.container_creation}</h1></i>
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


  const handleSubmit = (event) => {
    setDisplayMessage(<></>);
    setIsLoading(true);
    event.preventDefault();
    console.log(formData);

    fetch(`${props.apiurl}/create_container`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json()
      })
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
    event.target.reset();
    setFormData({});

  };

  return (
    <div className="container">
      {<h1>{displayMessage}</h1> }
      <form autoComplete="off" onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="form-group col-md-6">
            Container Name <sup style={{ color: 'red' }}>*</sup>
            <input type="text" className="form-control" name="container_name" onChange={handleInputChange} required />
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Container Image <sup style={{ color: 'red' }}>*</sup>
            <input type="text" className="form-control" name="container_image" onChange={handleInputChange} required />
          </label>

        </div>
        <div className="form-group">
          <label className="form-group col-md-6">
            Image Version <sup style={{ color: 'red' }}>*</sup>
            <input type="text" className="form-control" name="image_version" onChange={handleInputChange} required />
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Container Port (optional)
            <input type="text" className="form-control" name="container_port" onChange={handleInputChange} />
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Volume Name (optional)
            <input type="text" className="form-control" name="vol_name" onChange={handleInputChange} />
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Volume Attachment Path (optional)
            <input type="text" className="form-control" name="vol_attach_path" onChange={handleInputChange} />
          </label>
        </div>

        <button className="btn btn-default btn btn-primary" type="submit">Submit</button>
      </form>
      {isLoading ? <Backdrop open> 
        <CircularProgress color="inherit" />
      </Backdrop> : isLoading}
    </div>
  );
}

export default CreateContainer;
