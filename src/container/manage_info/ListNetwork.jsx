import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

export default function ListNetwork(props) {
  const [data, setData] = useState([]);
  const ListNetworkAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_network_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));

  }
  useEffect(() => {
    ListNetworkAPI();
  }, [])
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th colSpan="4">Docker Networks List</th>
          </tr>
          <tr>
            <th>Driver</th>
            <th>Network ID</th>
            <th>Network Name</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem) => {
              return (
                <tr>
                  <td>{curElem.driver}</td>
                  <td>{curElem.network_id}</td>
                  <td>{curElem.network_name}</td>
                  <td>{curElem.scope}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

