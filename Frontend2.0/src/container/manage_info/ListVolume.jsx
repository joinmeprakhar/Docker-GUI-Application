import React from "react";
import { useEffect, useState } from 'react';

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
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan="3" className="bg-gray-800 text-white py-2 px-4 text-center">Volumes</th>
          </tr>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Driver</th>
            <th className="px-4 py-2">Volume Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((curElem, index) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{curElem.driver}</td>
                <td className="border px-4 py-2">{curElem.volume_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
  
}

