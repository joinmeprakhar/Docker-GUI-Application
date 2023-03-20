import React from "react";
import { useEffect, useState } from 'react';
import './style.css';

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
      <table className="table">
        <thead>
          <tr>
            <th colSpan="3">Docker Images Information</th>
          </tr>
          <tr>
            <th>Image ID</th>
            <th>Image Repository</th>
            <th>Image Tag</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem) => {
              return (
                <tr>
                  <td>{curElem.image_id}</td>
                  <td>{curElem.image_repository}</td>
                  <td>{curElem.image_tag}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}
