import React, { useState, useEffect } from "react";
import './CreateContainer.css';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import './CreateContainerform.css';

function CreateContainer(props) {

  const [displayMessage, setDisplayMessage] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagedata, setImageData] = useState([]);
  const [volumedata, setVolumeData] = useState([]);
  const [networkdata, setNetworkData] = useState([]);
 

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


  const handleSubmit = async (event) => {
    setDisplayMessage(<></>);
    setIsLoading(true);
    event.preventDefault();
    console.log(formData);

    await fetch(`${props.apiurl}/create_container`, {
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

  const ListImageInfoAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_image_info`)
      .then(response => response.json())
      .then(imagedata => {
        console.log(imagedata);
        setImageData(imagedata);
      })
      .catch(error => console.error(error));

  }

  const ListNetworkAPI = async () => {
    await fetch(`${props.apiurl}/list_network_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNetworkData(data);
      })
      .catch(error => console.error(error));

  }

  const ListVolumeAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_volume_info`)
      .then(response => response.json())
      .then(volumedata => {
        console.log(volumedata);
        setVolumeData(volumedata);
      })
      .catch(error => console.error(error));

  }

  useEffect(() => {
    ListImageInfoAPI();
    ListVolumeAPI();
    ListNetworkAPI();
  }, [])

  return (
    <div className="container">
      {<h1>{displayMessage}</h1>}
      <div className="aboutcontainer">
        <h1>Create Container</h1>
        <h3>This service helps to launch the Docker container over the targeted Host. Provide the uniqe name of the container in order to launch container on top of Docker Container.</h3>
        <form autoComplete="off" onSubmit={handleSubmit}>

          <div className="row">
            <div className="column">
              <label htmlFor="name">Container Name  <sup style={{ color: 'red' }}>*</sup></label> <br />
              <input
                type="text"
                name="container_name"
                onChange={handleInputChange}
                required
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="column">
              <label htmlFor="email">Container Image  <sup style={{ color: 'red' }}>*</sup></label><br />
              <div style={{ fontSize: '20px' }}>
                <select onChange={handleInputChange} name="container_image" style={{ bottom: '0' }}>
                  <option >Choose Image</option>
                  {
                    imagedata.map((curElem) => {
                      return (
                        <option value={curElem.image_repository}>{curElem.image_repository}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="subject">Image Version  <sup style={{ color: 'red' }}>*</sup></label><br />
              <input
                type="text"
                name="image_version"
                onChange={handleInputChange}
                style={{ fontSize: '15px' }}
                required
              />
            </div>
            <div className="column">
              <label htmlFor="contact">Container Port (optional)</label><br />
              <input
                type="text"
                name="container_port"
                style={{ fontSize: '15px' }}
                onChange={handleInputChange}
              />
            </div>
            <div className="column">
              <label htmlFor="contact">Container Exposed Port (optional)</label><br />
              <input
                type="text"
                name="container_expose_port"
                style={{ fontSize: '15px' }}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="subject">Volume Name (optional)</label><br />
              <div style={{ fontSize: '20px' }}>
                <select onChange={handleInputChange} name="vol_name" style={{ bottom: '0' }}>
                  <option >Choose Volume</option>
                  {
                    volumedata.map((curElem) => {
                      return (
                        <option value={curElem.volume_name}>{curElem.volume_name}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
            <div className="column">
              <label htmlFor="contact">Volume Attachment Path (optional)</label><br />
              <input
                type="text"
                name="vol_attach_path"
                onChange={handleInputChange}
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="column">
              <label htmlFor="email">Network Name (optional) </label><br />
              <div style={{ fontSize: '20px' }}>
                <select onChange={handleInputChange} name="network_name" style={{ bottom: '0' }}>
                  <option >Choose Network</option>
                  {
                    networkdata.map((curElem) => {
                      return (
                        <option value={curElem.network_name}>{curElem.network_name}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {isLoading ? <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop> : isLoading}
    </div>
  );
}

export default CreateContainer;
