import React, { useState } from "react";

function ManageNetwork() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(FormData);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://192.168.1.151:5000/manage_network", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="radio">
            Choose Action <sup style={{color: 'red'}}>* </sup>
            <select name="action_type" onChange={handleInputChange} required>
              <option value="">Select an option</option>
              <option value="create_network">Create Network</option>
              <option value="delete_network">Delete Network</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Network Name <sup style={{color: 'red'}}>*</sup>
            <input type="text" className="form-control" name="network_name" onChange={handleInputChange} required />
          </label>
        </div>

        <button className="btn btn-default btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManageNetwork;
