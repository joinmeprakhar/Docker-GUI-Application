import React from "react";
import { useEffect, useState } from 'react';

export default function ListImageInfo(props) {
  const [data, setData] = useState([]);
  
  const ListImageInfoAPI = async () => {
    console.log("First");
    await fetch(`${props.apiurl}/list_image_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));

  }
  useEffect(() => {
    ListImageInfoAPI();
  }, [])
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan="4" className="bg-gray-800 text-white py-2 px-4 text-center">Images</th>
          </tr>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Image ID</th>
            <th className="px-4 py-2">Image Repository</th>
            <th className="px-4 py-2">Image Tag</th>
          </tr>
        </thead>
        <tbody>
          {data.map((curElem, index) => {
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{curElem.image_id}</td>
                <td className="border px-4 py-2">{curElem.image_repository}</td>
                <td className="border px-4 py-2">{curElem.image_tag}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
        }  
