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
      <table className="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <th colSpan="5">Networks</th>
          <tr>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col" width="50">No</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Driver</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Network ID</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Network Name</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Scope</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem, index) => {
              return (
                <tr>
                  <th scope="row">{++index}</th>
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

