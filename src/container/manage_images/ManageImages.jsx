import React, { useState } from "react";

function ManageImages(props) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(FormData);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${props.apiurl}/manage_image`, {
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
            Choose Action:
            <select name="action_type" onChange={handleInputChange} required>
              <option value="">Select an option</option>
              <option value="pull_image">Download Image</option>
              <option value="delete_image">Delete Image</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Image Name <sup style={{color: 'red'}}>*</sup>
            <input type="text" className="form-control" name="image_name" onChange={handleInputChange}  required/>
          </label>
        </div>

        <div className="form-group">
          <label className="form-group col-md-6">
            Image Version <sup style={{color: 'red'}}>*</sup>
            <input type="text" className="form-control" name="image_version" onChange={handleInputChange} required />
          </label>
        </div>

        <button className="btn btn-default btn btn-primary" type="submit">Submit</button>
      </form>
     
    </div>
  );
}

export default ManageImages;
