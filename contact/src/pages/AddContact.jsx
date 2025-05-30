import React, { useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import api from "../api/contacts";

const dummyImages = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
  "13.jpeg",
  "14.jpeg",
  "15.jpeg",
  "16.jpeg",
  "17.jpeg",
  "18.jpeg",
  "19.jpeg",
  "20.jpeg",
];

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();


  const validateForm = () => {
    if (!name || !number || !email) alert("Name | Number | E-mail is required");
  };

  const handleNameChange = (e) => {
    let string = e.target.value;
    let contact = string
      .split(" ")
      .map((word, index) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setName(contact);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
    
    const regex = /^\d{10}$/;
    setIsValid(regex.test(e.target.value))
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const email = e.target.value;
    if(validator.isEmail(email)) setEmailError("Valid Email :)");
    else setEmailError("Enter Valid Email!")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !number) {
      validateForm();
      return;
    }

    const randomImage = dummyImages[Math.floor(Math.random() * dummyImages.length)];
    
    const newContact = { name, email, number, image: randomImage };

    try {
      await api.post("/contacts", newContact);
      setName("");
      setEmail("");
      setNumber("");
      navigate("/contact-list");
    } catch (error) {
      alert("Failed to add contact.");
      console.error("Error adding contact:", error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <style>
        {`
          .add-contact-fade-in {
            animation: fadeInAddContact 0.7s;
          }
          @keyframes fadeInAddContact {
            from { opacity: 0; transform: scale(0.97) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="card shadow-sm p-4 add-contact-fade-in"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "1rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label text-start">Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name (Capitalize)"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label text-start">
                Mobile Number
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={number}
                  onChange={handleNumberChange}
                />
                {
                  !isValid && <p style={{color:"red"}}>Please, Enter a valid 10 digit number!</p>
                }
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label text-start">Email</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <p style={{color:"red"}}>{emailError}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
