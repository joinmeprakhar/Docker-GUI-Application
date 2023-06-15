import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

export default function ListVolume(props) {
  const [data, setData] = useState([]);
  const ListVolumeAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_volume_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));

  }
  useEffect(() => {
    ListVolumeAPI();
  }, [])
  return (
    <>
      <table className="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <th colSpan="4">Volumes</th>
          <tr>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col" width="50">No</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Driver</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Volume Name</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem, index) => {
              return (
                <tr>
                  <th scope="row">{++index}</th>
                  <td>{curElem.driver}</td>
                  <td>{curElem.volume_name}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

