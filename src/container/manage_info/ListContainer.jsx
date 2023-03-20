import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

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
      <table className="table">
        <thead>
          <tr>
            <th colSpan="3">List of All Existing Container</th>
          </tr>
          <tr>
            <th>Container ID</th>
            <th>Container Image</th>
            <th>Container Name</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem) => {
              return (
                <tr>
                  <td>{curElem.container_id}</td>
                  <td>{curElem.container_image}</td>
                  <td>{curElem.container_name}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}
