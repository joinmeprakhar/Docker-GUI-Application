import React from "react";
import { useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
 
const TABLE_HEAD = ["No", "Container Name","Container ID", "Container Image"];
 


export default function ListContainer(props) {

  const [data, setData] = useState([]);
  const ListContainerAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_container`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));

  }
  useEffect(() => {
    ListContainerAPI();
  }, [])
  return (
    <>
    <div>
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
          <Typography variant="h5" color="blue-gray">
            <div className="animate-running-dots mt-5">
                <div className="dot1"></div>
                <div className="dot1"></div>
                <div className="dot1"></div>
              </div>
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="  ml-10 mr-10">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y bg-gray-800 border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                  <Typography
                    variant="small"
                    color="text-white"
                    className="font-bold leading-none opacity-90 text-white"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {data.map((curElem, index) => {
            return (
              <tr key={index} className="transition-all  duration-300 ease-in-out hover:shadow-lg hover:scale-105  overflow-hidden ">
                    
                <td className="p-2">
                  
                      <div className="flex items-center gap-7 w-12 h-12">
                      <XCircleIcon className="w-4 h-4 text-red-500 " />
                        <Typography variant="small" color="blue-gray" className="font-normal pl-">
                          {index+1}
                        </Typography>
                       
                      </div>
                    </td>
                    
                    <td>
                      <Typography variant="small" color="text-green-500" className="font-bold">
                      {curElem.container_name}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                      {curElem.container_id}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                      {curElem.container_image}
                      </Typography>
                      
                    </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </CardBody>
      </Card>

    </div>
    </>
  );
  
}
