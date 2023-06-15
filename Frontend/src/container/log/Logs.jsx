import React, { useState,useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import './Logs.css';

function Logs(props) {
  const [displayMessage, setDisplayMessage] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [downloadData, setdownloadData] = useState("");
  const [datatype, setDatatype] = useState("");
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setDatatype(formData.action_type);
  };
  const message = (data) => {
    if (data.status == 200) {
      setDisplayMessage(
        <>
          {data.container_status}
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
          {data.container_status}
        </>
      );
    }

    else {
      setDisplayMessage(
        <>
          <h1>API is not responding</h1>
        </>
      );
    }
  }
  const handleSubmit = async (event) => {
    setDisplayMessage(<></>);
    setIsLoading(true);
    event.preventDefault();
    await fetch(`${props.apiurl}/get_log_inspect`, {
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
        setdownloadData(data.container_status);
        setDatatype("");
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
  const downloadHtml = () => {
    const blob = new Blob([downloadData], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'containerLogs.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  return (
    <div className="logcontainer container">
      <h1>Logs/Inspect</h1>
      <h3>This service helps to fetch the logs from the container and helps to debug the stuffs in container. This is helpful when you deploying your application to the server.</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
          <label htmlFor="name">Choose Action  <sup style={{ color: 'red' }}>*</sup></label> <br />
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="LogsAndInspect1" value="get_log" />
              <label class="form-check-label" for="LogsAndInspect1">
                Get logs
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" onChange={handleInputChange} type="radio" name="action_type" id="LogsAndInspect2" value="get_inspect" />
              <label class="form-check-label" for="LogsAndInspect2">
                Get inspect
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
      {isLoading ? <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop> : isLoading}
      <center><button onClick={downloadHtml} class="btn"><i class="fa fa-download"> Download logs </i></button></center>
      <div class="scroll-bg">
        <div className="scroll-div">
          <div className="scroll-object">
            {displayMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logs;
