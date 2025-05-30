import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/contacts";

const ContactCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState({
    name: "John Doe",
    email: "john@example.com",
    number: "1234567890",
    image: "1.jpeg"
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      if (id) {
        try {
          const responce = await api.get(`/contacts/${id}`);
          if (responce.data) {
            setContact(responce.data);
          }
        } catch (error) {
          console.error("Error fetching contact:", error);
        }
      }
    };
    fetchContact();
  }, [id]);

  const imageUrl = "/Dummy/" + (contact.image || "1.jpeg");

  return (
    <>
      <Header />
      <Navbar />
      <style>
        {`
          .contact-card-fade-in {
            animation: fadeInContactCard 0.7s;
          }
          @keyframes fadeInContactCard {
            from { opacity: 0; transform: scale(0.97) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
      <div className="container">
        <div className="d-flex justify-content-end me-2 mt-3">
          <Link to="/contact-list" style={{ textDecoration: "none" }}>
            <h6 className="mb-4">
              <i className="bi bi-arrow-left-circle-fill"></i> Back
            </h6>
          </Link>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div
              className="card shadow-sm p-4 mb-5 bg-body rounded text-center contact-card-fade-in"
              style={{ borderRadius: "1rem" }}
            >
              <img
                src={imageUrl}
                alt="Profile"
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: "128px",
                  height: "128px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "3px solid #4f8cff",
                  background: "#f7fafc",
                }}
                onClick={() => setShowModal(true)}
              />
              <div className="card-body">
                <h4 className="card-title" style={{ color: "#4f8cff" }}>
                  {contact.name}
                </h4>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {contact.email}
                </p>
                <p className="card-text mb-1">
                  <strong>Number:</strong> {contact.number}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="p-0 text-center">
          <img
            src={imageUrl}
            alt="Full Profile"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "1000vh",
              objectFit: "contain",
            }}  
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactCard;
