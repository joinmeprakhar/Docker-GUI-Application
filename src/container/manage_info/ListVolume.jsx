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
      <table className="table">
        <thead>
          <tr>
            <th colSpan="2">Docker Volumes</th>
          </tr>
          <tr>
            <th>Driver</th>
            <th>Volume Name</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem) => {
              return (
                <tr>
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

