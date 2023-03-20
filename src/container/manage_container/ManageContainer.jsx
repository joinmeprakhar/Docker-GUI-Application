import React, { useState } from "react";

function ManageContainer(props) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(FormData);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${props.apiurl}/manage_container`, {
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
            Choose Action <sup style={{color: 'red'}}>*</sup>
            <select name="action_type" onChange={handleInputChange} required>
              <option value="">Select an option</option>
              <option value="man_start_container">Start Container</option>
              <option value="man_stop_container">Stop Container</option>
              <option value="man_delete_container">Delete Container</option>
              <option value="man_restart_container">Restart Container</option>
              <option value="get_container_logs">Container logs</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Container Name <sup style={{color: 'red'}}>*</sup>
            <input type="text" className="form-control" name="container_name" onChange={handleInputChange} required />
          </label>
        </div>
        <button className="btn btn-default btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManageContainer;
