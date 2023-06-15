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
      <table className="table bg-white rounded shadow-sm  table-hover">
        
        <thead>
        <th colSpan="4">Running and Stopped</th>
          <tr>
            <th style={{backgroundColor: 'black', color: 'white'}} scope="col" width="50">No</th>
            <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Container ID</th>
            <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Container Image</th>
            <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Container Name</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem, index) => {
              return (
                <tr>
                  <th scope="row">{++index}</th>
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
