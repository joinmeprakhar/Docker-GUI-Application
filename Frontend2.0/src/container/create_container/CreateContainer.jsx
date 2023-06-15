'use client';
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Button,  Label, TextInput, Select } from 'flowbite-react';
import { Toast } from 'flowbite-react';
import { HiExclamation, HiCheck, HiX } from 'react-icons/hi'

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
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
            {data.container_creation}
            </div>
            <Toast.Toggle />
          </Toast>
        </>
      )
    }
    else if (data.status == 400) {
      setDisplayMessage(
        <>
        <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
            {data.container_creation}
            </div>
            <Toast.Toggle />
          </Toast>
        </>
      );
    }

    else {
      setDisplayMessage(
        <>
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              api is not responding
            </div>
            <Toast.Toggle />
          </Toast>
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
            <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              api is not responding
            </div>
            <Toast.Toggle />
          </Toast>
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

    <div>
      {<h1 className="h-24">{displayMessage}</h1>}
      <h1 className="text-2xl font-bold ml-10">Create Container</h1>

      <form className="flex ml-20 mr-20 mt-10 mb-10 flex-col gap-4  h-64 w-108" autoComplete="off" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
        <div className="w-108">
          <div className="mb-2 block">
            <Label
              htmlFor="name"
              value="Container Name"
            />
          </div>
          <TextInput
            type="text"
            name="container_name"
            onChange={handleInputChange}
            required
            className="form-input"
           />
        </div>
        <div
          className="w-108"
          id="select">
          <div className="mb-2 block">
            <Label
              htmlFor="container_image"
              value="Container Image"
            />
          </div>
          <Select
            id="container_image"
            required
            onChange={handleInputChange} name="container_image"
          >
            <option >Choose Image</option>
            {
              imagedata.map((curElem) => {
                return (
                  <option value={curElem.image_repository}>{curElem.image_repository}</option>
                );
              })
            }
          </Select>

        </div>
        <div className="w-108">
          <div className="mb-2 block">
            <Label
              htmlFor="image_version"
              value="Image Version"
            />
          </div>
          <TextInput
            type="text"
            name="image_version"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-108">
          <div className="mb-2 block">
            <Label
              htmlFor="container_port"
              value="Container Port"
            />
          </div>
          <TextInput
            type="text"
            name="container_port"
            onChange={handleInputChange}
            placeholder="80"
          />
        </div>
        <div className="w-108">
          <div className="mb-2 block">
            <Label
              htmlFor="container_expose_port"
              value="Container Exposed Port"
            />
          </div>
          <TextInput
            type="text"
            name="container_expose_port"
            onChange={handleInputChange}
            placeholder="8080"
          />
        </div>
        <div
          className="w-108"
          id="select">
          <div className="mb-2 block">
            <Label
              htmlFor="vol_name"
              value="Volume Name"
            />
          </div>
          <Select
            onChange={handleInputChange} name="vol_name"
          >
            <option >Choose Volume</option>
            {
              volumedata.map((curElem) => {
                return (
                  <option value={curElem.volume_name}>{curElem.volume_name}</option>
                );
              })
            }
          </Select>

        </div>
        <div className="w-108">
          <div className="mb-2 block">
            <Label
              htmlFor="vol_attach_path"
              value="Volume Path"
            />
          </div>
          <TextInput
            type="text"
            name="vol_attach_path"
            onChange={handleInputChange}
            placeholder="/var/www/html"
          />
        </div>
        <div
          className="w-108"
          id="select">
          <div className="mb-2 block">
            <Label
              htmlFor="network_name"
              value="Network Name"
            />
          </div>
          <Select
             onChange={handleInputChange} name="network_name" 
          >
            <option >Choose Network</option>
                    {
                      networkdata.map((curElem) => {
                        return (
                          <option value={curElem.network_name}>{curElem.network_name}</option>
                        );
                      })
                    }
          </Select>

        </div>
        </div>
        <Button type="submit" className="w-56 text-end  bg-gray-800 hover:bg-gray-900">
          Submit
        </Button>
      </form>
      
        {isLoading ? <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop> : isLoading}
      </div>

  );
}

export default CreateContainer;