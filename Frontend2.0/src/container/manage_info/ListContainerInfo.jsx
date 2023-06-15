import React from "react";
import { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import './MainContainer.css'

const TABLE_HEAD = ["No", "Container ID", "Container Name", "Container IP", "Redirect to"];



export default function ListContainerInfo(props) {

  const [data, setData] = useState([]);
  const [ipaddress, setIP] = useState("");

  const ListContainerInfoAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_containers_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));

  }

  const getNodeIP = async () => {
    await fetch(`${props.apiurl}/get_node_ip`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setIP(data.node_ip_address);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getNodeIP();
    ListContainerInfoAPI();
  }, [])
  return (
    <>
      <div>
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className=" flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  <div className="animate-running-dots mt-5">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </Typography>

              </div>
            </div>
          </CardHeader>
          <CardBody className="  ml-8 mr-8 ">
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
                    <tr key={index} className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">

                      <td className="p-3">

                        <div className="flex items-center gap-7 w-12 h-12">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 " />
                          <Typography variant="small" color="blue-gray" className="font-normal pl-">
                            {index + 1}
                          </Typography>

                        </div>
                      </td>

                      <td>
                        <Typography variant="small" color="text-green-500" className="font-bold">
                          {curElem.container_id}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {curElem.container_name}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {curElem.container_ip}
                        </Typography>

                      </td>
                      <td>
  {curElem.container_port === '' ? (
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal"
    >
      {curElem.container_port}
    </Typography>
  ) : (
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`http://${ipaddress}:${curElem.container_port}`}
      >
        {`http://${ipaddress}:${curElem.container_port}`}
      </a>
    </Typography>
  )}
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
