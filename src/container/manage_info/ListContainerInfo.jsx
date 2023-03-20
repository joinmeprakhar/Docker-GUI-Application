import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

export default function ListContainerInfo(props) {
  const [data, setData] = useState([]);
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
  useEffect(() => {
    ListContainerInfoAPI();
  }, [])
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th colSpan="3">List of All Running Container Information</th>
          </tr>
          <tr>
            <th>Container ID</th>
            <th>Container Name</th>
            <th>Container IP</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem) => {
              return (
                <tr>
                  <td>{curElem.container_id}</td>
                  <td>{curElem.container_name}</td>
                  <td>{curElem.container_ip}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}
