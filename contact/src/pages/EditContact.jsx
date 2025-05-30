import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactList.css";
import api from "../api/contacts";

const EditContact = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [changes, setChanges] = useState({
    name: "",
    email: "",
    number: "",
    image: "1.jpeg",
  });

  useEffect(() => {
    const fetchContact = async () => {
      if (id) {
        try {
          const responce = await api.get(`/contacts/${id}`);
          if (responce.data) {
            const contact = responce.data;
            setChanges({
              name: contact.name,
              email: contact.email,
              number: contact.number,
              image: contact.image || "1.jpeg",
            });
          }
        } catch (error) {
          console.error("Error fetching contact:", error);
        }
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/contacts/${id}`, { ...changes });
      }
      navigate("/contact-list");
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const imageUrl = "/Dummy/" + (changes.image || "1.jpeg");

  return (
    <>
      <Header />
      <Navbar />
      <style>
        {`
          .edit-contact-fade-in {
            animation: fadeInEditContact 0.7s;
          }
          @keyframes fadeInEditContact {
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
              className="card shadow-sm p-4 mb-5 bg-body rounded text-center edit-contact-fade-in"
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={changes.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={changes.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      value={changes.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Save Changes
                  </button>
                </form>
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
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditContact;
