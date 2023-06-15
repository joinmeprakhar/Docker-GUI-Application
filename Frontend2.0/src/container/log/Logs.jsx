import React, { useState,useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { HiFolderDownload } from "react-icons/hi";
import './Logs.css'

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
            <div >
              <i ></i>
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
    <div className="w-full  pl-3 ">
      <h1 className="text-2xl font-bold ">Logs & Information </h1>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex ml-12 mt-2 items-left justify-left">
        <div className="flex space-x-12  ">
          <div className="flex  items-center justify-center gap-5">
            <label htmlFor="actionType"></label>
            <div>
              <input
                type="radio"
                id="LogsAndInspect1"
                name="action_type"
                value="get_log"
                onChange={handleInputChange}
                required
                className="mr-4"
              />
              <label htmlFor="LogsAndInspect1">Logs</label>
            </div>
            <div>
              <input
                type="radio"
                id="LogsAndInspect2"
                name="action_type"
                value="get_inspect"
                onChange={handleInputChange}
                required
                className="mr-4"
              />
              <label htmlFor="LogsAndInspect2">Info</label>
            </div>
          </div>

          <div className=" flex  items-center justify-center gap-3">
            <label htmlFor="containerName"></label>
            <select className="form-select block w-full" onChange={handleInputChange} name="container_name" style={{ bottom: '0' }}>
                  <option className="">Choose Name</option>
                  {
                    data.map((curElem) => {
                      return (
                        <option value={curElem.container_name}>{curElem.container_name}</option>
                      );
                    })
                  }
                </select>
          
          </div>
          <button
            className="bg-gray-800 text-white ml-7 h-11 w-48 rounded"
            type="submit"
          >
            Get
          </button>
        </div>
      </form>
      {isLoading ? (
  <Backdrop open>
    <CircularProgress color="inherit" />
  </Backdrop>
) : (
  <>
    <div className="flex justify-end max-h-auto">
      <button onClick={downloadHtml} >
      <HiFolderDownload className="h-7 w-7 mt- mr-4 mb-2"/>
      </button>
    </div>
    <div className="bg-black p-4 custom-container max-w-auto overflow-y-auto overflow-x-hidden border border-gray-500 mr-2.5 rounded-lg shadow">
      <div className="text-green-400 ">
        <p className="text-small ">{displayMessage}</p>
      </div>
    </div>
  </>
)}

    </div>
  );
  
}

export default Logs;
