import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

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

      <table class="table bg-white rounded shadow-sm  table-hover">

        <thead>
          <th colSpan="5">Running</th>
          <tr>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col" width="50">No</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Container ID</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Container Name</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Container IP</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Redirect to</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem, index) => {
              if (curElem.container_port == '') {
                return (
                  <tr>
                    <th scope="row">{++index}</th>
                    <td>{curElem.container_id}</td>
                    <td>{curElem.container_name}</td>
                    <td>{curElem.container_ip}</td>
                    <td>{curElem.container_port}</td>
                  </tr>
                );
              }
              else {
                const port =  "http://"+ipaddress+":"+curElem.container_port;
                return (
                  <tr>
                    <th scope="row">{++index}</th>
                    <td>{curElem.container_id}</td>
                    <td>{curElem.container_name}</td>
                    <td>{curElem.container_ip}</td>
                    <td> <a target="_blank" href={port}>{port}</a> </td>
                  </tr>
                );
              }


            })
          }
        </tbody>
      </table>
    </>
  );
}
