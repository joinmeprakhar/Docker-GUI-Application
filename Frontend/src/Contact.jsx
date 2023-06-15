import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './css/Contact.css';

const Contact = () => {
  const [data, setData] = useState({
    fullname: '',
    phone: '',
    email: '',
    msg: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  const InputEvent = (event) => {
    const { name, value } = event.target;

    setData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const serviceId = 'service_8sg0p96'; // Replace with your EmailJS service ID
      const templateId = 'template_nj1pqnq'; // Replace with your EmailJS template ID
      const userId = 'Bh_dFTwRaKS1ixBiq'; // Replace with your EmailJS user ID

      emailjs
        .sendForm(serviceId, templateId, e.target, userId)
        .then((result) => {
          console.log(result.text);
          setIsSent(true);
          setErrors({});
        })
        .catch((error) => {
          console.log(error.text);
          setIsSent(false);
        });

      // Clear the form inputs after submission
      setData({
        fullname: '',
        phone: '',
        email: '',
        msg: '',
      });
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    let timer;
    if (isSent) {
      timer = setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSent]);

  const validateForm = () => {
    const errors = {};
    if (!data.fullname.trim()) {
      errors.fullname = <span style={{ color: 'red' }}>Full Name is required</span>;
    }
    if (!data.phone.trim()) {
      errors.phone = <span style={{ color: 'red' }}>Phone Number is required</span>;
    } else if (!/^\d+$/.test(data.phone)) {
      errors.phone = <span style={{ color: 'red' }}>Phone Number must be numeric</span>;
    }
    if (!data.email.trim()) {
      errors.email = <span style={{ color: 'red' }}>Email is required</span>;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = <span style={{ color: 'red' }}>Email is invalid</span>;
    }
    if (!data.msg.trim()) {
      errors.msg = <span style={{ color: 'red' }}>Message is required</span>;
    }
    return errors;
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt" style={{ color: '#3498db' }}></i>
              <div className="topic">Address</div>
              <div className="text-one">Yamuna Expy</div>
              <div className="text-two">Greater Noida</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt" style={{ color: '#3498db' }}></i>
              <div className="topic">Phone</div>
              <div className="text-two">+91 9625318589</div>
              <div className="text-one">+91 9670961210</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope" style={{ color: '#3498db' }}></i>
              <div className="topic">Email</div>
              <div className="text-two">sulekha@gbu.ac.in</div>
              <div className="text-one">satyamskic807681@gmail.com</div>
              <div className="text-two">prakhar.bltr@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            {!isSent && (
              <div className="topic-text" style={{ color: '#3498db', marginBottom: '1em' }}>
                Send us a message
              </div>
            )}
            {isSent && (
              <div className="sent-message">
                <h1 style={{ color: 'rgb(52,152,219)', fontWeight: 'bolder', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', fontSize: '40px' }}>
                  Thank You For Contacting Us ❤️
                </h1>
              </div>
            )}
            {!isSent && (
              <p>
                If you have any work for me or any types of queries related to my docker application, you can send me
                a message from here. It's my pleasure to help you.
              </p>
            )}
            {!isSent && (
              <form onSubmit={formSubmit}>
                <div className="input-box">
                  <input onChange={InputEvent} name="fullname" value={data.fullname} type="text" placeholder="Enter Full Name" />
                  {errors.fullname && <span className="error">{errors.fullname}</span>}
                </div>
                <div className="input-box">
                  <input onChange={InputEvent} name="phone" value={data.phone} type="text" placeholder="Phone Number" />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="input-box">
                  <input onChange={InputEvent} type="email" name="email" value={data.email} placeholder="Email Address" />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-box message-box">
                  <textarea onChange={InputEvent} name="msg" value={data.msg} placeholder="Enter your message"></textarea>
                  {errors.msg && <span className="error">{errors.msg}</span>}
                </div>
                <div className="button">
                  <input type="submit" value="Send Now" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
