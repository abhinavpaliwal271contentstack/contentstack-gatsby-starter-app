import React, { useState } from 'react';

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e:any ) => {
    e.preventDefault();
    try {
      const res = await fetch("/contact-us", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });
      const resJson = await res.json();
      if (res.status === 201) {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitStatus("Form submitted successfully");
      } else {
        setSubmitStatus("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="text"
      value={email}
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="text"
      value={message}
      placeholder="Message"
      onChange={(e) => setMessage(e.target.value)}
    />

    <button type="submit">Send Message</button>

    <div>{submitStatus ? <p>{submitStatus}</p> : null}</div>
  </form>
)}

export default ContactUsForm