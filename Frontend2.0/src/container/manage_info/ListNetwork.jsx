import React from "react";
import { useEffect, useState } from 'react';


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
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan="5" className="bg-gray-800 text-white py-2 px-4 text-center">Networks</th>
          </tr>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Driver</th>
            <th className="px-4 py-2">Network ID</th>
            <th className="px-4 py-2">Network Name</th>
            <th className="px-4 py-2">Scope</th>
          </tr>
        </thead>
        <tbody>
          {data.map((curElem, index) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{curElem.driver}</td>
                <td className="border px-4 py-2">{curElem.network_id}</td>
                <td className="border px-4 py-2">{curElem.network_name}</td>
                <td className="border px-4 py-2">{curElem.scope}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
  
}

