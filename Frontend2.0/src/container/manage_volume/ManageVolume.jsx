import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { HiExclamation, HiCheck, HiX } from 'react-icons/hi'
import { Toast } from 'flowbite-react';
import { Button, Label, TextInput, Radio } from 'flowbite-react';

function ManageVolume(props) {
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
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {data.network_status}
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
              {data.network_status}
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
    await fetch(`${props.apiurl}/manage_volume`, {
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
  };



  return (
    <div className="max-w-xl mx-auto">
      {displayMessage && (
        <h1 className="h-24">{displayMessage}</h1>
      )}
      <h1 className="text-2xl font-bold">Create Volume</h1>
      <h3>Docker containers are used to run applications in an isolated environment. By default, all the changes inside the container are lost when the container stops. If we want to keep data between runs, Docker volumes and bind mounts can help.</h3>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex ml-20 mr-20 mt-10 mb-10 flex-col gap-4  h-64 w-108">
        <div className="flex  flex-col gap-4  ">
          <Label htmlFor="action_type">
            Select Option
          </Label>
          <div className="flex items-center gap-2">
            <Label htmlFor="action_type">
              create
            </Label>
            <Radio
              onChange={handleInputChange} name="action_type" id="manageVolume1" value="create_volume"
            />

          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="action_type">
              Delete
            </Label>
            <Radio
              onChange={handleInputChange} name="action_type" id="manageVolume2" value="delete_volume"
            />

          </div>
          <div className="w-108">
            <div className="mb-2 block">
              <Label
                htmlFor="manageNetwork1"
                value="Network Name"
              />
            </div>
            <TextInput
              type="text"
              name="volume_name"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit" className="  bg-gray-800 hover:bg-gray-900">
          Submit
        </Button>
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

export default ManageVolume;
