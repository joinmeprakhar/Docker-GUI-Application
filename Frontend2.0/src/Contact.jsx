import React, { useState } from 'react';


const Contact = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    msg: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    alert(
      `My name is ${data.fullname}. My mobile number is ${data.phone} and email is ${data.email}, Here is what I watn to say ${data.msg}`
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center">
            <i className="mr-2"></i>
            <div className="font-bold">Address</div>
          </div>
          <div>Yamuna Expy</div>
          <div>Greater Noida</div>
  
          <div className="flex items-center">
            <i className="mr-2"></i>
            <div className="font-bold">Phone</div>
          </div>
          <div>+91 123456789</div>
          <div>+91 987654321</div>
  
          <div className="flex items-center">
            <i className="mr-2"></i>
            <div className="font-bold">Email</div>
          </div>
          <div>satyam@gbu.ac.in</div>
          <div>sulekha@gbu.ac.in</div>
          <div>prakhar@gbu.ac.in</div>
        </div>
  
        <div>
          <div className="text-2xl font-bold mb-4">Send us a message</div>
          <p>
            If you have any work for me or any queries related to my Docker application, you can send me a message here. It's my pleasure to help you.
          </p>
  
          <form onSubmit={formSubmit} className="mt-8">
            <div className="mb-4">
              <input
                onChange={handleInputChange}
                name="fullname"
                value={data.fullname}
                type="text"
                placeholder="Enter Full Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={handleInputChange}
                name="phone"
                value={data.phone}
                type="number"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                value={data.email}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                onChange={handleInputChange}
                name="msg"
                value={data.msg}
                placeholder="Enter your message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <input
                type="submit"
                value="Send Now"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }  

export default Contact;
