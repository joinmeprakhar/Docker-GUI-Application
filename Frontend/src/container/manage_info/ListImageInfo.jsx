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
      <table className="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <th colSpan="4">Images</th>
          <tr>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col" width="50">No</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Image ID</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Image Repository</th>
            <th style={{ backgroundColor: 'black', color: 'white' }} scope="col">Image Tag</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((curElem, index) => {
              return (
                <tr>
                  <th scope="row">{++index}</th>
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
