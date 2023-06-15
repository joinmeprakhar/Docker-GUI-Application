import React, { useState } from "react";
import { HiExclamation, HiCheck, HiX } from 'react-icons/hi'
import { Toast } from 'flowbite-react';
import CircularProgress from "@mui/material/CircularProgress";
import './ManageImages.css';
import ListImageInfo from "../manage_info/ListImageInfo";



function ManageImages(props) {
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
              {data.image_status}
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
              {data.image_status}
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
    await fetch(`${props.apiurl}/manage_image`, {
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

    <div className="w-full   pl-3 ">
      {<h1>{displayMessage}</h1>}
      <h1 className="text-2xl font-bold ">Container Images </h1>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex ml-12 mt-2 items-left justify-left">
        <div className="flex space-x-12 " >
          <div className="flex  items-center justify-center gap-5">
            <label htmlFor="action_type"></label>
            <div >
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageImages1"
                value="pull_image"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageImages1">
                Download
              </label>
            </div>
            <div>
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="action_type"
                id="manageImages2"
                value="delete_image"
                onChange={handleInputChange}
              />
              <label className="text-gray-700" htmlFor="manageImages2">
                Delete
              </label>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Image Name"
              name="image_name"
              onChange={handleInputChange}
              style={{ fontSize: '15px' }}
              required
            />
          </div>
          <div >
              <input
                type="text"
                placeholder="Version"
                name="image_version"
                onChange={handleInputChange}
                style={{ fontSize: '15px' }}
                required
              />
          </div>

        </div>
        <button className="bg-gray-800 text-white ml-7 h-11 w-48 rounded" type="submit">Submit</button>
      </form>
      {isLoading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">
            <CircularProgress color="inherit" />
          </div>
        </div>
      )}
      <div className="mt-8"></div>
      <div className="bg-black p-4 custom-container max-w-auto overflow-y-auto overflow-x-hidden border border-gray-500 mr-2.5 rounded-lg shadow">
        <div className="text-green-400 ">
          <ListImageInfo apiurl={props.apiurl} />
        </div>
      </div>
    </div>



  );
}

export default ManageImages;
