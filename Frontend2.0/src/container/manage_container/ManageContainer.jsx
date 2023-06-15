import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
          <div >
            <i > <h1>{data.container_status}</h1></i>
          </div>
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
          <div >
            <i> <h1>{data.container_status}</h1></i>
          </div>
        </>
      );
    }

    else {
      setDisplayMessage(
        <>
          <div >
            <i ></i>
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
            <div >
              <i ></i>
              <h1>API is not responding</h1>
            </div>
          </>
        );
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      {displayMessage && (
        <h1 className="text-3xl font-bold mb-4">{displayMessage}</h1>
      )}
      <h1 className="text-3xl font-bold">Manage Container</h1>
      <h3 className="text-gray-600 mb-4">
        This service helps to manage Docker containers. You can perform various operations such as starting a container, stopping a container, deleting a container, restarting a container, and viewing container logs.
      </h3>
      <form autoComplete="off" onSubmit={handleSubmit} className="max-w-md">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="action_type">Choose Action <sup>*</sup></label>
            <div>
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageContainer1"
                value="man_start_container"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageContainer1">
                Start Container
              </label>
            </div>
            <div>
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageContainer2"
                value="man_stop_container"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageContainer2">
                Stop Container
              </label>
            </div>
            <div>
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageContainer3"
                value="man_delete_container"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageContainer3">
                Delete Container
              </label>
            </div>
            <div>
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageContainer4"
                value="man_restart_container"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageContainer4">
                Restart Container
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="container_name">Container Name <sup>*</sup></label>
            <div>
              <select
                className="form-select block w-full mt-1"
                name="container_name"
                onChange={handleInputChange}
              >
                <option>Choose Name</option>
                {data.map((curElem) => (
                  <option value={curElem.container_name} key={curElem.container_name}>
                    {curElem.container_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className="bg-gray-800 text-white py-2 px-4 rounded" type="submit">Submit</button>
      </form>
      {isLoading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">
            <CircularProgress color="inherit" />
          </div>
        </div>
      )}
    </div>
  );
      }  

export default ManageContainer;
